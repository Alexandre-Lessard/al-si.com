---
title: 'Faire tourner des LLM modernes sur une Tesla K80 de 2014'
slug: 'llm-modernes-tesla-k80-2014'
description: 'Retour technique sur la remise en service d’une Tesla K80 pour exécuter localement des modèles de langage modernes de 27 à 35 milliards de paramètres, avec mesures, échecs documentés et optimisations réelles.'
author: 'Alexandre Lessard'
date: '2026-07-28'
status: 'brouillon-technique'
tags:
  - Intelligence artificielle locale
  - LLM
  - Tesla K80
  - llama.cpp
  - CUDA
  - Infrastructure
  - Intégration de systèmes
---

# Faire tourner des LLM modernes sur une Tesla K80 de 2014

Faire fonctionner un grand modèle de langage récent sur du matériel moderne est aujourd’hui relativement accessible. Les outils sont nombreux, les cartes graphiques sont prises en charge et les configurations courantes sont abondamment documentées.

Le défi devient beaucoup plus intéressant lorsque le matériel en question est une **NVIDIA Tesla K80**, une carte lancée en 2014, basée sur l’architecture Kepler, abandonnée par les piles logicielles modernes et absente des configurations officiellement supportées par la plupart des moteurs d’inférence actuels.

C’est précisément le chantier que j’ai entrepris dans le cadre de mon laboratoire personnel d’intelligence artificielle locale.

L’objectif n’était pas simplement de faire afficher quelques tokens dans un terminal. Je voulais déterminer, de façon mesurable, si cette carte pouvait encore jouer un rôle utile dans une infrastructure d’IA locale moderne, servir des modèles de **27 à 35 milliards de paramètres**, dépasser les performances de mon ordinateur portable et s’intégrer proprement à un environnement utilisant plusieurs machines.

Le résultat est plus nuancé et plus intéressant qu’un simple « oui, ça fonctionne ».

Une Tesla K80 peut effectivement exécuter des modèles modernes, mais seulement en acceptant de travailler sous la couche des outils habituels, de compiler les composants appropriés, de tester méthodiquement plusieurs stratégies et, surtout, d’abandonner les optimisations qui ne résistent pas à la mesure.

> **Résultat principal :** une carte graphique de 2014, non reconnue par les runtimes modernes, a réussi à servir des modèles Qwen récents de 27B à 35B. Les meilleurs résultats mesurés atteignent environ **13,5 tokens par seconde pour un modèle MoE 35B avec un contexte de 64k**, et jusqu’à **13 à 29 tokens par seconde dans certains scénarios de génération assistée par speculative decoding**.

Ce projet ne porte pas sur l’entraînement de modèles ni sur la création d’un nouveau moteur d’inférence. Il porte sur ce que je fais le mieux : **comprendre une contrainte inhabituelle, intégrer des composants qui n’ont pas été conçus pour fonctionner ensemble, mesurer le comportement réel du système et pousser le matériel jusqu’à une limite utile et défendable.**

---

## Le contexte : construire une infrastructure d’IA locale avec le matériel déjà disponible

Le projet K80 s’inscrit dans un laboratoire plus large consacré à l’IA locale.

Le point de départ était simple : plusieurs machines étaient déjà disponibles sur mon réseau, mais elles étaient sous-utilisées. Plutôt que de centraliser toute la charge sur une nouvelle station coûteuse ou de dépendre systématiquement de services infonuagiques, j’ai voulu répartir les usages selon les forces de chaque appareil.

Le laboratoire repose sur quatre types de ressources :

- un ordinateur portable utilisé comme poste de pilotage et pour certaines inférences CPU;
- un poste équipé d’une RTX 2070 pour des tâches GPU rapides;
- un autre poste équipé d’une RTX 3060, notamment utilisé pour la transcription;
- un serveur Dell R730 sous Proxmox, qui héberge différents services, dont une machine virtuelle avec la Tesla K80 en passthrough PCI.

L’objectif à long terme est un environnement **local-first**, privé, modulaire et progressif. Il ne s’agit pas d’un produit fini ni d’un cluster automatisé au sens strict. La distribution des tâches LLM se fait principalement par configuration explicite, tandis que certaines tâches, comme la transcription, utilisent une sélection automatique de la machine disponible.

Cette distinction est importante : je ne cherche pas à présenter une orchestration généralisée qui n’existe pas. Le projet démontre plutôt une capacité d’intégration réelle entre plusieurs outils, plusieurs générations de matériel et plusieurs types de charges.

### Principes directeurs

Quatre principes ont guidé les décisions techniques :

