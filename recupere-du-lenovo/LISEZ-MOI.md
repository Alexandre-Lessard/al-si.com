# Retrouvé sur l'ancien Lenovo — encore bon ou pas ?

**⚠️ Question ouverte pour Alex. Ne rien réintégrer sans lui demander.**

Ce fichier a été retrouvé le **2026-08-09** dans le `.stversions` de Syncthing du ThinkPad
T580 (`ajezez`), pendant son décommissionnement. Il avait été **supprimé de
`~/work/al-si.com/`** et n'existait plus nulle part ailleurs — ni sur le MSI, ni sur popos.

Il a été récupéré **par précaution**, pas parce qu'on sait qu'il sert encore.

## 🙋 Ce qu'on aimerait savoir

**Est-ce que cet article est encore d'actualité, ou est-ce qu'il a été retiré
volontairement ?**

Si tu tombes là-dessus en travaillant sur `al-si.com` : pose la question à Alex.

- **Encore bon** → le remettre à sa place et supprimer ce dossier.
- **Périmé, ou remplacé par une autre version** → supprimer ce dossier.

## Ce qu'il y a

| Fichier                         | Emplacement d'origine | Version datée du | Taille |
| ------------------------------- | --------------------- | ---------------- | ------ |
| `article-llm-tesla-k80-2014.md` | `~/work/al-si.com/`   | **2026-07-28**   | 37 Ko  |

Un article rédigé, pas un brouillon d'une ligne — **37 Ko de contenu**. Le sujet touche
l'inférence LLM sur une **Tesla K80**, la carte de 2014 qui équipe le serveur R730 du
bureau _(voir `~/work/proxmox/`)_.

⚠️ Les autres fichiers `al-si.com` retrouvés au même endroit étaient des **artefacts de
build** (`dist/client/assets/…`) — régénérables, donc écartés. Seul cet article a été
conservé.

## D'où ça vient exactement

`.stversions` est l'archive locale de Syncthing : quand un fichier est supprimé ou
remplacé, la version précédente y est déposée au lieu d'être perdue. Le Lenovo a conservé
celui-ci ; popos, qui a pourtant 115 Go d'historique, ne l'avait pas.

Sur les **8 068 fichiers** archivés du Lenovo, **43** étaient dans ce cas, et **5** ont
paru valoir la peine d'être sauvés.

Contexte complet : [`~/work/msi/reference-lenovo/`](../../msi/reference-lenovo/README.md).
