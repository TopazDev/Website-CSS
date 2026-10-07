import tree from 'virtual:file-tree'

// "/v7/bastion/" -> ["v7", "bastion"]
export function splitPath(path = '') {
  return path.split('/').filter(Boolean)
}

// Renvoie le noeud correspondant au chemin, ou null s'il n'existe pas
export function findNode(segments) {
  let node = { name: '', type: 'dir', children: tree }
  for (const segment of segments) {
    if (node.type !== 'dir') return null
    node = node.children.find((child) => child.name === segment)
    if (!node) return null
  }
  return node
}

// Page "Retour" : dossier parent du dossier (/d/...) ou du fichier (/v/...) affiché
//   /d/v7/bastion -> /d/v7    /v/v7/main.css -> /d/v7    /d/v7 -> /
export function backPath(pathname) {
  const [route, ...segments] = splitPath(pathname)
  if (route !== 'd' && route !== 'v') return '/'
  const parent = segments.slice(0, -1)
  return parent.length ? `/d/${parent.join('/')}` : '/'
}

// "mon_dossier-css" -> "Mon dossier css" (comme l'ancien index.php,
// sans majuscule à la racine pour garder "v7")
export function folderLabel(name, isRoot) {
  const label = name.replace(/[-_]/g, ' ')
  return isRoot ? label : label.charAt(0).toUpperCase() + label.slice(1)
}

export function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`
}

export function extension(name) {
  const dot = name.lastIndexOf('.')
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase()
}
