import { faHome } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button.jsx'

const MESSAGES = {
  403: 'Accès refusé.',
  404: "Cette page ou ce fichier n'existe pas.",
  500: 'Erreur interne du serveur.',
}

export default function ErrorPage({ code }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-td-ultradarkblue">{code || 'Erreur'}</h1>
      <p className="text-lg text-td-ultragrey">{MESSAGES[code] ?? 'Une erreur est survenue.'}</p>
      <Button to="/" icon={faHome}>
        Accueil
      </Button>
    </div>
  )
}
