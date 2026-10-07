# Website-CSS

Code source de [css.topazdev.fr](https://css.topazdev.fr) : l'hébergement et l'explorateur des feuilles de style TopazDev.

Version **_8.0_**

Le site a deux rôles :

- **Servir les fichiers CSS** des anciennes versions à leur adresse habituelle, par exemple `https://css.topazdev.fr/v7/main.css`, pour les sites qui les utilisent encore.
- **Les parcourir dans un explorateur** : navigation dans les dossiers, lecture des fichiers avec coloration syntaxique, téléchargement et copie du lien.

La version 8 n'a plus de CSS maison : elle s'appuie sur [Tailwind CSS](https://tailwindcss.com), [daisyUI](https://daisyui.com) et [Font Awesome](https://fontawesome.com), avec le thème TopazDev. Le site lui-même est construit avec.

## Stack

- [React 19](https://react.dev) en JSX, [Vite](https://vite.dev), [React Router](https://reactrouter.com)
- [Tailwind CSS 4](https://tailwindcss.com) et [daisyUI 5](https://daisyui.com) (thème `topazdev`)
- [Font Awesome](https://fontawesome.com) (composant React)
- [highlight.js](https://highlightjs.org) pour le visionneur

## Pages

| URL | Contenu |
|---|---|
| `/` | Accueil : sections Version 8, Version 7 et Version 6 |
| `/d/<dossier>` | Contenu d'un dossier, ex. `/d/v7/bastion` |
| `/v/<fichier>` | Visionneur de fichier, ex. `/v/v7/main.css` |
| `/erreur-<code>` | Page d'erreur, ex. `/erreur-404` |
| `/<page>` | Redirection vers `https://topazdev.fr/<page>` |

Ces URLs sont les mêmes que sur l'ancien site en PHP (v7.5).

## Démarrage

Prérequis : Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev      # serveur de développement sur http://localhost:5173
npm run build    # build de production dans dist/
npm run preview  # prévisualisation du build
npm run lint     # vérification du code (oxlint)
```

## Structure

```
public/                 Fichiers servis tels quels
  6.0 … 6.7, v7/        Feuilles de style des anciennes versions
  images/               Images du site (non listées dans l'explorateur)
  .htaccess             Réécriture d'URL pour Apache
plugins/file-tree.js    Plugin Vite : arborescence de public/
src/
  components/Layout/    Navbar et footer
  components/           Bouton, cartes de l'explorateur
  pages/                Accueil, dossier, visionneur, erreur
  lib/tree.js           Recherche dans l'arborescence, chemins
  lib/fontawesome.js    Icônes Font Awesome utilisables par leur nom
  index.css             Tailwind, thème daisyUI topazdev, couleurs td-*
```

## Comment faire

### Ajouter une version ou des fichiers

Déposer le dossier dans `public/`. L'explorateur se met à jour tout seul : le plugin [`plugins/file-tree.js`](plugins/file-tree.js) lit `public/` au moment du build, et en continu avec `npm run dev`.

Sur l'accueil, les dossiers sont rangés d'après leur numéro de version : `6.5s` va dans la Version 6, `v7` dans la Version 7. Les sections se règlent dans le tableau `SECTIONS` de [`src/pages/Home.jsx`](src/pages/Home.jsx) :

- `links` : cartes vers des sites externes (Version 8)
- `expand: 'v7'` : affiche directement le contenu du dossier plutôt que sa carte

Pour qu'un dossier de `public/` soit servi sans apparaître dans l'explorateur, l'ajouter à `IGNORED_ROOT_DIRS` dans le plugin, comme `images`.

### Utiliser une icône Font Awesome

Deux façons :

```jsx
// Par le nom : l'icône doit être déclarée dans src/lib/fontawesome.js
<FontAwesomeIcon icon="fa-brands fa-github" />

// Par import direct : rien à déclarer
import { faHouse } from '@fortawesome/free-solid-svg-icons'
<FontAwesomeIcon icon={faHouse} />
```

Une icône appelée par son nom mais non déclarée ne s'affiche pas. Les packs complets ne sont pas chargés : ils ajouteraient environ 1,6 Mo au site.

### Modifier les couleurs

Le thème daisyUI `topazdev` et les couleurs `td-*` (`text-td-ultradarkblue`, `bg-td-smoothwhite`…) sont dans [`src/index.css`](src/index.css). Le même thème est utilisé par [Website-Download](https://github.com/TopazDev/Website-Download) : penser à modifier les deux.

## Déploiement

1. `npm run build`
2. Copier le contenu de `dist/` à la racine du site sur le serveur Apache.

Le fichier `.htaccess` (copié depuis `public/`) sert directement les fichiers qui existent, comme les CSS, et renvoie toutes les autres URLs vers `index.html`, où React prend le relais. Le module `mod_rewrite` doit être activé.

## Licence

© 2015 - 2026 TopazDev. Tous droits réservés.

Font Awesome Free (dans `public/v7/fontawesome/` et le zip) est distribué sous sa propre licence : voir `public/v7/fontawesome/LICENSE.txt`.
