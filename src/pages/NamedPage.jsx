import { useEffect } from 'react'
import { useParams } from 'react-router'
import ErrorPage from './ErrorPage.jsx'

// /erreur, /erreur-<id> -> page d'erreur
// /<page> (lettres minuscules) -> redirection vers topazdev.fr/<page>
// tout le reste -> 404
export default function NamedPage() {
  const { page = '' } = useParams()
  const error = page.match(/^erreur(?:-(\d+))?$/)
  const redirect = !error && /^[a-z]+$/.test(page)

  useEffect(() => {
    if (redirect) window.location.replace(`https://topazdev.fr/${page}`)
  }, [redirect, page])

  if (error) return <ErrorPage code={Number(error[1] ?? 0)} />
  if (redirect) return null
  return <ErrorPage code={404} />
}