1. **Local-first**  
   Le fonctionnement principal ne doit pas dépendre d’un service infonuagique.

2. **Confidentialité**  
   Le code privé, les documents, les transcriptions et les données de travail doivent pouvoir rester à l’intérieur du réseau local.

3. **Modularité**  
   Chaque machine doit pouvoir jouer un rôle adapté à ses capacités sans imposer une architecture monolithique.

4. **Progression mesurée**  
   Chaque nouvelle brique doit être testée et documentée avant d’ajouter la suivante.

Ce dernier point est devenu central. Plusieurs hypothèses qui semblaient logiques au départ se sont révélées fausses une fois mesurées.

---

## Pourquoi la Tesla K80 pose un problème particulier

La Tesla K80 est une carte atypique.

Elle contient deux processeurs graphiques GK210 sur une seule carte, chacun avec environ 12 Go de mémoire. Dans la pratique, avec l’ECC activé, environ **22,8 Go de VRAM** sont utilisables au total.

Sur papier, cette quantité de mémoire est intéressante pour l’inférence locale. Elle permet de charger des modèles quantifiés beaucoup plus gros que ce qu’une carte grand public de 8 ou 12 Go accepterait normalement.

Le problème n’est donc pas uniquement la capacité mémoire.

Le véritable obstacle est l’architecture **Kepler sm_37**.

Les versions modernes de CUDA, PyTorch, Ollama et plusieurs bibliothèques d’inférence ne prennent plus en charge cette génération. Une installation standard ne suffit pas. La carte peut être visible par le système et parfaitement fonctionnelle sur le plan matériel tout en étant inutilisable par les outils modernes.

### Contraintes principales

- Kepler sm_37 est déprécié;
- CUDA récent ne compile plus pour cette architecture;
- PyTorch moderne ne reconnaît pas la carte;
- Ollama ne fournit pas de chemin direct compatible;
- certains kernels modernes supposent des instructions apparues après Kepler;
- la carte comporte deux dies séparés, ce qui ajoute une contrainte dans la distribution du modèle;
- la libération de la VRAM entre deux modèles peut être lente;
- la mémoire disponible est importante, mais la bande passante et l’architecture demeurent anciennes.

La seule voie réaliste était donc de revenir à une pile compatible, puis de compiler moi-même le moteur d’inférence.

---

## Recompiler llama.cpp pour Kepler

La solution retenue repose sur **llama.cpp**, compilé spécifiquement pour l’architecture sm_37.

La combinaison utilisée a été :

- **CUDA 11.8**;
- **gcc-11** comme compilateur hôte;
- compilation avec `CMAKE_CUDA_ARCHITECTURES=37`;
- exécution dans une machine virtuelle dédiée sous Proxmox;
- passthrough PCI des deux dies de la K80.

CUDA 11.8 accepte encore de compiler pour sm_37, mais refuse les versions trop récentes de GCC. Il a donc fallu contrôler précisément la chaîne de compilation plutôt que de simplement installer les paquets par défaut du système.

Exemple simplifié de l’intention de compilation :

```bash
cmake -B build \
  -DGGML_CUDA=ON \
  -DCMAKE_CUDA_ARCHITECTURES=37 \
  -DCMAKE_C_COMPILER=gcc-11 \
  -DCMAKE_CXX_COMPILER=g++-11

cmake --build build --config Release -j
```

Cette étape permet de rendre le moteur compatible avec la carte, mais elle ne garantit pas que les performances seront utiles.

Une carte capable de charger un modèle peut malgré tout produire des tokens trop lentement pour être intéressante. Le reste du travail a donc consisté à mesurer les différentes configurations et à trouver les leviers qui avaient un effet réel.

---

## Premier résultat : le modèle fonctionne, mais la configuration de base est limitée

Le premier modèle utilisé pour la campagne principale était un modèle dense Qwen3.6 de 27B quantifié en Q4.

Avec une répartition classique entre les deux dies, la configuration de départ donnait environ :

| Configuration                   |   Prefill | Génération |
| ------------------------------- | --------: | ---------: |
| Q4_K_M, répartition par couches | 33,85 t/s |   3,25 t/s |

Le prefill était déjà raisonnable, mais la génération à **3,25 tokens par seconde** restait trop proche de ce que le CPU de mon ordinateur portable pouvait atteindre.

La carte fonctionnait. Le défi était maintenant de la rendre réellement utile.

---

## Exploiter les deux dies en parallèle

La K80 contient deux processeurs graphiques distincts. La façon de répartir le modèle entre eux a un effet important.

Deux stratégies ont été comparées :

