import { faCheck, faDownload, faLink } from '@fortawesome/free-solid-svg-icons'
import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import less from 'highlight.js/lib/languages/less'
import scss from 'highlight.js/lib/languages/scss'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import 'highlight.js/styles/atom-one-dark.css'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import Button from '../components/Button.jsx'
import { extension, findNode, formatSize, splitPath } from '../lib/tree.js'
import ErrorPage from './ErrorPage.jsx'

hljs.registerLanguage('css', css)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('less', less)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('yaml', yaml)

const LANGUAGES = {
  css: 'css',
  js: 'javascript',
  json: 'json',
  less: 'less',
  scss: 'scss',
  html: 'xml',
  svg: 'xml',
  xml: 'xml',
  yml: 'yaml',
  yaml: 'yaml',
}
const TEXT_EXTENSIONS = new Set([...Object.keys(LANGUAGES), 'txt', 'md', 'map'])
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ico'])

// Au-delà, la coloration syntaxique ralentit trop le navigateur
const HIGHLIGHT_MAX_SIZE = 200 * 1024

export default function Viewer() {
  const segments = splitPath(useParams()['*'])
  const node = findNode(segments)

  if (!node || node.type !== 'file') return <ErrorPage code={404} />

  // key : réinitialise l'état quand on change de fichier
  return <FileView key={segments.join('/')} segments={segments} file={node} />
}

function FileView({ segments, file }) {
  const path = segments.join('/')
  const url = `/${path}`
  const ext = extension(file.name)
  const isText = TEXT_EXTENSIONS.has(ext)
  const isImage = IMAGE_EXTENSIONS.has(ext)

  const [content, setContent] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!isText) return
    const controller = new AbortController()
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText)
        return res.text()
      })
      .then(setContent)
      .catch((err) => err.name !== 'AbortError' && setError(true))
    return () => controller.abort()
  }, [url, isText])

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4">
      <div className="my-3 flex min-h-19 flex-wrap items-center justify-between gap-3 rounded-2xl bg-td-smoothwhite px-5 py-3">
        <div className="flex min-w-0 flex-col">
          <span className="font-mono text-sm break-all">{path}</span>
          <span className="text-xs text-td-grey">{formatSize(file.size)}</span>
        </div>
        <div className="flex gap-2">
          <CopyLinkButton url={url} />
          <Button href={url} download={path.replaceAll('/', '-')} icon={faDownload} title="Télécharger" />
        </div>
      </div>

      {isImage && (
        <div className="flex justify-center rounded-2xl border border-td-lightwhite bg-td-smoothwhite p-6">
          <img src={url} alt={file.name} className="max-h-96 max-w-full" />
        </div>
      )}

      {isText &&
        (error ? (
          <p className="text-center text-td-red">Impossible de charger le fichier.</p>
        ) : content === null ? (
          <p className="text-center text-td-grey">Chargement…</p>
        ) : (
          <CodeBlock code={content} language={file.size <= HIGHLIGHT_MAX_SIZE ? LANGUAGES[ext] : undefined} />
        ))}

      {!isText && !isImage && (
        <p className="my-10 text-center text-td-grey">
          Aperçu non disponible pour ce type de fichier. Utilisez le bouton de téléchargement.
        </p>
      )}
    </div>
  )
}

function CodeBlock({ code, language }) {
  const html = useMemo(() => (language ? hljs.highlight(code, { language }).value : null), [code, language])
  const lineCount = useMemo(() => code.split('\n').length, [code])

  return (
    <div className="hljs flex overflow-auto rounded-2xl text-sm leading-6">
      <pre
        aria-hidden="true"
        className="sticky left-0 border-r border-white/10 bg-inherit py-4 pr-3 pl-4 text-right text-white/30 select-none"
      >
        {Array.from({ length: lineCount }, (_, i) => i + 1).join('\n')}
      </pre>
      <pre className="flex-1 py-4 pr-4 pl-4">
        {html !== null ? <code dangerouslySetInnerHTML={{ __html: html }} /> : <code>{code}</code>}
      </pre>
    </div>
  )
}

function CopyLinkButton({ url }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.origin + url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return <Button onClick={copy} icon={copied ? faCheck : faLink} title="Copier le lien du fichier" />
}
