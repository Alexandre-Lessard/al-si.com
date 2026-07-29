import ArticleLayout from '../components/ArticleLayout.jsx';
import { translations } from '../i18n';

const SLUG = 'llm-modernes-tesla-k80-2014';

const Table = ({ children }) => (
  <div className="table-scroll">
    <table>{children}</table>
  </div>
);

const BuildCommand = () => (
  <pre>
    <code>{`cmake -B build \\
  -DGGML_CUDA=ON \\
  -DCMAKE_CUDA_ARCHITECTURES=37 \\
  -DCMAKE_C_COMPILER=gcc-11 \\
  -DCMAKE_CXX_COMPILER=g++-11

cmake --build build --config Release -j`}</code>
  </pre>
);

const LlmTeslaK80 = ({ lang, backHref }) => {
  const t = translations[lang] || translations.fr;
  const article = t.articles.items.find((a) => a.slug === SLUG);
  const isFr = lang !== 'en';

  return (
    <ArticleLayout
      title={article.title}
      subtitle={article.subtitle}
      date={article.date}
      badge={article.badge}
      lang={lang}
      backHref={backHref}
    >
      {isFr ? <ContentFr /> : <ContentEn />}
    </ArticleLayout>
  );
};

const ContentFr = () => (
  <>
    <p>
      Faire fonctionner un grand modèle de langage récent sur du matériel moderne est aujourd'hui relativement
      accessible. Les outils sont nombreux, les cartes graphiques sont prises en charge et les configurations courantes
      sont abondamment documentées.
    </p>
    <p>
      Le défi devient beaucoup plus intéressant lorsque le matériel en question est une{' '}
      <strong>NVIDIA Tesla K80</strong>, une carte lancée en 2014, basée sur l'architecture Kepler, abandonnée par les
      piles logicielles modernes et absente des configurations officiellement supportées par la plupart des moteurs
      d'inférence actuels.
    </p>
    <p>
      C'est précisément le chantier que j'ai entrepris dans le cadre de mon laboratoire personnel d'intelligence
      artificielle locale.
    </p>
    <p>
      L'objectif n'était pas simplement de faire afficher quelques tokens dans un terminal. Je voulais déterminer, de
      façon mesurable, si cette carte pouvait encore jouer un rôle utile dans une infrastructure d'IA locale moderne,
      servir des modèles de <strong>27 à 35 milliards de paramètres</strong>, dépasser les performances de mon
      ordinateur portable et s'intégrer proprement à un environnement utilisant plusieurs machines.
    </p>
    <p>Le résultat est plus nuancé et plus intéressant qu'un simple « oui, ça fonctionne ».</p>
    <p>
      Une Tesla K80 peut effectivement exécuter des modèles modernes, mais seulement en acceptant de travailler sous la
      couche des outils habituels, de compiler les composants appropriés, de tester méthodiquement plusieurs stratégies
      et, surtout, d'abandonner les optimisations qui ne résistent pas à la mesure.
    </p>

    <blockquote>
      <p>
        <strong>Résultat principal :</strong> une carte graphique de 2014, non reconnue par les runtimes modernes, a
        réussi à servir des modèles Qwen récents de 27B à 35B. Les meilleurs résultats mesurés atteignent environ{' '}
        <strong>13,5 tokens par seconde pour un modèle MoE 35B avec un contexte de 64k</strong>, et jusqu'à{' '}
        <strong>
          13 à 29 tokens par seconde dans certains scénarios de génération assistée par speculative decoding
        </strong>
        .
      </p>
    </blockquote>

    <p>
      Ce projet ne porte pas sur l'entraînement de modèles ni sur la création d'un nouveau moteur d'inférence. Il porte
      sur ce que je fais le mieux :{' '}
      <strong>
        comprendre une contrainte inhabituelle, intégrer des composants qui n'ont pas été conçus pour fonctionner
        ensemble, mesurer le comportement réel du système et pousser le matériel jusqu'à une limite utile et défendable.
      </strong>
    </p>

    <hr />

    <h2>Le contexte : construire une infrastructure d'IA locale avec le matériel déjà disponible</h2>
    <p>Le projet K80 s'inscrit dans un laboratoire plus large consacré à l'IA locale.</p>
    <p>
      Le point de départ était simple : plusieurs machines étaient déjà disponibles sur mon réseau, mais elles étaient
      sous-utilisées. Plutôt que de centraliser toute la charge sur une nouvelle station coûteuse ou de dépendre
      systématiquement de services infonuagiques, j'ai voulu répartir les usages selon les forces de chaque appareil.
    </p>
    <p>Le laboratoire repose sur quatre types de ressources :</p>
    <ul>
      <li>un ordinateur portable utilisé comme poste de pilotage et pour certaines inférences CPU;</li>
      <li>un poste équipé d'une RTX 2070 pour des tâches GPU rapides;</li>
      <li>un autre poste équipé d'une RTX 3060, notamment utilisé pour la transcription;</li>
      <li>
        un serveur Dell R730 sous Proxmox, qui héberge différents services, dont une machine virtuelle avec la Tesla K80
        en passthrough PCI.
      </li>
    </ul>
    <p>
      L'objectif à long terme est un environnement <strong>local-first</strong>, privé, modulaire et progressif. Il ne
      s'agit pas d'un produit fini ni d'un cluster automatisé au sens strict. La distribution des tâches LLM se fait
      principalement par configuration explicite, tandis que certaines tâches, comme la transcription, utilisent une
      sélection automatique de la machine disponible.
    </p>
    <p>
      Cette distinction est importante : je ne cherche pas à présenter une orchestration généralisée qui n'existe pas.
      Le projet démontre plutôt une capacité d'intégration réelle entre plusieurs outils, plusieurs générations de
      matériel et plusieurs types de charges.
    </p>

    <h3>Principes directeurs</h3>
    <p>Quatre principes ont guidé les décisions techniques :</p>
    <ol>
      <li>
        <strong>Local-first</strong> — le fonctionnement principal ne doit pas dépendre d'un service infonuagique.
      </li>
      <li>
        <strong>Confidentialité</strong> — le code privé, les documents, les transcriptions et les données de travail
        doivent pouvoir rester à l'intérieur du réseau local.
      </li>
      <li>
        <strong>Modularité</strong> — chaque machine doit pouvoir jouer un rôle adapté à ses capacités sans imposer une
        architecture monolithique.
      </li>
      <li>
        <strong>Progression mesurée</strong> — chaque nouvelle brique doit être testée et documentée avant d'ajouter la
        suivante.
      </li>
    </ol>
    <p>
      Ce dernier point est devenu central. Plusieurs hypothèses qui semblaient logiques au départ se sont révélées
      fausses une fois mesurées.
    </p>

    <hr />

    <h2>Pourquoi la Tesla K80 pose un problème particulier</h2>
    <p>La Tesla K80 est une carte atypique.</p>
    <p>
      Elle contient deux processeurs graphiques GK210 sur une seule carte, chacun avec environ 12 Go de mémoire. Dans la
      pratique, avec l'ECC activé, environ <strong>22,8 Go de VRAM</strong> sont utilisables au total.
    </p>
    <p>
      Sur papier, cette quantité de mémoire est intéressante pour l'inférence locale. Elle permet de charger des modèles
      quantifiés beaucoup plus gros que ce qu'une carte grand public de 8 ou 12 Go accepterait normalement.
    </p>
    <p>Le problème n'est donc pas uniquement la capacité mémoire.</p>
    <p>
      Le véritable obstacle est l'architecture <strong>Kepler sm_37</strong>.
    </p>
    <p>
      Les versions modernes de CUDA, PyTorch, Ollama et plusieurs bibliothèques d'inférence ne prennent plus en charge
      cette génération. Une installation standard ne suffit pas. La carte peut être visible par le système et
      parfaitement fonctionnelle sur le plan matériel tout en étant inutilisable par les outils modernes.
    </p>

    <h3>Contraintes principales</h3>
    <ul>
      <li>Kepler sm_37 est déprécié;</li>
      <li>CUDA récent ne compile plus pour cette architecture;</li>
      <li>PyTorch moderne ne reconnaît pas la carte;</li>
      <li>Ollama ne fournit pas de chemin direct compatible;</li>
      <li>certains kernels modernes supposent des instructions apparues après Kepler;</li>
      <li>la carte comporte deux dies séparés, ce qui ajoute une contrainte dans la distribution du modèle;</li>
      <li>la libération de la VRAM entre deux modèles peut être lente;</li>
      <li>la mémoire disponible est importante, mais la bande passante et l'architecture demeurent anciennes.</li>
    </ul>
    <p>
      La seule voie réaliste était donc de revenir à une pile compatible, puis de compiler moi-même le moteur
      d'inférence.
    </p>

    <hr />

    <h2>Recompiler llama.cpp pour Kepler</h2>
    <p>
      La solution retenue repose sur <strong>llama.cpp</strong>, compilé spécifiquement pour l'architecture sm_37.
    </p>
    <p>La combinaison utilisée a été :</p>
    <ul>
      <li>
        <strong>CUDA 11.8</strong>;
      </li>
      <li>
        <strong>gcc-11</strong> comme compilateur hôte;
      </li>
      <li>
        compilation avec <code>CMAKE_CUDA_ARCHITECTURES=37</code>;
      </li>
      <li>exécution dans une machine virtuelle dédiée sous Proxmox;</li>
      <li>passthrough PCI des deux dies de la K80.</li>
    </ul>
    <p>
      CUDA 11.8 accepte encore de compiler pour sm_37, mais refuse les versions trop récentes de GCC. Il a donc fallu
      contrôler précisément la chaîne de compilation plutôt que de simplement installer les paquets par défaut du
      système.
    </p>
    <p>Exemple simplifié de l'intention de compilation :</p>
    <BuildCommand />
    <p>
      Cette étape permet de rendre le moteur compatible avec la carte, mais elle ne garantit pas que les performances
      seront utiles.
    </p>
    <p>
      Une carte capable de charger un modèle peut malgré tout produire des tokens trop lentement pour être intéressante.
      Le reste du travail a donc consisté à mesurer les différentes configurations et à trouver les leviers qui avaient
      un effet réel.
    </p>

    <hr />

    <h2>Premier résultat : le modèle fonctionne, mais la configuration de base est limitée</h2>
    <p>Le premier modèle utilisé pour la campagne principale était un modèle dense Qwen3.6 de 27B quantifié en Q4.</p>
    <p>Avec une répartition classique entre les deux dies, la configuration de départ donnait environ :</p>
    <Table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th className="!text-right">Prefill</th>
          <th className="!text-right">Génération</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Q4_K_M, répartition par couches</td>
          <td className="text-right">33,85 t/s</td>
          <td className="text-right">3,25 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      Le prefill était déjà raisonnable, mais la génération à <strong>3,25 tokens par seconde</strong> restait trop
      proche de ce que le CPU de mon ordinateur portable pouvait atteindre.
    </p>
    <p>La carte fonctionnait. Le défi était maintenant de la rendre réellement utile.</p>

    <hr />

    <h2>Exploiter les deux dies en parallèle</h2>
    <p>
      La K80 contient deux processeurs graphiques distincts. La façon de répartir le modèle entre eux a un effet
      important.
    </p>
    <p>Deux stratégies ont été comparées :</p>
    <ul>
      <li>une répartition de type pipeline, où les couches sont séparées entre les dies;</li>
      <li>une répartition par lignes, où les deux dies travaillent en parallèle sur chaque couche.</li>
    </ul>
    <p>
      Le passage à une stratégie de type <code>row</code> a produit un gain net :
    </p>
    <Table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th className="!text-right">Prefill</th>
          <th className="!text-right">Génération</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Q4_K_M, répartition par couches</td>
          <td className="text-right">33,85 t/s</td>
          <td className="text-right">3,25 t/s</td>
        </tr>
        <tr>
          <td>Q4_K_M, répartition parallèle par lignes</td>
          <td className="text-right">35,07 t/s</td>
          <td className="text-right">4,87 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      La génération est passée de <strong>3,25 à 4,87 tokens par seconde</strong>, soit une amélioration d'environ 50 %.
    </p>
    <p>
      Ce résultat confirme que, sur ce matériel, l'utilisation parallèle des deux dies est préférable à un pipeline
      séquentiel pour cette charge.
    </p>

    <hr />

    <h2>Requantifier le modèle pour une architecture ancienne</h2>
    <p>
      Les quantifications modernes de type K-quants sont généralement un bon choix sur du matériel récent. Elles offrent
      un compromis intéressant entre qualité, taille et performance.
    </p>
    <p>Sur Kepler, ce choix n'était toutefois pas optimal.</p>
    <p>
      J'ai donc testé une requantification locale vers le format <strong>Q4_0</strong>, plus ancien et plus simple. Les
      kernels de déquantification associés sont moins complexes et mieux adaptés à cette génération de GPU.
    </p>
    <p>Le résultat :</p>
    <Table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th className="!text-right">Prefill</th>
          <th className="!text-right">Génération</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Q4_K_M, répartition parallèle</td>
          <td className="text-right">35,07 t/s</td>
          <td className="text-right">4,87 t/s</td>
        </tr>
        <tr>
          <td>Q4_0, répartition parallèle</td>
          <td className="text-right">35,73 t/s</td>
          <td className="text-right">6,30 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      La génération est passée à <strong>6,30 tokens par seconde</strong>, soit environ 29 % de plus que la
      configuration précédente et près du double de la configuration de départ.
    </p>
    <p>
      Il faut toutefois être transparent sur une limite : le fichier Q4_0 a été produit par requantification d'un modèle
      déjà quantifié. Cette double quantification est valide pour mesurer la vitesse, mais son effet sur la qualité n'a
      pas été évalué systématiquement.
    </p>
    <p>
      Je ne présente donc pas ce résultat comme une recommandation universelle de production. Il démontre plutôt qu'une
      quantification plus simple peut être beaucoup mieux adaptée à une architecture ancienne.
    </p>

    <hr />

    <h2>Comparaison avec le portable</h2>
    <p>
      Pour déterminer si la K80 avait encore une valeur réelle, je l'ai comparée au CPU et à l'iGPU de mon ordinateur
      portable sur le même ordre de grandeur de modèle.
    </p>
    <Table>
      <thead>
        <tr>
          <th>Plateforme</th>
          <th className="!text-right">Prefill</th>
          <th className="!text-right">Génération</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tesla K80, meilleure configuration dense</td>
          <td className="text-right">35,7 t/s</td>
          <td className="text-right">6,30 t/s</td>
        </tr>
        <tr>
          <td>CPU du portable</td>
          <td className="text-right">~11 t/s</td>
          <td className="text-right">~3 t/s</td>
        </tr>
        <tr>
          <td>iGPU Intel Arc via Vulkan</td>
          <td className="text-right">~27 t/s</td>
          <td className="text-right">~2 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>La K80 gagne sur les deux métriques :</p>
    <ul>
      <li>
        environ <strong>3,2 fois plus rapide que le CPU en prefill</strong>;
      </li>
      <li>
        environ <strong>2,1 fois plus rapide que le CPU en génération</strong>.
      </li>
    </ul>
    <p>
      Elle ne rivalise évidemment pas avec une carte moderne haut de gamme, mais elle dépasse suffisamment le portable
      pour justifier son rôle de worker spécialisé dans le laboratoire.
    </p>

    <hr />

    <h2>Une hypothèse logique qui ne fonctionne pas : revenir aux anciens chemins CUDA</h2>
    <p>
      Une fois le modèle fonctionnel à 6,30 tokens par seconde, la prochaine question était évidente : peut-on aller
      plus loin en réactivant des optimisations historiques conçues pour Kepler?
    </p>
    <p>Plusieurs anciens flags et chemins de calcul ont été examinés.</p>
    <p>
      Le problème est que le chemin DMMV utilisé dans d'anciennes versions de llama.cpp a été retiré. La génération
      moderne passe plutôt par MMVQ, qui repose sur des stratégies optimisées pour des architectures plus récentes.
    </p>
    <p>
      Certaines opérations utilisent notamment des instructions qui ne sont pas disponibles nativement sur Kepler et
      doivent être émulées.
    </p>
    <p>L'hypothèse initiale était donc que cette émulation représentait le principal goulot d'étranglement.</p>
    <p>Les recompilations avec différents anciens paramètres n'ont toutefois produit aucun gain significatif.</p>
    <p>
      Une configuration testée a donné <strong>6,32 tokens par seconde</strong>, soit pratiquement le même résultat que
      les <strong>6,30 tokens par seconde</strong> de référence.
    </p>
    <p>La conclusion était claire : ces flags n'étaient plus un levier pertinent dans la version moderne du moteur.</p>

    <hr />

    <h2>Écrire un kernel CUDA personnalisé — et mesurer un échec utile</h2>
    <p>
      Pour tester plus directement l'hypothèse de l'émulation coûteuse, un kernel CUDA expérimental a été écrit pour
      l'architecture sm_37.
    </p>
    <p>
      Son objectif était de réaliser une déquantification Q4_0 vers FP32 suivie d'une multiplication matrice-vecteur,
      sans dépendre du chemin moderne supposé défavorable à Kepler.
    </p>
    <p>Techniquement, le kernel fonctionnait. En matière de performance, il était nettement inférieur.</p>
    <Table>
      <thead>
        <tr>
          <th>Implémentation</th>
          <th className="!text-right">Génération</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>MMVQ standard de llama.cpp</td>
          <td className="text-right">4,48 t/s dans le test ciblé</td>
        </tr>
        <tr>
          <td>Kernel CUDA expérimental sm_37</td>
          <td className="text-right">1,19 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      Le kernel personnalisé était environ <strong>3,8 fois plus lent</strong>.
    </p>
    <p>Cet échec a été particulièrement instructif.</p>
    <p>
      L'émulation de certaines instructions modernes n'était pas le principal problème. Le kernel standard de llama.cpp
      restait extrêmement optimisé : accès mémoire coalescés, meilleure occupation du GPU et organisation plus efficace
      du travail.
    </p>
    <p>
      Le kernel personnalisé, malgré une logique arithmétique plus simple, effectuait des lectures moins efficaces. Sur
      une charge dominée par la mémoire, cette faiblesse coûtait plus cher que l'émulation que je cherchais à éviter.
    </p>
    <p>Le chantier a donc été arrêté.</p>
    <p>
      Cette décision fait partie intégrante du projet. Une optimisation n'a de valeur que si elle améliore réellement le
      système. Un résultat négatif bien mesuré est préférable à une intuition élégante mais fausse.
    </p>

    <hr />

    <h2>Identifier le vrai mur : la bande passante mémoire</h2>
    <p>
      Les mesures ont progressivement montré que la génération était principalement <strong>memory-bound</strong>.
    </p>
    <p>
      Autrement dit, le GPU ne manquait pas d'opérations arithmétiques. Il passait surtout son temps à déplacer et
      relire les poids du modèle.
    </p>
    <p>Plusieurs indices convergeaient :</p>
    <ul>
      <li>
        le profilage attribuait environ <strong>78,6 % du temps</strong> à l'opération <code>MUL_MAT[q4_0]</code>;
      </li>
      <li>
        une augmentation importante de la fréquence GPU n'apportait qu'environ <strong>2,7 %</strong> de gain;
      </li>
      <li>les optimisations arithmétiques ciblées ne changeaient presque rien;</li>
      <li>
        la quantification plus simple améliorait les résultats en réduisant le coût de lecture et de déquantification.
      </li>
    </ul>
    <p>Une fois ce constat établi, il devenait inutile de continuer à chercher uniquement du côté des kernels.</p>
    <p>Il fallait plutôt réduire le nombre de fois où les poids du modèle étaient relus.</p>

    <hr />

    <h2>Speculative decoding : exploiter le mur mémoire au lieu de le combattre</h2>
    <p>
      Le <strong>speculative decoding</strong> basé sur un cache n-gram est devenu le levier suivant.
    </p>
    <p>
      Le principe est de proposer plusieurs tokens candidats à partir du contexte existant, puis de les vérifier en
      groupe avec le modèle principal.
    </p>
    <p>
      Sur une machine limitée par la bande passante mémoire, cette approche est intéressante : la passe de vérification
      peut valider plusieurs tokens après une seule lecture importante des poids.
    </p>
    <p>
      Les résultats sur du contenu d'usage réel ont été très variables, mais nettement supérieurs à la génération
      standard lorsque le contexte contenait suffisamment de motifs réutilisables.
    </p>
    <p>Débits effectifs observés :</p>
    <Table>
      <thead>
        <tr>
          <th>Type de contenu</th>
          <th className="!text-right">Résultats mesurés</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Code</td>
          <td className="text-right">13,0 à 27,9 t/s</td>
        </tr>
        <tr>
          <td>Texte technique</td>
          <td className="text-right">24,1 à 29,4 t/s</td>
        </tr>
        <tr>
          <td>Questions et réponses</td>
          <td className="text-right">13,6 à 25,3 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      Les six essais consignés dépassaient <strong>10 tokens par seconde</strong>, comparativement à environ{' '}
      <strong>6,47 tokens par seconde</strong> dans la configuration dense de référence utilisée pour cette série.
    </p>
    <p>Dans les meilleurs cas, le débit a été multiplié par deux à quatre.</p>

    <h3>Limite importante</h3>
    <p>Le speculative decoding par n-gram dépend fortement de la répétition du contexte.</p>
    <p>
      Sur un texte créatif ou peu prévisible, le gain peut diminuer et le débit peut redescendre autour de{' '}
      <strong>7 à 9 tokens par seconde</strong>.
    </p>
    <p>
      Il ne s'agit donc pas d'un multiplicateur universel. C'est une optimisation contextuelle particulièrement utile
      pour le code, la documentation technique, la reformulation et d'autres charges structurées.
    </p>

    <hr />

    <h2>Le piège des modèles MoE : un test court peut mentir</h2>
    <p>
      Le laboratoire utilise aussi des modèles <strong>Mixture of Experts</strong>, ou MoE.
    </p>
    <p>
      Ces modèles peuvent offrir un bon rapport entre capacité totale et quantité de paramètres activés à chaque token.
      Sur le matériel disponible, ils se sont révélés particulièrement intéressants.
    </p>
    <p>Cependant, l'ajout du speculative decoding aux modèles MoE a créé un problème trompeur.</p>
    <p>Le modèle pouvait :</p>
    <ul>
      <li>se charger correctement;</li>
      <li>réussir le health-check;</li>
      <li>traiter le prefill;</li>
      <li>commencer à générer normalement.</li>
    </ul>
    <p>
      Puis, après plusieurs centaines de tokens, le buffer de calcul grossissait suffisamment pour provoquer une erreur
      de mémoire.
    </p>
    <p>Le problème n'apparaissait donc pas dans un test rapide.</p>
    <p>Des essais à 800 tokens ont permis de distinguer les configurations stables des configurations fragiles.</p>
    <Table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th>Résultat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>MoE, grand contexte, speculative decoding</td>
          <td>OOM</td>
        </tr>
        <tr>
          <td>MoE, contexte réduit, speculative decoding</td>
          <td>parfois stable, mais moins avantageux</td>
        </tr>
        <tr>
          <td>MoE, contexte 64k, sans speculative decoding</td>
          <td>stable, environ 13,5 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      La décision finale a été de servir les modèles MoE <strong>sans speculative decoding</strong>, avec leur contexte
      complet.
    </p>
    <p>
      Cette configuration est à la fois plus stable et plus rapide que la seule configuration speculative suffisamment
      petite pour tenir en mémoire.
    </p>
    <blockquote>
      <p>
        Pour les modèles MoE 35B testés, le meilleur compromis mesuré est d'environ{' '}
        <strong>13,5 tokens par seconde avec un contexte de 64k</strong>, sans speculative decoding.
      </p>
    </blockquote>
    <p>
      Cette étape rappelle une règle importante : un benchmark de quelques dizaines de tokens ne valide pas un service.
      Une configuration peut réussir tous les contrôles superficiels et échouer uniquement lors d'une génération longue.
    </p>

    <hr />

    <h2>Gérer la libération lente de la VRAM</h2>
    <p>Un autre problème est apparu lors du changement de modèle.</p>
    <p>
      Après l'arrêt d'un modèle, la mémoire de la K80 ne redevenait pas immédiatement disponible. Le nouveau serveur
      pouvait démarrer, réussir son contrôle initial, puis planter à la première génération parce que la VRAM du modèle
      précédent n'était pas encore complètement libérée.
    </p>
    <p>Le comportement semblait aléatoire, mais il était reproductible.</p>
    <p>La solution a été d'ajouter un wrapper de démarrage qui :</p>
    <ol>
      <li>surveille l'utilisation de la VRAM;</li>
      <li>attend qu'elle redescende sous un seuil défini;</li>
      <li>vérifie à intervalles réguliers;</li>
      <li>lance ensuite le nouveau serveur.</li>
    </ol>
    <p>Cette petite pièce d'intégration a rendu les changements de modèles beaucoup plus fiables.</p>
    <p>
      Elle illustre bien la nature du projet : la difficulté ne se trouvait pas uniquement dans la compilation ou dans
      les modèles. Elle se trouvait aussi dans les détails opérationnels qui séparent un benchmark ponctuel d'un service
      réellement utilisable.
    </p>

    <hr />

    <h2>Résultats consolidés</h2>
    <p>Voici la progression principale du chantier dense :</p>
    <Table>
      <thead>
        <tr>
          <th>Étape</th>
          <th className="!text-right">Génération</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Configuration de départ, Q4_K_M, pipeline</td>
          <td className="text-right">3,25 t/s</td>
        </tr>
        <tr>
          <td>Répartition parallèle entre les deux dies</td>
          <td className="text-right">4,87 t/s</td>
        </tr>
        <tr>
          <td>Requantification Q4_0</td>
          <td className="text-right">6,30 t/s</td>
        </tr>
        <tr>
          <td>Speculative decoding, selon le contenu</td>
          <td className="text-right">13 à 29 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>Et pour les modèles MoE :</p>
    <Table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th className="!text-right">Résultat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Modèle MoE 35B, speculative decoding</td>
          <td className="text-right">instable ou OOM selon le contexte</td>
        </tr>
        <tr>
          <td>Modèle MoE 35B, sans speculative decoding, contexte 64k</td>
          <td className="text-right">~13,5 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      La K80 ne devient pas une carte moderne. Elle demeure limitée par son architecture, sa bande passante, son
      efficacité énergétique et son absence de support officiel.
    </p>
    <p>
      Mais elle passe du statut de matériel théoriquement obsolète à celui de worker réellement utile pour certaines
      charges locales.
    </p>

    <hr />

    <h2>Au-delà de la K80 : un environnement d'IA locale distribué par rôles</h2>
    <p>Le chantier K80 est la partie la plus technique du laboratoire, mais il n'existe pas isolément.</p>
    <p>
      L'environnement local utilise plusieurs composants existants, configurés et intégrés selon les capacités du
      matériel.
    </p>

    <h3>Inférence LLM</h3>
    <ul>
      <li>
        <strong>Ollama</strong> sur plusieurs machines;
      </li>
      <li>
        <strong>llama.cpp</strong> compilé pour Kepler sur la K80;
      </li>
      <li>
        <strong>llama-swap</strong> pour charger et décharger les modèles;
      </li>
      <li>API compatibles OpenAI pour uniformiser les points d'accès.</li>
    </ul>

    <h3>Agents de développement</h3>
    <p>
      L'interface principale est <strong>Continue.dev</strong>, utilisée dans Visual Studio Code et en ligne de
      commande.
    </p>
    <p>
      Continue.dev n'a pas été réécrit. Il a été intégré et configuré pour utiliser les modèles locaux disponibles sur
      différentes machines.
    </p>
    <p>Le travail a notamment permis d'identifier plusieurs comportements non évidents :</p>
    <ul>
      <li>le paramètre de longueur de contexte de Continue ne se propageait pas comme prévu jusqu'à Ollama;</li>
      <li>les modèles personnalisés devaient déclarer explicitement leur capacité à utiliser des outils;</li>
      <li>un contexte trop petit provoquait des boucles;</li>
      <li>le nom d'un modèle pouvait influencer à tort la détection des capacités;</li>
      <li>
        certaines limites observées provenaient du comportement du modèle plutôt que d'un bug de transmission des
        outils.
      </li>
    </ul>
    <p>
      Des modèles dérivés Ollama ont donc été créés avec un contexte fixé à 16k, et des règles de comportement ont été
      ajoutées à la configuration.
    </p>
    <p>
      Un cas réel qui nécessitait auparavant environ dix relances manuelles a pu être ramené à une seule passe après
      analyse de la télémétrie et ajustement des règles.
    </p>

    <h3>Recherche web locale</h3>
    <p>
      L'outil de recherche intégré à Continue.dev dépendait d'un proxy infonuagique qui ne fonctionnait pas dans la
      configuration utilisée.
    </p>
    <p>
      Un service <strong>SearXNG</strong> auto-hébergé a donc été intégré par MCP afin d'offrir une recherche web
      contrôlée localement, sans dépendance à une clé d'API externe.
    </p>

    <h3>Transcription locale</h3>
    <p>Le laboratoire héberge aussi une chaîne de transcription basée sur WhisperX, CTranslate2, pyannote et ffmpeg.</p>
    <p>Un script sélectionne automatiquement une machine disponible :</p>
    <ol>
      <li>worker avec RTX 3060;</li>
      <li>worker avec RTX 2070;</li>
      <li>repli CPU si aucun GPU n'est disponible.</li>
    </ol>
    <p>Le pipeline gère notamment :</p>
    <ul>
      <li>la sélection de la machine;</li>
      <li>la sérialisation des tâches GPU;</li>
      <li>le déchargement temporaire d'un modèle Ollama lorsqu'il entre en conflit avec la transcription;</li>
      <li>la normalisation audio;</li>
      <li>l'extraction de canaux;</li>
      <li>l'horodatage;</li>
      <li>la diarisation;</li>
      <li>l'injection d'un glossaire;</li>
      <li>la production d'un manifeste d'exécution.</li>
    </ul>
    <p>
      Un test réel a permis de traiter <strong>42 minutes d'audio en 2 minutes 15 secondes</strong>, soit environ{' '}
      <strong>24 fois plus vite que le temps réel</strong>, avec horodatage et attribution des locuteurs.
    </p>
    <p>
      La transcription est actuellement la partie la plus proche d'un livrable directement réutilisable par un autre
      projet.
    </p>

    <hr />

    <h2>Ce qui a été intégré, et ce qui provient d'outils existants</h2>
    <p>
      Pour présenter correctement ce projet, il est important de distinguer le travail d'intégration des composants
      tiers.
    </p>
    <p>Je n'ai pas créé :</p>
    <ul>
      <li>Ollama;</li>
      <li>llama.cpp;</li>
      <li>Continue.dev;</li>
      <li>WhisperX;</li>
      <li>pyannote;</li>
      <li>SearXNG;</li>
      <li>les modèles Qwen;</li>
      <li>un moteur d'inférence;</li>
      <li>un nouveau grand modèle de langage.</li>
    </ul>
    <p>Le travail réalisé se situe dans :</p>
    <ul>
      <li>la conception de l'architecture;</li>
      <li>l'attribution des rôles aux machines;</li>
      <li>la configuration des services;</li>
      <li>la compilation ciblée pour du matériel hors support;</li>
      <li>l'intégration réseau et API;</li>
      <li>la création de scripts d'automatisation;</li>
      <li>le routage de la transcription;</li>
      <li>la configuration de modèles et de contextes;</li>
      <li>le diagnostic des outils;</li>
      <li>le benchmarking;</li>
      <li>le profilage;</li>
      <li>la documentation;</li>
      <li>la validation des hypothèses;</li>
      <li>l'abandon raisonné des pistes inefficaces.</li>
    </ul>
    <p>
      C'est exactement ce que je cherche à mettre de l'avant dans mon travail de consultant en intégration de systèmes :{' '}
      <strong>
        je n'ai pas besoin de réinventer chaque composant pour créer une solution qui n'existait pas sous cette forme.
      </strong>
    </p>
    <p>
      La valeur se trouve dans la compréhension du besoin, le choix des briques, leur adaptation, leur intégration et la
      capacité à prouver que le résultat fonctionne.
    </p>

    <hr />

    <h2>Une méthode de travail assistée par IA, mais vérifiée par la mesure</h2>
    <p>
      Le projet a été construit en dirigeant des assistants IA sur les différentes machines et dans les différents
      dépôts.
    </p>
    <p>Je considère important de le dire clairement.</p>
    <p>
      Les agents ont participé à la production de scripts, de documentation, de commandes de diagnostic et de pistes
      d'expérimentation. Mon rôle a été de définir les objectifs, organiser le travail, décider des directions, lancer
      les essais, comparer les résultats, corriger les hypothèses et valider ce qui devait être conservé.
    </p>
    <p>L'usage d'agents ne remplace pas la validation technique.</p>
    <p>Au contraire, ce projet a renforcé une discipline simple :</p>
    <blockquote>
      <p>
        <strong>Ne rien affirmer sur le comportement d'un système avant de l'avoir mesuré.</strong>
      </p>
    </blockquote>
    <p>Plusieurs idées proposées ou intuitivement séduisantes se sont révélées fausses :</p>
    <ul>
      <li>augmenter tous les threads CPU pouvait ralentir l'inférence;</li>
      <li>le format apparent des appels d'outils ne prédisait pas la qualité d'un agent;</li>
      <li>l'émulation d'une instruction moderne n'était pas le principal goulot de la K80;</li>
      <li>un kernel CUDA plus simple pouvait être beaucoup plus lent;</li>
      <li>une configuration qui passait un health-check pouvait échouer après 700 tokens;</li>
      <li>le speculative decoding pouvait être excellent pour un modèle dense et mauvais pour un MoE;</li>
      <li>une ancienne carte pouvait battre un CPU moderne lorsqu'elle était utilisée dans le bon rôle.</li>
    </ul>
    <p>L'IA a accéléré l'exploration. Les mesures ont décidé de ce qui était vrai.</p>

    <hr />

    <h2>Limites actuelles du laboratoire</h2>
    <p>Le projet demeure un laboratoire personnel et non une plateforme de production destinée au public.</p>
    <p>Certaines limites sont assumées :</p>
    <ul>
      <li>la distribution LLM n'est pas automatisée de façon générale;</li>
      <li>certains workers sont allumés seulement au besoin;</li>
      <li>le service K80 doit encore être surveillé et relancé dans certains scénarios;</li>
      <li>la qualité des réponses des modèles n'a pas encore été évaluée aussi systématiquement que leur vitesse;</li>
      <li>certaines pistes documentées ne sont pas encore implémentées;</li>
      <li>le multi-agent avancé et le RAG ne sont pas actuellement en service;</li>
      <li>les données de performance sont liées au matériel, aux modèles et aux versions testées;</li>
      <li>
        les mesures doivent être datées et ne doivent pas être généralisées à d'autres environnements sans validation.
      </li>
    </ul>
    <p>
      Ces limites ne diminuent pas l'intérêt du projet. Elles définissent simplement ce qui a réellement été construit
      et ce qui demeure à explorer.
    </p>

    <hr />

    <h2>Ce que ce projet démontre</h2>
    <p>Au-delà des chiffres, ce chantier démontre plusieurs capacités transférables à des projets clients.</p>

    <h3>Intégrer des systèmes hétérogènes</h3>
    <p>
      Faire travailler ensemble des machines de générations différentes, des API distinctes, des GPU avec des
      contraintes incompatibles et des services développés par plusieurs équipes.
    </p>

    <h3>Travailler avec du matériel hors support</h3>
    <p>
      Trouver une chaîne logicielle compatible, compiler les outils nécessaires et déterminer si le résultat obtenu
      justifie réellement l'effort.
    </p>

    <h3>Diagnostiquer par la donnée</h3>
    <p>
      Mettre en place des benchmarks reproductibles, vérifier les hypothèses et isoler les vrais goulots d'étranglement.
    </p>

    <h3>Savoir abandonner une mauvaise piste</h3>
    <p>
      Le kernel CUDA expérimental a été conservé comme trace, mais retiré de la solution parce qu'il était 3,8 fois plus
      lent. Une solution sérieuse ne consiste pas à défendre le travail déjà investi; elle consiste à garder ce qui
      fonctionne.
    </p>

    <h3>Concevoir pour la dégradation contrôlée</h3>
    <p>
      Lorsqu'un worker GPU n'est pas disponible, la transcription peut être redirigée vers une autre machine ou vers le
      CPU plutôt que d'échouer complètement.
    </p>

    <h3>Documenter des interfaces réutilisables</h3>
    <p>
      La chaîne de transcription est consommée par un autre projet à travers un contrat d'interface documenté.
      L'appelant n'a pas besoin de connaître la topologie matérielle.
    </p>

    <h3>Diriger et vérifier des agents IA</h3>
    <p>
      Les assistants ont été utilisés comme accélérateurs de développement, mais leur travail a été inspecté, testé et
      corrigé. Cette capacité devient de plus en plus pertinente dans les projets modernes.
    </p>

    <hr />

    <h2>Applications possibles en entreprise</h2>
    <p>
      Ce laboratoire n'est pas présenté comme un produit prêt à vendre. Il démontre toutefois des approches qui peuvent
      être appliquées à des besoins réels.
    </p>

    <h3>Traitement local de données sensibles</h3>
    <ul>
      <li>transcription de réunions ou d'entrevues;</li>
      <li>analyse de documents confidentiels;</li>
      <li>assistants internes;</li>
      <li>recherche dans une base documentaire privée;</li>
      <li>traitement de données qui ne doivent pas être envoyées vers un fournisseur externe.</li>
    </ul>

    <h3>Réutilisation d'infrastructure existante</h3>
    <ul>
      <li>évaluer si du matériel déjà possédé peut être réaffecté;</li>
      <li>répartir les charges selon les ressources disponibles;</li>
      <li>éviter un achat prématuré avant d'avoir validé les besoins;</li>
      <li>déterminer objectivement les limites du matériel.</li>
    </ul>

    <h3>Intégration de solutions IA</h3>
    <ul>
      <li>connecter des modèles locaux à des outils existants;</li>
      <li>standardiser les accès avec des API compatibles;</li>
      <li>intégrer une recherche interne ou web;</li>
      <li>ajouter de la transcription;</li>
      <li>automatiser la sélection d'un service selon sa disponibilité.</li>
    </ul>

    <h3>Prototypage technique</h3>
    <ul>
      <li>valider une architecture avant un investissement plus important;</li>
      <li>comparer plusieurs modèles ou moteurs;</li>
      <li>mesurer la vitesse, la mémoire et la qualité;</li>
      <li>transformer une idée vague en prototype mesurable.</li>
    </ul>

    <hr />

    <h2>Les principaux enseignements</h2>

    <h3>1. Le matériel ancien n'est pas nécessairement inutile</h3>
    <p>
      Une carte hors support peut encore être pertinente si elle possède une caractéristique utile, ici une quantité de
      VRAM importante répartie sur deux dies.
    </p>

    <h3>2. La compatibilité ne suffit pas</h3>
    <p>
      Faire charger un modèle est seulement le début. Il faut mesurer la génération, le prefill, la stabilité sur de
      longues réponses et le comportement lors des changements de modèle.
    </p>

    <h3>3. La meilleure optimisation dépend du goulot réel</h3>
    <p>
      Lorsque le système est limité par la mémoire, augmenter la fréquence ou simplifier une opération arithmétique peut
      avoir très peu d'effet.
    </p>

    <h3>4. Une optimisation peut être spécifique au type de modèle</h3>
    <p>
      Le speculative decoding s'est montré très efficace dans certains scénarios denses, mais problématique sur les MoE
      testés.
    </p>

    <h3>5. Les échecs sont des résultats</h3>
    <p>
      Le kernel plus lent, les OOM tardifs et les recompilations sans effet ont permis d'éviter de poursuivre des
      directions inutiles.
    </p>

    <h3>6. L'intégration est une compétence en soi</h3>
    <p>
      Assembler, configurer, mesurer et documenter des outils existants peut créer beaucoup plus de valeur que de
      réécrire un composant déjà mature.
    </p>

    <hr />

    <h2>Prochaines étapes possibles</h2>
    <p>Le laboratoire ouvre plusieurs pistes, sans prétendre qu'elles sont déjà construites :</p>
    <ul>
      <li>mesurer systématiquement la qualité des réponses sur un ensemble de tâches réelles;</li>
      <li>stabiliser davantage le service K80;</li>
      <li>produire des graphiques publics à partir des benchmarks;</li>
      <li>comparer les coûts d'exploitation avec différentes options infonuagiques;</li>
      <li>ajouter des tâches de fond;</li>
      <li>explorer le RAG local;</li>
      <li>tester les sous-agents natifs de Continue.dev;</li>
      <li>intégrer éventuellement des accélérateurs supplémentaires;</li>
      <li>publier une sélection nettoyée de scripts et de résultats;</li>
      <li>transformer la chaîne de transcription en démonstration indépendante.</li>
    </ul>
    <p>La priorité demeure la même : progresser une brique à la fois et ne conserver que ce qui est validé.</p>

    <hr />

    <h2>Conclusion</h2>
    <p>Le résultat le plus visible de ce projet est simple à résumer :</p>
    <blockquote>
      <p>
        <strong>
          Une Tesla K80 de 2014, officiellement abandonnée par les outils modernes, a été remise en service pour
          exécuter localement des modèles de langage récents de 27 à 35 milliards de paramètres.
        </strong>
      </p>
    </blockquote>
    <p>Mais le véritable intérêt du chantier se trouve dans la démarche.</p>
    <p>Il a fallu :</p>
    <ul>
      <li>comprendre les limites de l'architecture;</li>
      <li>construire une chaîne de compilation compatible;</li>
      <li>exploiter correctement les deux dies;</li>
      <li>comparer plusieurs quantifications;</li>
      <li>profiler les vrais goulots;</li>
      <li>écrire puis rejeter un kernel expérimental;</li>
      <li>tester le speculative decoding;</li>
      <li>identifier des OOM tardifs;</li>
      <li>stabiliser les changements de modèle;</li>
      <li>intégrer la carte dans un environnement plus large;</li>
      <li>documenter les résultats de manière honnête.</li>
    </ul>
    <p>
      Ce projet représente bien le type de mandat qui m'intéresse : un problème atypique, plusieurs systèmes qui ne sont
      pas naturellement compatibles, peu de réponses toutes faites et un résultat qui doit être démontré plutôt que
      simplement annoncé.
    </p>
    <p>
      Je me positionne comme <strong>consultant en intégration de systèmes et solutions IA</strong>.
    </p>
    <p>
      J'interviens lorsque le projet est complexe, hors standard ou difficile à cadrer, avec une approche axée sur
      l'intégration, la mesure et la mise en œuvre concrète.
    </p>

    <hr />

    <h2>Encadré technique</h2>
    <Table>
      <thead>
        <tr>
          <th>Élément</th>
          <th>Détail</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Carte principale</td>
          <td>NVIDIA Tesla K80, double GPU GK210</td>
        </tr>
        <tr>
          <td>Architecture</td>
          <td>Kepler, sm_37</td>
        </tr>
        <tr>
          <td>VRAM utilisable</td>
          <td>Environ 22,8 Go avec ECC</td>
        </tr>
        <tr>
          <td>Environnement</td>
          <td>VM sous Proxmox avec passthrough PCI</td>
        </tr>
        <tr>
          <td>Pile de compilation</td>
          <td>CUDA 11.8, gcc-11</td>
        </tr>
        <tr>
          <td>Moteur principal</td>
          <td>llama.cpp compilé pour sm_37</td>
        </tr>
        <tr>
          <td>Service de modèles</td>
          <td>llama-swap</td>
        </tr>
        <tr>
          <td>Formats testés</td>
          <td>GGUF Q4_K_M et Q4_0</td>
        </tr>
        <tr>
          <td>Modèles</td>
          <td>Qwen récents, dense 27B et MoE jusqu'à 35B</td>
        </tr>
        <tr>
          <td>Meilleur dense standard</td>
          <td>Environ 6,30 t/s</td>
        </tr>
        <tr>
          <td>Speculative decoding dense</td>
          <td>Environ 13 à 29 t/s selon le contenu</td>
        </tr>
        <tr>
          <td>MoE stable</td>
          <td>Environ 13,5 t/s, contexte 64k</td>
        </tr>
        <tr>
          <td>Méthode</td>
          <td>Benchmarking, profilage, validation empirique</td>
        </tr>
        <tr>
          <td>Statut</td>
          <td>Laboratoire personnel, environnement expérimental</td>
        </tr>
      </tbody>
    </Table>
  </>
);