- une répartition de type pipeline, où les couches sont séparées entre les dies;
- une répartition par lignes, où les deux dies travaillent en parallèle sur chaque couche.

Le passage à une stratégie de type `row` a produit un gain net :

| Configuration                            |   Prefill | Génération |
| ---------------------------------------- | --------: | ---------: |
| Q4_K_M, répartition par couches          | 33,85 t/s |   3,25 t/s |
| Q4_K_M, répartition parallèle par lignes | 35,07 t/s |   4,87 t/s |

La génération est passée de **3,25 à 4,87 tokens par seconde**, soit une amélioration d’environ 50 %.

Ce résultat confirme que, sur ce matériel, l’utilisation parallèle des deux dies est préférable à un pipeline séquentiel pour cette charge.

---

## Requantifier le modèle pour une architecture ancienne

Les quantifications modernes de type K-quants sont généralement un bon choix sur du matériel récent. Elles offrent un compromis intéressant entre qualité, taille et performance.

Sur Kepler, ce choix n’était toutefois pas optimal.

J’ai donc testé une requantification locale vers le format **Q4_0**, plus ancien et plus simple. Les kernels de déquantification associés sont moins complexes et mieux adaptés à cette génération de GPU.

Le résultat :

| Configuration                 |   Prefill | Génération |
| ----------------------------- | --------: | ---------: |
| Q4_K_M, répartition parallèle | 35,07 t/s |   4,87 t/s |
| Q4_0, répartition parallèle   | 35,73 t/s |   6,30 t/s |

La génération est passée à **6,30 tokens par seconde**, soit environ 29 % de plus que la configuration précédente et près du double de la configuration de départ.

Il faut toutefois être transparent sur une limite : le fichier Q4_0 a été produit par requantification d’un modèle déjà quantifié. Cette double quantification est valide pour mesurer la vitesse, mais son effet sur la qualité n’a pas été évalué systématiquement.

Je ne présente donc pas ce résultat comme une recommandation universelle de production. Il démontre plutôt qu’une quantification plus simple peut être beaucoup mieux adaptée à une architecture ancienne.

---

## Comparaison avec le portable

Pour déterminer si la K80 avait encore une valeur réelle, je l’ai comparée au CPU et à l’iGPU de mon ordinateur portable sur le même ordre de grandeur de modèle.

| Plateforme                               |  Prefill | Génération |
| ---------------------------------------- | -------: | ---------: |
| Tesla K80, meilleure configuration dense | 35,7 t/s |   6,30 t/s |
| CPU du portable                          |  ~11 t/s |     ~3 t/s |
| iGPU Intel Arc via Vulkan                |  ~27 t/s |     ~2 t/s |

La K80 gagne sur les deux métriques :

- environ **3,2 fois plus rapide que le CPU en prefill**;
- environ **2,1 fois plus rapide que le CPU en génération**.

Elle ne rivalise évidemment pas avec une carte moderne haut de gamme, mais elle dépasse suffisamment le portable pour justifier son rôle de worker spécialisé dans le laboratoire.

---

## Une hypothèse logique qui ne fonctionne pas : revenir aux anciens chemins CUDA

Une fois le modèle fonctionnel à 6,30 tokens par seconde, la prochaine question était évidente : peut-on aller plus loin en réactivant des optimisations historiques conçues pour Kepler?

Plusieurs anciens flags et chemins de calcul ont été examinés.

Le problème est que le chemin DMMV utilisé dans d’anciennes versions de llama.cpp a été retiré. La génération moderne passe plutôt par MMVQ, qui repose sur des stratégies optimisées pour des architectures plus récentes.

Certaines opérations utilisent notamment des instructions qui ne sont pas disponibles nativement sur Kepler et doivent être émulées.

L’hypothèse initiale était donc que cette émulation représentait le principal goulot d’étranglement.

Les recompilations avec différents anciens paramètres n’ont toutefois produit aucun gain significatif.

Une configuration testée a donné **6,32 tokens par seconde**, soit pratiquement le même résultat que les **6,30 tokens par seconde** de référence.

La conclusion était claire : ces flags n’étaient plus un levier pertinent dans la version moderne du moteur.

---

## Écrire un kernel CUDA personnalisé — et mesurer un échec utile

Pour tester plus directement l’hypothèse de l’émulation coûteuse, un kernel CUDA expérimental a été écrit pour l’architecture sm_37.

Son objectif était de réaliser une déquantification Q4_0 vers FP32 suivie d’une multiplication matrice-vecteur, sans dépendre du chemin moderne supposé défavorable à Kepler.

