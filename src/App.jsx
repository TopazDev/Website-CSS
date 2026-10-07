import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Footer from './components/Layout/Footer.jsx'
import Navbar from './components/Layout/Navbar.jsx'
import Explorer from './pages/Explorer.jsx'
import Home from './pages/Home.jsx'
import NamedPage from './pages/NamedPage.jsx'

// Chargé à la demande : embarque highlight.js
const Viewer = lazy(() => import('./pages/Viewer.jsx'))

// Mêmes URLs que l'ancien .htaccess :
//   /            -> versions (8, 7, 6)
//   /d/<dossier> -> contenu d'un dossier
//   /v/<fichier> -> visionneur de fichier
//   /erreur-<id> -> page d'erreur, /<page> -> redirection vers topazdev.fr
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<p className="my-10 text-center text-td-grey">Chargement…</p>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="d/*" element={<Explorer />} />
            <Route path="v/*" element={<Viewer />} />
            <Route path=":page" element={<NamedPage />} />
            <Route path="*" element={<NamedPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
