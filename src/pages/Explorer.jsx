import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Link, Navigate, useParams } from 'react-router'
import Button from '../components/Button.jsx'
import { EntryCard } from '../components/EntryCard.jsx'
import { findNode, splitPath } from '../lib/tree.js'
import ErrorPage from './ErrorPage.jsx'

export default function Explorer() {
  const segments = splitPath(useParams()['*'])
  const node = findNode(segments)

  // La racine est gérée par la page d'accueil (sections par version)
  if (segments.length === 0) return <Navigate to="/" replace />
  if (!node || node.type !== 'dir') return <ErrorPage code={404} />

  return (
    <div className="mx-auto max-w-6xl px-4">

      <Breadcrumb segments={segments} />

      {node.children.length === 0 ? (
        <p className="my-10 text-center text-td-grey">Ce dossier est vide.</p>
      ) : (
        <ul className="my-5 flex flex-wrap justify-center gap-2.5">
          {node.children.map((child) => (
            <li key={child.name}>
              <EntryCard entry={child} path={[...segments, child.name].join('/')} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Breadcrumb({ segments }) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center justify-center gap-1 text-sm text-td-grey">
      <Link to="/" className="hover:text-td-ultradarkblue">
        css
      </Link>
      {segments.map((segment, i) => (
        <span key={i} className="flex items-center gap-1">
          <span>/</span>
          {i === segments.length - 1 ? (
            <span className="font-semibold text-td-ultradarkblue">{segment}</span>
          ) : (
            <Link to={`/d/${segments.slice(0, i + 1).join('/')}`} className="hover:text-td-ultradarkblue">
              {segment}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