Techniquement, le kernel fonctionnait. En matière de performance, il était nettement inférieur.

| Implémentation                 |                  Génération |
| ------------------------------ | --------------------------: |
| MMVQ standard de llama.cpp     | 4,48 t/s dans le test ciblé |
| Kernel CUDA expérimental sm_37 |                    1,19 t/s |

Le kernel personnalisé était environ **3,8 fois plus lent**.

Cet échec a été particulièrement instructif.

L’émulation de certaines instructions modernes n’était pas le principal problème. Le kernel standard de llama.cpp restait extrêmement optimisé : accès mémoire coalescés, meilleure occupation du GPU et organisation plus efficace du travail.

Le kernel personnalisé, malgré une logique arithmétique plus simple, effectuait des lectures moins efficaces. Sur une charge dominée par la mémoire, cette faiblesse coûtait plus cher que l’émulation que je cherchais à éviter.

Le chantier a donc été arrêté.

Cette décision fait partie intégrante du projet. Une optimisation n’a de valeur que si elle améliore réellement le système. Un résultat négatif bien mesuré est préférable à une intuition élégante mais fausse.

---

## Identifier le vrai mur : la bande passante mémoire

Les mesures ont progressivement montré que la génération était principalement **memory-bound**.

Autrement dit, le GPU ne manquait pas d’opérations arithmétiques. Il passait surtout son temps à déplacer et relire les poids du modèle.

Plusieurs indices convergeaient :

- le profilage attribuait environ **78,6 % du temps** à l’opération `MUL_MAT[q4_0]`;
- une augmentation importante de la fréquence GPU n’apportait qu’environ **2,7 %** de gain;
- les optimisations arithmétiques ciblées ne changeaient presque rien;
- la quantification plus simple améliorait les résultats en réduisant le coût de lecture et de déquantification.

Une fois ce constat établi, il devenait inutile de continuer à chercher uniquement du côté des kernels.

Il fallait plutôt réduire le nombre de fois où les poids du modèle étaient relus.

---

## Speculative decoding : exploiter le mur mémoire au lieu de le combattre

Le **speculative decoding** basé sur un cache n-gram est devenu le levier suivant.

Le principe est de proposer plusieurs tokens candidats à partir du contexte existant, puis de les vérifier en groupe avec le modèle principal.

Sur une machine limitée par la bande passante mémoire, cette approche est intéressante : la passe de vérification peut valider plusieurs tokens après une seule lecture importante des poids.

Les résultats sur du contenu d’usage réel ont été très variables, mais nettement supérieurs à la génération standard lorsque le contexte contenait suffisamment de motifs réutilisables.

Débits effectifs observés :

| Type de contenu       | Résultats mesurés |
| --------------------- | ----------------: |
| Code                  |   13,0 à 27,9 t/s |
| Texte technique       |   24,1 à 29,4 t/s |
| Questions et réponses |   13,6 à 25,3 t/s |

Les six essais consignés dépassaient **10 tokens par seconde**, comparativement à environ **6,47 tokens par seconde** dans la configuration dense de référence utilisée pour cette série.

Dans les meilleurs cas, le débit a été multiplié par deux à quatre.

### Limite importante

Le speculative decoding par n-gram dépend fortement de la répétition du contexte.

Sur un texte créatif ou peu prévisible, le gain peut diminuer et le débit peut redescendre autour de **7 à 9 tokens par seconde**.

Il ne s’agit donc pas d’un multiplicateur universel. C’est une optimisation contextuelle particulièrement utile pour le code, la documentation technique, la reformulation et d’autres charges structurées.

---

## Le piège des modèles MoE : un test court peut mentir

Le laboratoire utilise aussi des modèles **Mixture of Experts**, ou MoE.

Ces modèles peuvent offrir un bon rapport entre capacité totale et quantité de paramètres activés à chaque token. Sur le matériel disponible, ils se sont révélés particulièrement intéressants.

Cependant, l’ajout du speculative decoding aux modèles MoE a créé un problème trompeur.

Le modèle pouvait :

- se charger correctement;
- réussir le health-check;
- traiter le prefill;
- commencer à générer normalement.

Puis, après plusieurs centaines de tokens, le buffer de calcul grossissait suffisamment pour provoquer une erreur de mémoire.

Le problème n’apparaissait donc pas dans un test rapide.

Des essais à 800 tokens ont permis de distinguer les configurations stables des configurations fragiles.

