import fs from 'node:fs'
import path from 'node:path'

// Arborescence du dossier public/, exposée via `import tree from 'virtual:file-tree'`
// (remplace le scandir() de l'ancien index.php)
const VIRTUAL_ID = 'virtual:file-tree'
const RESOLVED_ID = '\0' + VIRTUAL_ID

const collator = new Intl.Collator('fr', { numeric: true, sensitivity: 'base' })

// Dossiers de public/ servis mais absents de l'explorateur (ressources du site)
const IGNORED_ROOT_DIRS = new Set(['images'])

function scan(dir, isRoot) {
  const children = []
  for (const name of fs.readdirSync(dir)) {
    // Fichiers cachés (.htaccess, ...) ignorés
    if (name.startsWith('.')) continue
    if (isRoot && IGNORED_ROOT_DIRS.has(name)) continue
    const stat = fs.statSync(path.join(dir, name))
    if (stat.isDirectory()) {
      children.push({ name, type: 'dir', children: scan(path.join(dir, name), false) })
    } else if (!isRoot) {
      // A la racine, seuls les dossiers (versions) sont listés
      children.push({ name, type: 'file', size: stat.size })
    }
  }
  return children.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
    return collator.compare(a.name, b.name)
  })
}

export default function fileTree() {
  let publicDir

  return {
    name: 'file-tree',
    configResolved(config) {
      publicDir = config.publicDir
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id === RESOLVED_ID) {
        return `export default ${JSON.stringify(scan(publicDir, true))}`
      }
    },
    configureServer(server) {
      // Regénère l'arborescence quand public/ change en dev
      const refresh = (file) => {
        if (!file.startsWith(publicDir)) return
        const graph = server.environments?.client?.moduleGraph ?? server.moduleGraph
        const mod = graph.getModuleById(RESOLVED_ID)
        if (!mod) return
        graph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.add(publicDir)
      for (const event of ['add', 'unlink', 'addDir', 'unlinkDir']) {
        server.watcher.on(event, refresh)
      }
    },
  }
}
