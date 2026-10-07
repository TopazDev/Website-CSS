import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router'

const variants = {
  dark: 'bg-td-ultradarkblue text-td-white hover:bg-td-dark',
  light: 'bg-td-smoothwhite text-td-dark hover:bg-td-lightwhite',
}

// Bouton TopazDev : lien interne (to), lien externe (href) ou bouton (onClick)
export default function Button({ to, href, icon, children, variant = 'dark', className = '', ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-td-blue ${variants[variant]} ${className}`
  const content = (
    <>
      {icon && <FontAwesomeIcon icon={icon} />}
      {children && <span>{children}</span>}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={`cursor-pointer ${classes}`} {...props}>
      {content}
    </button>
  )
}