| Configuration                                | Résultat                              |
| -------------------------------------------- | ------------------------------------- |
| MoE, grand contexte, speculative decoding    | OOM                                   |
| MoE, contexte réduit, speculative decoding   | parfois stable, mais moins avantageux |
| MoE, contexte 64k, sans speculative decoding | stable, environ 13,5 t/s              |

La décision finale a été de servir les modèles MoE **sans speculative decoding**, avec leur contexte complet.

Cette configuration est à la fois plus stable et plus rapide que la seule configuration speculative suffisamment petite pour tenir en mémoire.

> Pour les modèles MoE 35B testés, le meilleur compromis mesuré est d’environ **13,5 tokens par seconde avec un contexte de 64k**, sans speculative decoding.

Cette étape rappelle une règle importante : un benchmark de quelques dizaines de tokens ne valide pas un service. Une configuration peut réussir tous les contrôles superficiels et échouer uniquement lors d’une génération longue.

---

## Gérer la libération lente de la VRAM

Un autre problème est apparu lors du changement de modèle.

Après l’arrêt d’un modèle, la mémoire de la K80 ne redevenait pas immédiatement disponible. Le nouveau serveur pouvait démarrer, réussir son contrôle initial, puis planter à la première génération parce que la VRAM du modèle précédent n’était pas encore complètement libérée.

Le comportement semblait aléatoire, mais il était reproductible.

La solution a été d’ajouter un wrapper de démarrage qui :

1. surveille l’utilisation de la VRAM;
2. attend qu’elle redescende sous un seuil défini;
3. vérifie à intervalles réguliers;
4. lance ensuite le nouveau serveur.

Cette petite pièce d’intégration a rendu les changements de modèles beaucoup plus fiables.

Elle illustre bien la nature du projet : la difficulté ne se trouvait pas uniquement dans la compilation ou dans les modèles. Elle se trouvait aussi dans les détails opérationnels qui séparent un benchmark ponctuel d’un service réellement utilisable.

---

## Résultats consolidés

Voici la progression principale du chantier dense :

| Étape                                     |  Génération |
| ----------------------------------------- | ----------: |
| Configuration de départ, Q4_K_M, pipeline |    3,25 t/s |
| Répartition parallèle entre les deux dies |    4,87 t/s |
| Requantification Q4_0                     |    6,30 t/s |
| Speculative decoding, selon le contenu    | 13 à 29 t/s |

Et pour les modèles MoE :

| Configuration                                           |                          Résultat |
| ------------------------------------------------------- | --------------------------------: |
| Modèle MoE 35B, speculative decoding                    | instable ou OOM selon le contexte |
| Modèle MoE 35B, sans speculative decoding, contexte 64k |                         ~13,5 t/s |

La K80 ne devient pas une carte moderne. Elle demeure limitée par son architecture, sa bande passante, son efficacité énergétique et son absence de support officiel.

Mais elle passe du statut de matériel théoriquement obsolète à celui de worker réellement utile pour certaines charges locales.

---

## Au-delà de la K80 : un environnement d’IA locale distribué par rôles

Le chantier K80 est la partie la plus technique du laboratoire, mais il n’existe pas isolément.

L’environnement local utilise plusieurs composants existants, configurés et intégrés selon les capacités du matériel.

### Inférence LLM

- **Ollama** sur plusieurs machines;
- **llama.cpp** compilé pour Kepler sur la K80;
- **llama-swap** pour charger et décharger les modèles;
- API compatibles OpenAI pour uniformiser les points d’accès.

### Agents de développement

L’interface principale est **Continue.dev**, utilisée dans Visual Studio Code et en ligne de commande.

Continue.dev n’a pas été réécrit. Il a été intégré et configuré pour utiliser les modèles locaux disponibles sur différentes machines.

Le travail a notamment permis d’identifier plusieurs comportements non évidents :

- le paramètre de longueur de contexte de Continue ne se propageait pas comme prévu jusqu’à Ollama;
- les modèles personnalisés devaient déclarer explicitement leur capacité à utiliser des outils;
- un contexte trop petit provoquait des boucles;
- le nom d’un modèle pouvait influencer à tort la détection des capacités;
- certaines limites observées provenaient du comportement du modèle plutôt que d’un bug de transmission des outils.

Des modèles dérivés Ollama ont donc été créés avec un contexte fixé à 16k, et des règles de comportement ont été ajoutées à la configuration.

Un cas réel qui nécessitait auparavant environ dix relances manuelles a pu être ramené à une seule passe après analyse de la télémétrie et ajustement des règles.

### Recherche web locale

L’outil de recherche intégré à Continue.dev dépendait d’un proxy infonuagique qui ne fonctionnait pas dans la configuration utilisée.