const ContentEn = () => (
  <>
    <p>
      Running a recent large language model on modern hardware is relatively accessible today. The tooling is abundant,
      graphics cards are supported, and common configurations are extensively documented.
    </p>
    <p>
      The challenge becomes far more interesting when the hardware in question is an <strong>NVIDIA Tesla K80</strong>,
      a card released in 2014, based on the Kepler architecture, dropped by modern software stacks and absent from the
      officially supported configurations of most current inference engines.
    </p>
    <p>That is exactly the project I took on as part of my personal local AI lab.</p>
    <p>
      The goal was not simply to get a few tokens printed in a terminal. I wanted to determine, in a measurable way,
      whether this card could still play a useful role in a modern local AI infrastructure, serve models of{' '}
      <strong>27 to 35 billion parameters</strong>, outperform my laptop and integrate cleanly into a multi-machine
      environment.
    </p>
    <p>The result is more nuanced and more interesting than a simple &ldquo;yes, it works&rdquo;.</p>
    <p>
      A Tesla K80 can indeed run modern models, but only by accepting to work below the usual tooling layer, compiling
      the right components, methodically testing several strategies and, above all, abandoning the optimizations that do
      not survive measurement.
    </p>

    <blockquote>
      <p>
        <strong>Headline result:</strong> a 2014 graphics card, unrecognized by modern runtimes, managed to serve recent
        Qwen models from 27B to 35B. The best measured results reach about{' '}
        <strong>13.5 tokens per second for a 35B MoE model with a 64k context</strong>, and up to{' '}
        <strong>13 to 29 tokens per second in certain speculative decoding scenarios</strong>.
      </p>
    </blockquote>

    <p>
      This project is not about training models or building a new inference engine. It is about what I do best:{' '}
      <strong>
        understanding an unusual constraint, integrating components that were never designed to work together, measuring
        the real behaviour of the system and pushing the hardware to a useful, defensible limit.
      </strong>
    </p>

    <hr />

    <h2>The context: building a local AI infrastructure with hardware already on hand</h2>
    <p>The K80 project is part of a broader lab dedicated to local AI.</p>
    <p>
      The starting point was simple: several machines were already available on my network, but they were underused.
      Rather than centralizing the entire load on an expensive new workstation or systematically depending on cloud
      services, I wanted to distribute the workloads according to each device's strengths.
    </p>
    <p>The lab rests on four types of resources:</p>
    <ul>
      <li>a laptop used as the control station and for some CPU inference;</li>
      <li>a workstation with an RTX 2070 for fast GPU tasks;</li>
      <li>another workstation with an RTX 3060, mainly used for transcription;</li>
      <li>
        a Dell R730 server running Proxmox, hosting various services including a virtual machine with the Tesla K80 in
        PCI passthrough.
      </li>
    </ul>
    <p>
      The long-term goal is a <strong>local-first</strong> environment: private, modular and incremental. It is not a
      finished product, nor an automated cluster in the strict sense. LLM task distribution is mostly handled through
      explicit configuration, while some tasks, such as transcription, use automatic selection of an available machine.
    </p>
    <p>
      That distinction matters: I am not trying to present a generalized orchestration that does not exist. The project
      rather demonstrates real integration capability across several tools, several hardware generations and several
      types of workloads.
    </p>

    <h3>Guiding principles</h3>
    <p>Four principles guided the technical decisions:</p>
    <ol>
      <li>
        <strong>Local-first</strong> — core operation must not depend on a cloud service.
      </li>
      <li>
        <strong>Privacy</strong> — private code, documents, transcripts and working data must be able to stay inside the
        local network.
      </li>
      <li>
        <strong>Modularity</strong> — each machine must be able to play a role suited to its capabilities without
        forcing a monolithic architecture.
      </li>
      <li>
        <strong>Measured progress</strong> — each new building block must be tested and documented before adding the
        next.
      </li>
    </ol>
    <p>
      That last point became central. Several assumptions that seemed logical at the outset turned out to be false once
      measured.
    </p>

    <hr />

    <h2>Why the Tesla K80 is a particular problem</h2>
    <p>The Tesla K80 is an unusual card.</p>
    <p>
      It contains two GK210 graphics processors on a single board, each with roughly 12 GB of memory. In practice, with
      ECC enabled, about <strong>22.8 GB of VRAM</strong> is usable in total.
    </p>
    <p>
      On paper, that amount of memory is attractive for local inference. It allows loading quantized models far larger
      than an 8 or 12 GB consumer card would normally accept.
    </p>
    <p>So the problem is not memory capacity alone.</p>
    <p>
      The real obstacle is the <strong>Kepler sm_37</strong> architecture.
    </p>
    <p>
      Modern versions of CUDA, PyTorch, Ollama and several inference libraries no longer support this generation. A
      standard installation is not enough. The card can be visible to the system and perfectly functional at the
      hardware level while remaining unusable by modern tooling.
    </p>

    <h3>Main constraints</h3>
    <ul>
      <li>Kepler sm_37 is deprecated;</li>
      <li>recent CUDA no longer compiles for this architecture;</li>
      <li>modern PyTorch does not recognize the card;</li>
      <li>Ollama provides no directly compatible path;</li>
      <li>some modern kernels assume instructions introduced after Kepler;</li>
      <li>the card has two separate dies, which adds a constraint on how the model is distributed;</li>
      <li>freeing VRAM between two models can be slow;</li>
      <li>available memory is significant, but bandwidth and architecture remain dated.</li>
    </ul>
    <p>
      The only realistic path was therefore to go back to a compatible stack, then compile the inference engine myself.
    </p>

    <hr />

    <h2>Recompiling llama.cpp for Kepler</h2>
    <p>
      The chosen solution relies on <strong>llama.cpp</strong>, compiled specifically for the sm_37 architecture.
    </p>
    <p>The combination used was:</p>
    <ul>
      <li>
        <strong>CUDA 11.8</strong>;
      </li>
      <li>
        <strong>gcc-11</strong> as the host compiler;
      </li>
      <li>
        compilation with <code>CMAKE_CUDA_ARCHITECTURES=37</code>;
      </li>
      <li>execution in a dedicated virtual machine under Proxmox;</li>
      <li>PCI passthrough of both K80 dies.</li>
    </ul>
    <p>
      CUDA 11.8 still accepts compiling for sm_37, but refuses GCC versions that are too recent. The build chain
      therefore had to be controlled precisely rather than simply installing the system's default packages.
    </p>
    <p>Simplified example of the build intent:</p>
    <BuildCommand />
    <p>
      This step makes the engine compatible with the card, but it does not guarantee that performance will be useful.
    </p>
    <p>
      A card capable of loading a model may still produce tokens too slowly to be interesting. The rest of the work
      therefore consisted of measuring the various configurations and finding the levers that had a real effect.
    </p>

    <hr />

    <h2>First result: the model runs, but the baseline configuration is limited</h2>
    <p>The first model used for the main campaign was a dense 27B Qwen3.6 model quantized in Q4.</p>
    <p>With a classic split between the two dies, the starting configuration gave roughly:</p>
    <Table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th className="!text-right">Prefill</th>
          <th className="!text-right">Generation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Q4_K_M, layer split</td>
          <td className="text-right">33.85 t/s</td>
          <td className="text-right">3.25 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      Prefill was already reasonable, but generation at <strong>3.25 tokens per second</strong> stayed too close to what
      my laptop CPU could reach.
    </p>
    <p>The card worked. The challenge now was to make it genuinely useful.</p>

    <hr />

    <h2>Using both dies in parallel</h2>
    <p>
      The K80 contains two distinct graphics processors. How the model is split between them has a significant effect.
    </p>
    <p>Two strategies were compared:</p>
    <ul>
      <li>a pipeline-style split, where layers are separated between the dies;</li>
      <li>a row split, where both dies work in parallel on each layer.</li>
    </ul>
    <p>
      Switching to a <code>row</code> strategy produced a clear gain:
    </p>
    <Table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th className="!text-right">Prefill</th>
          <th className="!text-right">Generation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Q4_K_M, layer split</td>
          <td className="text-right">33.85 t/s</td>
          <td className="text-right">3.25 t/s</td>
        </tr>
        <tr>
          <td>Q4_K_M, parallel row split</td>
          <td className="text-right">35.07 t/s</td>
          <td className="text-right">4.87 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      Generation went from <strong>3.25 to 4.87 tokens per second</strong>, an improvement of about 50%.
    </p>
    <p>
      This result confirms that, on this hardware, using both dies in parallel is preferable to a sequential pipeline
      for this workload.
    </p>

    <hr />

    <h2>Requantizing the model for an old architecture</h2>
    <p>
      Modern K-quant style quantizations are generally a good choice on recent hardware. They offer an attractive
      trade-off between quality, size and performance.
    </p>
    <p>On Kepler, however, that choice was not optimal.</p>
    <p>
      I therefore tested a local requantization to the <strong>Q4_0</strong> format, older and simpler. The associated
      dequantization kernels are less complex and better suited to this GPU generation.
    </p>
    <p>The result:</p>
    <Table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th className="!text-right">Prefill</th>
          <th className="!text-right">Generation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Q4_K_M, parallel split</td>
          <td className="text-right">35.07 t/s</td>
          <td className="text-right">4.87 t/s</td>
        </tr>
        <tr>
          <td>Q4_0, parallel split</td>
          <td className="text-right">35.73 t/s</td>
          <td className="text-right">6.30 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      Generation reached <strong>6.30 tokens per second</strong>, about 29% more than the previous configuration and
      nearly double the starting configuration.
    </p>
    <p>
      One limitation must be stated transparently: the Q4_0 file was produced by requantizing an already quantized
      model. This double quantization is valid for measuring speed, but its effect on quality was not systematically
      evaluated.
    </p>
    <p>
      I therefore do not present this result as a universal production recommendation. It rather demonstrates that a
      simpler quantization can be much better suited to an older architecture.
    </p>

    <hr />

    <h2>Comparison with the laptop</h2>
    <p>
      To determine whether the K80 still had real value, I compared it to my laptop's CPU and iGPU on the same order of
      magnitude of model.
    </p>
    <Table>
      <thead>
        <tr>
          <th>Platform</th>
          <th className="!text-right">Prefill</th>
          <th className="!text-right">Generation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tesla K80, best dense configuration</td>
          <td className="text-right">35.7 t/s</td>
          <td className="text-right">6.30 t/s</td>
        </tr>
        <tr>
          <td>Laptop CPU</td>
          <td className="text-right">~11 t/s</td>
          <td className="text-right">~3 t/s</td>
        </tr>
        <tr>
          <td>Intel Arc iGPU via Vulkan</td>
          <td className="text-right">~27 t/s</td>
          <td className="text-right">~2 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>The K80 wins on both metrics:</p>
    <ul>
      <li>
        about <strong>3.2 times faster than the CPU on prefill</strong>;
      </li>
      <li>
        about <strong>2.1 times faster than the CPU on generation</strong>.
      </li>
    </ul>
    <p>
      It obviously does not compete with a modern high-end card, but it outperforms the laptop enough to justify its
      role as a specialized worker in the lab.
    </p>

    <hr />

    <h2>A logical hypothesis that does not work: going back to the old CUDA paths</h2>
    <p>
      Once the model was running at 6.30 tokens per second, the next question was obvious: can we go further by
      reactivating historical optimizations designed for Kepler?
    </p>
    <p>Several old flags and compute paths were examined.</p>
    <p>
      The problem is that the DMMV path used in older versions of llama.cpp has been removed. Modern generation goes
      through MMVQ instead, which relies on strategies optimized for more recent architectures.
    </p>
    <p>
      Some operations in particular use instructions that are not natively available on Kepler and must be emulated.
    </p>
    <p>The initial hypothesis was therefore that this emulation was the main bottleneck.</p>
    <p>Recompilations with various old parameters produced no significant gain, however.</p>
    <p>
      One tested configuration gave <strong>6.32 tokens per second</strong>, practically the same result as the
      reference <strong>6.30 tokens per second</strong>.
    </p>
    <p>The conclusion was clear: these flags were no longer a relevant lever in the modern version of the engine.</p>

    <hr />

    <h2>Writing a custom CUDA kernel — and measuring a useful failure</h2>
    <p>
      To test the expensive-emulation hypothesis more directly, an experimental CUDA kernel was written for the sm_37
      architecture.
    </p>
    <p>
      Its goal was to perform Q4_0 to FP32 dequantization followed by a matrix-vector multiplication, without relying on
      the modern path presumed unfavourable to Kepler.
    </p>
    <p>Technically, the kernel worked. In terms of performance, it was clearly inferior.</p>
    <Table>
      <thead>
        <tr>
          <th>Implementation</th>
          <th className="!text-right">Generation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Standard llama.cpp MMVQ</td>
          <td className="text-right">4.48 t/s in the targeted test</td>
        </tr>
        <tr>
          <td>Experimental sm_37 CUDA kernel</td>
          <td className="text-right">1.19 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      The custom kernel was about <strong>3.8 times slower</strong>.
    </p>
    <p>This failure was particularly instructive.</p>
    <p>
      Emulating certain modern instructions was not the main problem. The standard llama.cpp kernel remained extremely
      optimized: coalesced memory access, better GPU occupancy and more efficient work organization.
    </p>
    <p>
      The custom kernel, despite simpler arithmetic logic, performed less efficient reads. On a memory-dominated
      workload, that weakness cost more than the emulation I was trying to avoid.
    </p>
    <p>The effort was therefore stopped.</p>
    <p>
      That decision is an integral part of the project. An optimization only has value if it genuinely improves the
      system. A well-measured negative result is preferable to an elegant but false intuition.
    </p>

    <hr />

    <h2>Identifying the real wall: memory bandwidth</h2>
    <p>
      Measurements progressively showed that generation was primarily <strong>memory-bound</strong>.
    </p>
    <p>
      In other words, the GPU was not short on arithmetic operations. It spent most of its time moving and re-reading
      the model weights.
    </p>
    <p>Several indicators converged:</p>
    <ul>
      <li>
        profiling attributed about <strong>78.6% of the time</strong> to the <code>MUL_MAT[q4_0]</code> operation;
      </li>
      <li>
        a significant increase in GPU clock brought only about <strong>2.7%</strong> of gain;
      </li>
      <li>targeted arithmetic optimizations changed almost nothing;</li>
      <li>the simpler quantization improved results by reducing read and dequantization cost.</li>
    </ul>
    <p>Once that was established, continuing to look only at kernels became pointless.</p>
    <p>The goal instead had to be reducing how many times the model weights were re-read.</p>

    <hr />

    <h2>Speculative decoding: exploiting the memory wall instead of fighting it</h2>
    <p>
      <strong>Speculative decoding</strong> based on an n-gram cache became the next lever.
    </p>
    <p>
      The principle is to propose several candidate tokens from the existing context, then verify them as a group with
      the main model.
    </p>
    <p>
      On a machine limited by memory bandwidth, this approach is attractive: the verification pass can validate several
      tokens after a single large read of the weights.
    </p>
    <p>
      Results on real-world content were highly variable, but clearly superior to standard generation when the context
      contained enough reusable patterns.
    </p>
    <p>Effective throughput observed:</p>
    <Table>
      <thead>
        <tr>
          <th>Content type</th>
          <th className="!text-right">Measured results</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Code</td>
          <td className="text-right">13.0 to 27.9 t/s</td>
        </tr>
        <tr>
          <td>Technical text</td>
          <td className="text-right">24.1 to 29.4 t/s</td>
        </tr>
        <tr>
          <td>Questions and answers</td>
          <td className="text-right">13.6 to 25.3 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      All six recorded runs exceeded <strong>10 tokens per second</strong>, compared to about{' '}
      <strong>6.47 tokens per second</strong> in the reference dense configuration used for this series.
    </p>
    <p>In the best cases, throughput was multiplied by two to four.</p>

    <h3>An important limitation</h3>
    <p>N-gram speculative decoding depends heavily on repetition in the context.</p>
    <p>
      On creative or unpredictable text, the gain can shrink and throughput can fall back to around{' '}
      <strong>7 to 9 tokens per second</strong>.
    </p>
    <p>
      It is therefore not a universal multiplier. It is a contextual optimization that is particularly useful for code,
      technical documentation, rewriting and other structured workloads.
    </p>

    <hr />

    <h2>The MoE trap: a short test can lie</h2>
    <p>
      The lab also uses <strong>Mixture of Experts</strong>, or MoE, models.
    </p>
    <p>
      These models can offer a good ratio between total capacity and the number of parameters activated per token. On
      the available hardware, they proved particularly interesting.
    </p>
    <p>However, adding speculative decoding to MoE models created a deceptive problem.</p>
    <p>The model could:</p>
    <ul>
      <li>load correctly;</li>
      <li>pass the health check;</li>
      <li>process the prefill;</li>
      <li>start generating normally.</li>
    </ul>
    <p>Then, after several hundred tokens, the compute buffer grew enough to trigger an out-of-memory error.</p>
    <p>The problem therefore did not show up in a quick test.</p>
    <p>Runs at 800 tokens made it possible to distinguish stable configurations from fragile ones.</p>
    <Table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>MoE, large context, speculative decoding</td>
          <td>OOM</td>
        </tr>
        <tr>
          <td>MoE, reduced context, speculative decoding</td>
          <td>sometimes stable, but less advantageous</td>
        </tr>
        <tr>
          <td>MoE, 64k context, without speculative decoding</td>
          <td>stable, about 13.5 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      The final decision was to serve MoE models <strong>without speculative decoding</strong>, with their full context.
    </p>
    <p>
      This configuration is both more stable and faster than the only speculative configuration small enough to fit in
      memory.
    </p>
    <blockquote>
      <p>
        For the 35B MoE models tested, the best measured trade-off is about{' '}
        <strong>13.5 tokens per second with a 64k context</strong>, without speculative decoding.
      </p>
    </blockquote>
    <p>
      This step is a reminder of an important rule: a benchmark of a few dozen tokens does not validate a service. A
      configuration can pass every superficial check and fail only during a long generation.
    </p>

    <hr />

    <h2>Handling slow VRAM release</h2>
    <p>Another problem appeared when switching models.</p>
    <p>
      After stopping a model, the K80's memory did not become available again immediately. The new server could start,
      pass its initial check, then crash on the first generation because the previous model's VRAM had not yet been
      fully released.
    </p>
    <p>The behaviour seemed random, but it was reproducible.</p>
    <p>The solution was to add a startup wrapper that:</p>
    <ol>
      <li>monitors VRAM usage;</li>
      <li>waits for it to drop below a defined threshold;</li>
      <li>checks at regular intervals;</li>
      <li>then launches the new server.</li>
    </ol>
    <p>This small piece of integration made model switching far more reliable.</p>
    <p>
      It illustrates the nature of the project well: the difficulty was not only in the compilation or in the models. It
      was also in the operational details that separate a one-off benchmark from a genuinely usable service.
    </p>

    <hr />

    <h2>Consolidated results</h2>
    <p>Here is the main progression of the dense track:</p>
    <Table>
      <thead>
        <tr>
          <th>Step</th>
          <th className="!text-right">Generation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Starting configuration, Q4_K_M, pipeline</td>
          <td className="text-right">3.25 t/s</td>
        </tr>
        <tr>
          <td>Parallel split across both dies</td>
          <td className="text-right">4.87 t/s</td>
        </tr>
        <tr>
          <td>Q4_0 requantization</td>
          <td className="text-right">6.30 t/s</td>
        </tr>
        <tr>
          <td>Speculative decoding, depending on content</td>
          <td className="text-right">13 to 29 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>And for MoE models:</p>
    <Table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th className="!text-right">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>35B MoE model, speculative decoding</td>
          <td className="text-right">unstable or OOM depending on context</td>
        </tr>
        <tr>
          <td>35B MoE model, without speculative decoding, 64k context</td>
          <td className="text-right">~13.5 t/s</td>
        </tr>
      </tbody>
    </Table>
    <p>
      The K80 does not become a modern card. It remains limited by its architecture, its bandwidth, its energy
      efficiency and its lack of official support.
    </p>
    <p>
      But it moves from the status of theoretically obsolete hardware to that of a genuinely useful worker for certain
      local workloads.
    </p>

    <hr />

    <h2>Beyond the K80: a local AI environment distributed by roles</h2>
    <p>The K80 track is the most technical part of the lab, but it does not exist in isolation.</p>
    <p>
      The local environment uses several existing components, configured and integrated according to hardware
      capabilities.
    </p>

    <h3>LLM inference</h3>
    <ul>
      <li>
        <strong>Ollama</strong> on several machines;
      </li>
      <li>
        <strong>llama.cpp</strong> compiled for Kepler on the K80;
      </li>
      <li>
        <strong>llama-swap</strong> to load and unload models;
      </li>
      <li>OpenAI-compatible APIs to standardize the access points.</li>
    </ul>

    <h3>Development agents</h3>
    <p>
      The main interface is <strong>Continue.dev</strong>, used in Visual Studio Code and on the command line.
    </p>
    <p>
      Continue.dev was not rewritten. It was integrated and configured to use the local models available on different
      machines.
    </p>
    <p>The work notably surfaced several non-obvious behaviours:</p>
    <ul>
      <li>Continue's context length setting did not propagate to Ollama as expected;</li>
      <li>custom models had to explicitly declare their ability to use tools;</li>
      <li>too small a context caused loops;</li>
      <li>a model's name could wrongly influence capability detection;</li>
      <li>
        some observed limitations came from the model's behaviour rather than from a bug in how tools were transmitted.
      </li>
    </ul>
    <p>
      Derived Ollama models were therefore created with the context fixed at 16k, and behaviour rules were added to the
      configuration.
    </p>
    <p>
      A real case that previously required about ten manual retries was brought down to a single pass after analyzing
      telemetry and adjusting the rules.
    </p>

    <h3>Local web search</h3>
    <p>
      The search tool built into Continue.dev depended on a cloud proxy that did not work in the configuration used.
    </p>
    <p>
      A self-hosted <strong>SearXNG</strong> service was therefore integrated over MCP to provide locally controlled web
      search, without depending on an external API key.
    </p>

    <h3>Local transcription</h3>
    <p>The lab also hosts a transcription chain based on WhisperX, CTranslate2, pyannote and ffmpeg.</p>
    <p>A script automatically selects an available machine:</p>
    <ol>
      <li>RTX 3060 worker;</li>
      <li>RTX 2070 worker;</li>
      <li>CPU fallback if no GPU is available.</li>
    </ol>
    <p>The pipeline handles, among other things:</p>
    <ul>
      <li>machine selection;</li>
      <li>serialization of GPU tasks;</li>
      <li>temporarily unloading an Ollama model when it conflicts with transcription;</li>
      <li>audio normalization;</li>
      <li>channel extraction;</li>
      <li>timestamping;</li>
      <li>diarization;</li>
      <li>glossary injection;</li>
      <li>producing an execution manifest.</li>
    </ul>
    <p>
      A real test processed <strong>42 minutes of audio in 2 minutes 15 seconds</strong>, roughly{' '}
      <strong>24 times faster than real time</strong>, with timestamps and speaker attribution.
    </p>
    <p>Transcription is currently the part closest to a deliverable directly reusable by another project.</p>

    <hr />

    <h2>What was integrated, and what comes from existing tools</h2>
    <p>
      To present this project correctly, it is important to distinguish integration work from third-party components.
    </p>
    <p>I did not create:</p>
    <ul>
      <li>Ollama;</li>
      <li>llama.cpp;</li>
      <li>Continue.dev;</li>
      <li>WhisperX;</li>
      <li>pyannote;</li>
      <li>SearXNG;</li>
      <li>the Qwen models;</li>
      <li>an inference engine;</li>
      <li>a new large language model.</li>
    </ul>
    <p>The work done lies in:</p>
    <ul>
      <li>architecture design;</li>
      <li>assigning roles to machines;</li>
      <li>service configuration;</li>
      <li>targeted compilation for out-of-support hardware;</li>
      <li>network and API integration;</li>
      <li>writing automation scripts;</li>
      <li>transcription routing;</li>
      <li>model and context configuration;</li>
      <li>tooling diagnosis;</li>
      <li>benchmarking;</li>
      <li>profiling;</li>
      <li>documentation;</li>
      <li>hypothesis validation;</li>
      <li>reasoned abandonment of ineffective paths.</li>
    </ul>
    <p>
      This is exactly what I aim to put forward in my work as a systems integration consultant:{' '}
      <strong>I do not need to reinvent every component to create a solution that did not exist in this form.</strong>
    </p>
    <p>
      The value lies in understanding the need, choosing the building blocks, adapting them, integrating them and being
      able to prove that the result works.
    </p>

    <hr />

    <h2>An AI-assisted working method, verified by measurement</h2>
    <p>The project was built by directing AI assistants across the different machines and repositories.</p>
    <p>I consider it important to say so clearly.</p>
    <p>
      The agents contributed to producing scripts, documentation, diagnostic commands and experimental directions. My
      role was to define the objectives, organize the work, decide on directions, launch the runs, compare the results,
      correct the hypotheses and validate what was worth keeping.
    </p>
    <p>Using agents does not replace technical validation.</p>
    <p>On the contrary, this project reinforced a simple discipline:</p>
    <blockquote>
      <p>
        <strong>Assert nothing about a system's behaviour before measuring it.</strong>
      </p>
    </blockquote>
    <p>Several proposed or intuitively appealing ideas turned out to be false:</p>
    <ul>
      <li>increasing all CPU threads could slow down inference;</li>
      <li>the apparent format of tool calls did not predict an agent's quality;</li>
      <li>emulating a modern instruction was not the K80's main bottleneck;</li>
      <li>a simpler CUDA kernel could be much slower;</li>
      <li>a configuration that passed a health check could fail after 700 tokens;</li>
      <li>speculative decoding could be excellent for a dense model and poor for an MoE;</li>
      <li>an old card could beat a modern CPU when used in the right role.</li>
    </ul>
    <p>AI accelerated exploration. Measurements decided what was true.</p>

    <hr />

    <h2>Current limitations of the lab</h2>
    <p>The project remains a personal lab, not a production platform intended for the public.</p>
    <p>Some limitations are accepted:</p>
    <ul>
      <li>LLM distribution is not generally automated;</li>
      <li>some workers are powered on only when needed;</li>
      <li>the K80 service still has to be monitored and restarted in certain scenarios;</li>
      <li>model response quality has not yet been evaluated as systematically as speed;</li>
      <li>some documented directions are not implemented yet;</li>
      <li>advanced multi-agent setups and RAG are not currently in service;</li>
      <li>performance data is tied to the hardware, models and versions tested;</li>
      <li>measurements must be dated and must not be generalized to other environments without validation.</li>
    </ul>
    <p>
      These limitations do not diminish the interest of the project. They simply define what was actually built and what
      remains to be explored.
    </p>

    <hr />

    <h2>What this project demonstrates</h2>
    <p>Beyond the numbers, this work demonstrates several capabilities transferable to client projects.</p>

    <h3>Integrating heterogeneous systems</h3>
    <p>
      Making machines from different generations work together, along with distinct APIs, GPUs with incompatible
      constraints and services developed by several teams.
    </p>

    <h3>Working with out-of-support hardware</h3>
    <p>
      Finding a compatible software chain, compiling the necessary tools and determining whether the result actually
      justifies the effort.
    </p>

    <h3>Diagnosing through data</h3>
    <p>Setting up reproducible benchmarks, verifying hypotheses and isolating the real bottlenecks.</p>

    <h3>Knowing when to abandon a bad path</h3>
    <p>
      The experimental CUDA kernel was kept as a trace, but removed from the solution because it was 3.8 times slower. A
      serious solution is not about defending work already invested; it is about keeping what works.
    </p>

    <h3>Designing for controlled degradation</h3>
    <p>
      When a GPU worker is unavailable, transcription can be redirected to another machine or to the CPU rather than
      failing outright.
    </p>

    <h3>Documenting reusable interfaces</h3>
    <p>
      The transcription chain is consumed by another project through a documented interface contract. The caller does
      not need to know the hardware topology.
    </p>

    <h3>Directing and verifying AI agents</h3>
    <p>
      The assistants were used as development accelerators, but their work was inspected, tested and corrected. This
      capability is becoming increasingly relevant in modern projects.
    </p>

    <hr />

    <h2>Possible business applications</h2>
    <p>
      This lab is not presented as a ready-to-sell product. It does, however, demonstrate approaches that can be applied
      to real needs.
    </p>

    <h3>Local processing of sensitive data</h3>
    <ul>
      <li>transcription of meetings or interviews;</li>
      <li>analysis of confidential documents;</li>
      <li>internal assistants;</li>
      <li>search across a private document base;</li>
      <li>processing data that must not be sent to an external provider.</li>
    </ul>

    <h3>Reusing existing infrastructure</h3>
    <ul>
      <li>assessing whether hardware already owned can be repurposed;</li>
      <li>distributing workloads according to available resources;</li>
      <li>avoiding a premature purchase before validating the needs;</li>
      <li>objectively determining the limits of the hardware.</li>
    </ul>

    <h3>Integrating AI solutions</h3>
    <ul>
      <li>connecting local models to existing tools;</li>
      <li>standardizing access with compatible APIs;</li>
      <li>integrating internal or web search;</li>
      <li>adding transcription;</li>
      <li>automating service selection based on availability.</li>
    </ul>

    <h3>Technical prototyping</h3>
    <ul>
      <li>validating an architecture before a larger investment;</li>
      <li>comparing several models or engines;</li>
      <li>measuring speed, memory and quality;</li>
      <li>turning a vague idea into a measurable prototype.</li>
    </ul>

    <hr />

    <h2>Key takeaways</h2>

    <h3>1. Old hardware is not necessarily useless</h3>
    <p>
      An out-of-support card can still be relevant if it has a useful characteristic — here, a large amount of VRAM
      spread across two dies.
    </p>

    <h3>2. Compatibility is not enough</h3>
    <p>
      Getting a model to load is only the beginning. You have to measure generation, prefill, stability on long
      responses and behaviour during model switches.
    </p>

    <h3>3. The best optimization depends on the real bottleneck</h3>
    <p>
      When the system is memory-limited, raising the clock or simplifying an arithmetic operation can have very little
      effect.
    </p>

    <h3>4. An optimization can be specific to the model type</h3>
    <p>
      Speculative decoding proved very effective in certain dense scenarios, but problematic on the MoE models tested.
    </p>

    <h3>5. Failures are results</h3>
    <p>
      The slower kernel, the late OOMs and the recompilations with no effect all helped avoid pursuing useless
      directions.
    </p>

    <h3>6. Integration is a skill in itself</h3>
    <p>
      Assembling, configuring, measuring and documenting existing tools can create far more value than rewriting an
      already mature component.
    </p>

    <hr />

    <h2>Possible next steps</h2>
    <p>The lab opens several directions, without claiming they are already built:</p>
    <ul>
      <li>systematically measuring response quality on a set of real tasks;</li>
      <li>further stabilizing the K80 service;</li>
      <li>producing public charts from the benchmarks;</li>
      <li>comparing operating costs against various cloud options;</li>
      <li>adding background tasks;</li>
      <li>exploring local RAG;</li>
      <li>testing Continue.dev's native sub-agents;</li>
      <li>eventually integrating additional accelerators;</li>
      <li>publishing a cleaned-up selection of scripts and results;</li>
      <li>turning the transcription chain into a standalone demonstration.</li>
    </ul>
    <p>The priority stays the same: progress one building block at a time and keep only what has been validated.</p>

    <hr />

    <h2>Conclusion</h2>
    <p>The most visible result of this project is easy to summarize:</p>
    <blockquote>
      <p>
        <strong>
          A 2014 Tesla K80, officially abandoned by modern tooling, was brought back into service to run recent language
          models of 27 to 35 billion parameters locally.
        </strong>
      </p>
    </blockquote>
    <p>But the real interest of the project lies in the approach.</p>
    <p>It required:</p>
    <ul>
      <li>understanding the limits of the architecture;</li>
      <li>building a compatible build chain;</li>
      <li>using both dies correctly;</li>
      <li>comparing several quantizations;</li>
      <li>profiling the real bottlenecks;</li>
      <li>writing then rejecting an experimental kernel;</li>
      <li>testing speculative decoding;</li>
      <li>identifying late OOMs;</li>
      <li>stabilizing model switches;</li>
      <li>integrating the card into a broader environment;</li>
      <li>documenting the results honestly.</li>
    </ul>
    <p>
      This project is a good representation of the kind of engagement that interests me: an atypical problem, several
      systems that are not naturally compatible, few ready-made answers and a result that has to be demonstrated rather
      than simply announced.
    </p>
    <p>
      I position myself as a <strong>systems integration and AI solutions consultant</strong>.
    </p>
    <p>
      I step in when a project is complex, non-standard or hard to scope, with an approach focused on integration,
      measurement and concrete implementation.
    </p>

    <hr />

    <h2>Technical summary</h2>
    <Table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Main card</td>
          <td>NVIDIA Tesla K80, dual GK210 GPU</td>
        </tr>
        <tr>
          <td>Architecture</td>
          <td>Kepler, sm_37</td>
        </tr>
        <tr>
          <td>Usable VRAM</td>
          <td>About 22.8 GB with ECC</td>
        </tr>
        <tr>
          <td>Environment</td>
          <td>VM under Proxmox with PCI passthrough</td>
        </tr>
        <tr>
          <td>Build stack</td>
          <td>CUDA 11.8, gcc-11</td>
        </tr>
        <tr>
          <td>Main engine</td>
          <td>llama.cpp compiled for sm_37</td>
        </tr>
        <tr>
          <td>Model service</td>
          <td>llama-swap</td>
        </tr>
        <tr>
          <td>Formats tested</td>
          <td>GGUF Q4_K_M and Q4_0</td>
        </tr>
        <tr>
          <td>Models</td>
          <td>Recent Qwen, dense 27B and MoE up to 35B</td>
        </tr>
        <tr>
          <td>Best standard dense</td>
          <td>About 6.30 t/s</td>
        </tr>
        <tr>
          <td>Dense speculative decoding</td>
          <td>About 13 to 29 t/s depending on content</td>
        </tr>
        <tr>
          <td>Stable MoE</td>
          <td>About 13.5 t/s, 64k context</td>
        </tr>
        <tr>
          <td>Method</td>
          <td>Benchmarking, profiling, empirical validation</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>Personal lab, experimental environment</td>
        </tr>
      </tbody>
    </Table>
  </>
);

export default LlmTeslaK80;
