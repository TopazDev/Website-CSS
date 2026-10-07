import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router'
import { folderLabel, formatSize } from '../lib/tree.js'

const cardClasses =
  'flex h-44 w-36 flex-col items-center justify-center gap-3 rounded-2xl border border-td-lightwhite bg-td-white p-3 text-td-ultradarkblue shadow-sm transition hover:-translate-y-0.5 hover:border-td-lightgrey hover:shadow-md focus-visible:outline-2 focus-visible:outline-td-blue'

// Carte d'un dossier ou d'un fichier de l'explorateur
export function EntryCard({ entry, path, isRoot }) {
  const isDir = entry.type === 'dir'

  return (
    <Link to={isDir ? `/d/${path}` : `/v/${path}`} title={entry.name} className={cardClasses}>
      <FontAwesomeIcon icon={isDir ? faFolder : faFile} className="text-5xl" />
      <span className="line-clamp-3 text-center text-sm font-medium break-all">
        {isDir ? folderLabel(entry.name, isRoot) : entry.name}
      </span>
      <span className="text-xs text-td-grey">
        {isDir ? `${entry.children.length} élément${entry.children.length > 1 ? 's' : ''}` : formatSize(entry.size)}
      </span>
    </Link>
  )
}

// Carte d'un lien externe (documentation...)
export function ExternalCard({ href, icon, label, caption }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" title={label} className={cardClasses}>
      <FontAwesomeIcon icon={icon} className="text-5xl" />
      <span className="text-center text-sm font-medium">{label}</span>
      <span className="text-xs text-td-grey">{caption}</span>
    </a>
  )
}