Un service **SearXNG** auto-hébergé a donc été intégré par MCP afin d’offrir une recherche web contrôlée localement, sans dépendance à une clé d’API externe.

### Transcription locale

Le laboratoire héberge aussi une chaîne de transcription basée sur WhisperX, CTranslate2, pyannote et ffmpeg.

Un script sélectionne automatiquement une machine disponible :

1. worker avec RTX 3060;
2. worker avec RTX 2070;
3. repli CPU si aucun GPU n’est disponible.

Le pipeline gère notamment :

- la sélection de la machine;
- la sérialisation des tâches GPU;
- le déchargement temporaire d’un modèle Ollama lorsqu’il entre en conflit avec la transcription;
- la normalisation audio;
- l’extraction de canaux;
- l’horodatage;
- la diarisation;
- l’injection d’un glossaire;
- la production d’un manifeste d’exécution.

Un test réel a permis de traiter **42 minutes d’audio en 2 minutes 15 secondes**, soit environ **24 fois plus vite que le temps réel**, avec horodatage et attribution des locuteurs.

La transcription est actuellement la partie la plus proche d’un livrable directement réutilisable par un autre projet.

---

## Ce qui a été intégré, et ce qui provient d’outils existants

Pour présenter correctement ce projet, il est important de distinguer le travail d’intégration des composants tiers.

Je n’ai pas créé :

- Ollama;
- llama.cpp;
- Continue.dev;
- WhisperX;
- pyannote;
- SearXNG;
- les modèles Qwen;
- un moteur d’inférence;
- un nouveau grand modèle de langage.

Le travail réalisé se situe dans :

- la conception de l’architecture;
- l’attribution des rôles aux machines;
- la configuration des services;
- la compilation ciblée pour du matériel hors support;
- l’intégration réseau et API;
- la création de scripts d’automatisation;
- le routage de la transcription;
- la configuration de modèles et de contextes;
- le diagnostic des outils;
- le benchmarking;
- le profilage;
- la documentation;
- la validation des hypothèses;
- l’abandon raisonné des pistes inefficaces.

C’est exactement ce que je cherche à mettre de l’avant dans mon travail de consultant en intégration de systèmes : **je n’ai pas besoin de réinventer chaque composant pour créer une solution qui n’existait pas sous cette forme.**

La valeur se trouve dans la compréhension du besoin, le choix des briques, leur adaptation, leur intégration et la capacité à prouver que le résultat fonctionne.

---

## Une méthode de travail assistée par IA, mais vérifiée par la mesure

Le projet a été construit en dirigeant des assistants IA sur les différentes machines et dans les différents dépôts.

Je considère important de le dire clairement.

Les agents ont participé à la production de scripts, de documentation, de commandes de diagnostic et de pistes d’expérimentation. Mon rôle a été de définir les objectifs, organiser le travail, décider des directions, lancer les essais, comparer les résultats, corriger les hypothèses et valider ce qui devait être conservé.

L’usage d’agents ne remplace pas la validation technique.

Au contraire, ce projet a renforcé une discipline simple :

> **Ne rien affirmer sur le comportement d’un système avant de l’avoir mesuré.**

Plusieurs idées proposées ou intuitivement séduisantes se sont révélées fausses :

- augmenter tous les threads CPU pouvait ralentir l’inférence;
- le format apparent des appels d’outils ne prédisait pas la qualité d’un agent;
- l’émulation d’une instruction moderne n’était pas le principal goulot de la K80;
- un kernel CUDA plus simple pouvait être beaucoup plus lent;
- une configuration qui passait un health-check pouvait échouer après 700 tokens;
- le speculative decoding pouvait être excellent pour un modèle dense et mauvais pour un MoE;
- une ancienne carte pouvait battre un CPU moderne lorsqu’elle était utilisée dans le bon rôle.

L’IA a accéléré l’exploration. Les mesures ont décidé de ce qui était vrai.

---

## Limites actuelles du laboratoire

Le projet demeure un laboratoire personnel et non une plateforme de production destinée au public.

Certaines limites sont assumées :

- la distribution LLM n’est pas automatisée de façon générale;
- certains workers sont allumés seulement au besoin;
- le service K80 doit encore être surveillé et relancé dans certains scénarios;
- la qualité des réponses des modèles n’a pas encore été évaluée aussi systématiquement que leur vitesse;
- certaines pistes documentées ne sont pas encore implémentées;
- le multi-agent avancé et le RAG ne sont pas actuellement en service;
- les données de performance sont liées au matériel, aux modèles et aux versions testées;
- les mesures doivent être datées et ne doivent pas être généralisées à d’autres environnements sans validation.

