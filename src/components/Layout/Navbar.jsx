import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router'
import { backPath } from '../../lib/tree.js'

export default function Navbar() {
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    return (
        <nav className="navbar bg-base-200 text-base-content gap-2 sm:gap-3 px-3 py-4 sm:px-4 m-3 w-auto rounded-3xl" aria-label="Navigation principale">
            <div className="navbar-start w-auto shrink-0 flex items-center gap-2.5 sm:gap-4">
                <Link to="/" className="flex items-center gap-2 sm:gap-3" aria-label="Accueil TopazDev CSS">
                    <span className="text-lg sm:text-xl font-semibold text-primary">CSS</span>
                    <FontAwesomeIcon icon="fa-solid fa-house" size="lg" />
                </Link>
                {!isHome && (
                    <Link to={backPath(pathname)} className="tooltip tooltip-bottom" data-tip="Retour" aria-label="Retour">
                        <FontAwesomeIcon icon="fa-solid fa-chevron-left" size="lg" />
                        <span className="hidden sm:inline">Retour</span>
                    </Link>
                )}
            </div>
            <div className="navbar-end w-auto ml-auto shrink-0 flex items-center gap-2 sm:gap-4">
                <a href="https://topazdev.fr" className="tooltip tooltip-left" data-tip="Aller sur TopazDev" aria-label="topazdev.fr">
                    <img src="/images/topazdev.png" alt="logo TopazDev" className="h-5 min-[360px]:h-6 sm:h-8" />
                </a>
                <a href="https://spinelle.eu" className="tooltip tooltip-left" data-tip="Aller sur Spinelle Galaxie">
                    <img src="/images/spinelle_galaxie.png" alt="Spinelle Galaxie" className="hidden sm:inline h-5 min-[360px]:h-6 sm:h-8" />
                    <img src="/images/galaxie.png" alt="Spinelle Galaxie" className="inline sm:hidden h-5 min-[360px]:h-6 sm:h-8" />
                </a>
            </div>
        </nav>
    );
}
