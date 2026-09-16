# Zone Cloudflare — politique d'indexation

Ce dépôt sert `al-si.com`, mais la zone Cloudflare du même nom héberge aussi
plusieurs autres sous-domaines (sites clients en préproduction, outils internes,
projets personnels). Deux règles au niveau de la zone décident lesquels Google a
le droit d'indexer.

Ces règles ne vivent que dans le dashboard Cloudflare. Rien dans ce dépôt ne les
produit, et rien ne les redéploie. D'où ce document : sans lui, elles sont de
l'état invisible.

## Règle 1 — noindex par défaut sur tout sauf exceptions

**Rules → Transform Rules → Modify Response Header**
Nom : `noindex sur tous les sous-domaines sauf exceptions`

```
Expression : not (http.host in {"al-si.com" "fi.al-si.com"})
Action     : set X-Robots-Tag = noindex, nofollow, noarchive
```

C'est une liste de refus par défaut, pas une liste de blocage. Tout hôte de la
zone est non indexable **sauf** ceux nommés dans l'expression. Un nouveau
sous-domaine hérite donc du `noindex` sans intervention — c'est le comportement
voulu : on ne veut pas qu'un oubli expose une préprod.

### Rendre un sous-domaine indexable

Ajouter son nom dans les accolades :

```
not (http.host in {"al-si.com" "fi.al-si.com" "nouveau.al-si.com"})
```

## Règle 2 — www vers l'apex

**Rules → Redirect Rules**
Nom : `www vers apex (301)`

```
Expression : http.host eq "www.al-si.com"
Action     : 301 vers concat("https://al-si.com", http.request.uri.path)
             preserve_query_string = true
```

Sans elle, `www.al-si.com` servait le site complet en 200 — un duplicata de
toutes les pages sur un second nom d'hôte.

Ne remplace **pas** cette redirection par un `noindex` sur `www`. Ces pages
portent un canonical vers `al-si.com` ; Google consolide les signaux vers l'URL
canonique, et le `noindex` risquerait d'être reporté sur le site principal.
Un `noindex` ne va jamais sur une page qui canonicalise vers une URL qu'on veut
garder indexée.

## Les deux angles morts

La règle 1 ne couvre pas tout. Deux situations lui échappent, et ce sont des
conditions à connaître, pas une liste à tenir à jour.

**1. Les enregistrements DNS-only (nuage gris).** Cloudflare ne voit pas passer
le trafic et ne peut donc pas injecter l'en-tête. Ces hôtes doivent envoyer le
`noindex` eux-mêmes, depuis leur serveur d'origine. Exemple, dans un vhost
Apache :

```apache
Header always set X-Robots-Tag "noindex, nofollow, noarchive"
```

**2. Un `Disallow: /` dans le robots.txt de l'hôte.** Contre-intuitif mais
décisif : `Disallow` empêche Googlebot de **charger** la page, donc il ne lit
jamais l'en-tête `noindex`. Une URL bloquée par robots.txt peut malgré tout
apparaître dans les résultats, sans titre ni extrait, si elle est liée depuis
ailleurs.

Pour que la règle 1 fonctionne, les sous-domaines doivent rester **explorables**.
Le `noindex` fait le travail ; le `Disallow` l'en empêche.

## Le noindex cache une page, il ne cache pas un nom d'hôte

Les deux règles ci-dessus décident ce que Google affiche. Elles ne décident pas
ce que la zone **publie**, et la distinction compte dès qu'un sous-domaine est
censé rester discret — une préproduction client, un outil interne.

Cloudflare émet un **certificat par nom d'hôte** sur cette zone : le certificat
servi pour `fi.al-si.com` porte ce seul nom en `Subject Alternative Name`, pas
un joker. Or tout certificat publiquement approuvé est inscrit dans les
**journaux de transparence** (Certificate Transparency), qui sont publics,
append-only et interrogeables sans authentification — l'API de Cert Spotter rend
la liste complète des sous-domaines de la zone en un appel, sans clé.

Conséquence, à traiter comme une donnée de départ et non comme un réglage :

- **Créer un sous-domaine, c'est le publier.** Quelques minutes après l'émission
  du certificat, le nom est connu du monde entier, et il l'est définitivement.
  Le `noindex` de la règle 1 empêche Google de l'afficher ; il n'empêche ni
  l'inscription au journal, ni les scanners qui le lisent d'aller frapper à la
  porte.
- **Un domaine personnalisé R2 se comporte pareil** : il provisionne un
  certificat pour l'hôte choisi, donc il se publie aussi.
- **Un chemin ne se publie pas.** `al-si.com/quelque-chose` n'apparaît dans aucun
  certificat, aucun enregistrement DNS, aucun journal de transparence. Pour ce
  qui doit rester introuvable, un chemin sur l'apex bat un sous-domaine dédié.
- **Rien de tout cela n'est un contrôle d'accès.** Ce qui doit rester privé se
  protège — Cloudflare Access, un mot de passe —, pas par la discrétion du nom.

### Voir ce que la zone a déjà publié

```bash
curl -s "https://api.certspotter.com/v1/issuances?domain=al-si.com&include_subdomains=true&expand=dns_names" \
  | python3 -c 'import sys,json;print("\n".join(sorted({n for e in json.load(sys.stdin) for n in e["dns_names"]})))'
```

À lancer avant de se demander si un sous-domaine est discret : la réponse y est
déjà.

## Un sous-domaine retiré met des semaines à quitter les rapports

Quand un sous-domaine disparaît — enregistrement DNS supprimé, préprod client
rendue —, ses URL restent dans Search Console longtemps après, et elles s'y
rangent sous des motifs qui ont l'air alarmants : « Introuvable (404) », « Page
en double », « Explorée, actuellement non indexée ». L'hôte ne résout plus
depuis des semaines que le rapport le compte encore.

Rien à faire : Google les retire de lui-même en les recrawlant. Avant de partir
en chasse sur un motif du rapport d'indexation, vérifier que l'hôte existe
encore — c'est souvent là que l'enquête s'arrête :

```bash
dig +short <sous-domaine>.al-si.com   # silence = l'hôte n'existe plus
```

## Vérification

```bash
# Doit rester indexable — aucune sortie attendue
curl -sI https://al-si.com/fr/     | grep -i x-robots-tag
curl -sI https://fi.al-si.com/     | grep -i x-robots-tag

# Doit être bloqué — x-robots-tag: noindex, nofollow, noarchive
curl -sI https://<sous-domaine>.al-si.com/ | grep -i x-robots-tag

# www doit rediriger, pas servir
curl -sI https://www.al-si.com/fr/ | grep -iE '^HTTP/|^location'
```

Après une modification de règle, compter environ une minute de propagation sur
le réseau Cloudflare avant que la vérification soit fiable.

## Accès

Les deux règles se modifient par le dashboard, ou par l'API Rulesets avec un
jeton portant `Zone Transform Rules Write` et `Dynamic URL Redirects Write`,
borné à cette zone.

Attention au piège : la permission `Config Settings Write` (présentée dans
l'interface comme « Zone → Config → Édition ») **ne suffit pas** pour les
rulesets et renvoie `request is not authorized`. Il faut les groupes dédiés
ci-dessus.

Le pointeur vers le jeton est dans les notes privées, hors dépôt. Aucun secret
n'est versionné ici.
