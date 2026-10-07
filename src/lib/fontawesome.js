import { library } from '@fortawesome/fontawesome-svg-core'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faHouse } from '@fortawesome/free-solid-svg-icons'

// Icônes utilisables par leur nom, ex. <FontAwesomeIcon icon="fa-brands fa-github" />
// Ajouter ici chaque nouvelle icône utilisée par son nom (sinon elle ne s'affiche pas).
// Enregistrer les packs complets (fas, far, fab) ajouterait ~1,6 Mo au bundle.
//
// L'import direct reste possible sans rien enregistrer :
//   import { faChevronLeft, faHouse } from '@fortawesome/free-solid-svg-icons'
//   <FontAwesomeIcon icon={faHouse} />
library.add(
  // Solid (fa-solid)
  faChevronLeft,
  faHouse,
  // Regular (fa-regular)
  faCopyright,
  // Brands (fa-brands)
  faDiscord,
  faGithub,
)