Ces limites ne diminuent pas l’intérêt du projet. Elles définissent simplement ce qui a réellement été construit et ce qui demeure à explorer.

---

## Ce que ce projet démontre

Au-delà des chiffres, ce chantier démontre plusieurs capacités transférables à des projets clients.

### Intégrer des systèmes hétérogènes

Faire travailler ensemble des machines de générations différentes, des API distinctes, des GPU avec des contraintes incompatibles et des services développés par plusieurs équipes.

### Travailler avec du matériel hors support

Trouver une chaîne logicielle compatible, compiler les outils nécessaires et déterminer si le résultat obtenu justifie réellement l’effort.

### Diagnostiquer par la donnée

Mettre en place des benchmarks reproductibles, vérifier les hypothèses et isoler les vrais goulots d’étranglement.

### Savoir abandonner une mauvaise piste

Le kernel CUDA expérimental a été conservé comme trace, mais retiré de la solution parce qu’il était 3,8 fois plus lent. Une solution sérieuse ne consiste pas à défendre le travail déjà investi; elle consiste à garder ce qui fonctionne.

### Concevoir pour la dégradation contrôlée

Lorsqu’un worker GPU n’est pas disponible, la transcription peut être redirigée vers une autre machine ou vers le CPU plutôt que d’échouer complètement.

### Documenter des interfaces réutilisables

La chaîne de transcription est consommée par un autre projet à travers un contrat d’interface documenté. L’appelant n’a pas besoin de connaître la topologie matérielle.

### Diriger et vérifier des agents IA

Les assistants ont été utilisés comme accélérateurs de développement, mais leur travail a été inspecté, testé et corrigé. Cette capacité devient de plus en plus pertinente dans les projets modernes.

---

## Applications possibles en entreprise

Ce laboratoire n’est pas présenté comme un produit prêt à vendre. Il démontre toutefois des approches qui peuvent être appliquées à des besoins réels.

### Traitement local de données sensibles

- transcription de réunions ou d’entrevues;
- analyse de documents confidentiels;
- assistants internes;
- recherche dans une base documentaire privée;
- traitement de données qui ne doivent pas être envoyées vers un fournisseur externe.

### Réutilisation d’infrastructure existante

- évaluer si du matériel déjà possédé peut être réaffecté;
- répartir les charges selon les ressources disponibles;
- éviter un achat prématuré avant d’avoir validé les besoins;
- déterminer objectivement les limites du matériel.

### Intégration de solutions IA

- connecter des modèles locaux à des outils existants;
- standardiser les accès avec des API compatibles;
- intégrer une recherche interne ou web;
- ajouter de la transcription;
- automatiser la sélection d’un service selon sa disponibilité.

### Prototypage technique

- valider une architecture avant un investissement plus important;
- comparer plusieurs modèles ou moteurs;
- mesurer la vitesse, la mémoire et la qualité;
- transformer une idée vague en prototype mesurable.

---

## Les principaux enseignements

### 1. Le matériel ancien n’est pas nécessairement inutile

Une carte hors support peut encore être pertinente si elle possède une caractéristique utile, ici une quantité de VRAM importante répartie sur deux dies.

### 2. La compatibilité ne suffit pas

Faire charger un modèle est seulement le début. Il faut mesurer la génération, le prefill, la stabilité sur de longues réponses et le comportement lors des changements de modèle.

### 3. La meilleure optimisation dépend du goulot réel

Lorsque le système est limité par la mémoire, augmenter la fréquence ou simplifier une opération arithmétique peut avoir très peu d’effet.

### 4. Une optimisation peut être spécifique au type de modèle

Le speculative decoding s’est montré très efficace dans certains scénarios denses, mais problématique sur les MoE testés.

### 5. Les échecs sont des résultats

Le kernel plus lent, les OOM tardifs et les recompilations sans effet ont permis d’éviter de poursuivre des directions inutiles.

### 6. L’intégration est une compétence en soi

Assembler, configurer, mesurer et documenter des outils existants peut créer beaucoup plus de valeur que de réécrire un composant déjà mature.

---

## Prochaines étapes possibles

Le laboratoire ouvre plusieurs pistes, sans prétendre qu’elles sont déjà construites :

- mesurer systématiquement la qualité des réponses sur un ensemble de tâches réelles;
- stabiliser davantage le service K80;
- produire des graphiques publics à partir des benchmarks;
- comparer les coûts d’exploitation avec différentes options infonuagiques;
- ajouter des tâches de fond;
- explorer le RAG local;
- tester les sous-agents natifs de Continue.dev;
- intégrer éventuellement des accélérateurs supplémentaires;
- publier une sélection nettoyée de scripts et de résultats;
- transformer la chaîne de transcription en démonstration indépendante.

