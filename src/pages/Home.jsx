import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { faSeedling, faWind } from '@fortawesome/free-solid-svg-icons'
import tree from 'virtual:file-tree'
import { EntryCard, ExternalCard } from '../components/EntryCard.jsx'

// La version 8 n'a plus de CSS maison : elle s'appuie sur Tailwind CSS, daisyUI et Font Awesome
const V8_LINKS = [
  { href: 'https://tailwindcss.com', icon: faWind, label: 'Tailwind CSS', caption: 'tailwindcss.com' },
  { href: 'https://daisyui.com', icon: faSeedling, label: 'daisyUI', caption: 'daisyui.com' },
  { href: 'https://fontawesome.com', icon: faFontAwesome, label: 'Font Awesome', caption: 'fontawesome.com' },
]

const SECTIONS = [
  {
    major: 8,
    description: 'Basée sur Tailwind CSS, daisyUI et Font Awesome, avec le thème TopazDev.',
    links: V8_LINKS,
    current: true,
  },
  // expand : affiche directement le contenu de ce dossier plutôt que sa carte
  { major: 7, description: 'CSS TopazDev basé sur Bulma.', expand: 'v7' },
  { major: 6, description: 'Anciennes versions du CSS TopazDev.' },
]

// "6.5s" -> 6, "v7" -> 7
function majorOf(name) {
  const match = name.match(/^v?(\d+)/i)
  return match ? Number(match[1]) : null
}

export default function Home() {
  const folders = tree.filter((entry) => entry.type === 'dir')
  const known = new Set(SECTIONS.map((section) => section.major))
  const others = folders.filter((folder) => !known.has(majorOf(folder.name)))

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      {SECTIONS.map((section) => (
        <Section
          key={section.major}
          title={`Version ${section.major}`}
          description={section.description}
          current={section.current}
        >
          {section.links?.map((link) => (
            <li key={link.href}>
              <ExternalCard {...link} />
            </li>
          ))}
          {folders
            .filter((folder) => majorOf(folder.name) === section.major)
            .flatMap((folder) =>
              folder.name === section.expand
                ? folder.children.map((child) => (
                    <li key={`${folder.name}/${child.name}`}>
                      <EntryCard entry={child} path={`${folder.name}/${child.name}`} />
                    </li>
                  ))
                : [
                    <li key={folder.name}>
                      <EntryCard entry={folder} path={folder.name} isRoot />
                    </li>,
                  ],
            )}
        </Section>
      ))}

      {others.length > 0 && (
        <Section title="Autres">
          {others.map((folder) => (
            <li key={folder.name}>
              <EntryCard entry={folder} path={folder.name} isRoot />
            </li>
          ))}
        </Section>
      )}
    </div>
  )
}

function Section({ title, description, current, children }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-td-ultradarkblue">
          {title}
          {current && <span className="badge badge-primary">Actuelle</span>}
        </h2>
        {description && <p className="text-td-grey">{description}</p>}
      </div>
      <ul className="flex flex-wrap justify-center gap-2.5">{children}</ul>
    </section>
  )
}
