import { faDiscord, faGithub, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './Button.jsx'

const socials = [
  { label: 'GitHub', icon: faGithub, url: 'https://github.com/Azerxim' },
  { label: 'Discord', icon: faDiscord, url: 'https://discord.gg/nUFwE9S' },
  { label: 'Twitch', icon: faTwitch, url: 'https://twitch.tv/bastionautes' },
  { label: 'Twitter', icon: faTwitter, url: 'https://twitter.com/Azerxim' },
  { label: 'YouTube', icon: faYoutube, url: 'https://www.youtube.com/channel/UC3BfRqB0yM1iCxmNv3ig_Nw' },
]

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-5 bg-td-smoothwhite px-4 py-12">
      <div className="flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-5">
            {socials.map(({ label, icon, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-xl text-td-ultradarkblue hover:text-td-blue"
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-0.5">
            <span>
              <strong className="text-td-ultradarkblue">TopazDev</strong> 2015 • {YEAR}
            </span>
            <span>Tous droits réservés</span>
          </div>
          <Button href="https://topazdev.fr/contact" variant="light" className="mt-2 bg-td-white">
            Contact
          </Button>
        </div>

        <a
          href="https://tailwindcss.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-td-grey hover:text-td-ultradarkblue"
        >
          Fait avec React &amp; Tailwind CSS
        </a>
      </div>
    </footer>
  )
}