La priorité demeure la même : progresser une brique à la fois et ne conserver que ce qui est validé.

---

## Conclusion

Le résultat le plus visible de ce projet est simple à résumer :

> **Une Tesla K80 de 2014, officiellement abandonnée par les outils modernes, a été remise en service pour exécuter localement des modèles de langage récents de 27 à 35 milliards de paramètres.**

Mais le véritable intérêt du chantier se trouve dans la démarche.

Il a fallu :

- comprendre les limites de l’architecture;
- construire une chaîne de compilation compatible;
- exploiter correctement les deux dies;
- comparer plusieurs quantifications;
- profiler les vrais goulots;
- écrire puis rejeter un kernel expérimental;
- tester le speculative decoding;
- identifier des OOM tardifs;
- stabiliser les changements de modèle;
- intégrer la carte dans un environnement plus large;
- documenter les résultats de manière honnête.

Ce projet représente bien le type de mandat qui m’intéresse : un problème atypique, plusieurs systèmes qui ne sont pas naturellement compatibles, peu de réponses toutes faites et un résultat qui doit être démontré plutôt que simplement annoncé.

Je me positionne comme **consultant en intégration de systèmes et solutions IA**.

J’interviens lorsque le projet est complexe, hors standard ou difficile à cadrer, avec une approche axée sur l’intégration, la mesure et la mise en œuvre concrète.

---

## Encadré technique

| Élément                    | Détail                                            |
| -------------------------- | ------------------------------------------------- |
| Carte principale           | NVIDIA Tesla K80, double GPU GK210                |
| Architecture               | Kepler, sm_37                                     |
| VRAM utilisable            | Environ 22,8 Go avec ECC                          |
| Environnement              | VM sous Proxmox avec passthrough PCI              |
| Pile de compilation        | CUDA 11.8, gcc-11                                 |
| Moteur principal           | llama.cpp compilé pour sm_37                      |
| Service de modèles         | llama-swap                                        |
| Formats testés             | GGUF Q4_K_M et Q4_0                               |
| Modèles                    | Qwen récents, dense 27B et MoE jusqu’à 35B        |
| Meilleur dense standard    | Environ 6,30 t/s                                  |
| Speculative decoding dense | Environ 13 à 29 t/s selon le contenu              |
| MoE stable                 | Environ 13,5 t/s, contexte 64k                    |
| Méthode                    | Benchmarking, profilage, validation empirique     |
| Statut                     | Laboratoire personnel, environnement expérimental |

---

## Suggestions de visuels pour la publication

> Ces éléments ne font pas partie du texte final obligatoire, mais peuvent guider l’intégration sur le site.

1. **Image principale**  
   Photo de la Tesla K80 ou du serveur Dell R730, avec le titre de l’article.

2. **Graphique 1 — progression de la K80**  
   3,25 → 4,87 → 6,30 → 13–29 t/s.

3. **Graphique 2 — comparaison des plateformes**  
   K80 contre CPU du portable et iGPU Intel Arc.

4. **Schéma simplifié du laboratoire**  
   Portable → workers GPU → serveur Proxmox.

5. **Capture `nvidia-smi` anonymisée**  
   La K80 chargée avec un modèle récent.

6. **Encadré “hypothèse / mesure / décision”**  
   Exemple : kernel CUDA personnalisé → 3,8 fois plus lent → piste abandonnée.

7. **Capture de Continue.dev**  
   Une tâche neutre exécutée avec un modèle local.

8. **Résultat transcription**  
   42 minutes d’audio → 2 min 15, avec horodatage et locuteurs anonymisés.

---

## Note de validation avant publication

Ce brouillon a été préparé à partir de la documentation technique et des mesures consignées dans le laboratoire au 28 juillet 2026.

Avant publication, il est recommandé de faire vérifier notamment :

- les noms exacts des modèles;
- les commandes de compilation;
- les chiffres de benchmark;
- les conditions précises de chaque mesure;
- la distinction entre dense et MoE;
- les contextes utilisés;
- le statut actuel du service K80;
- les affirmations liées au speculative decoding;
- la terminologie CUDA et llama.cpp;
- les éléments pouvant révéler de l’information sur l’infrastructure privée.

Le texte évite volontairement les adresses IP, les noms d’hôtes, les identifiants, l’inventaire complet du serveur et les données privées utilisées pendant les tests.
