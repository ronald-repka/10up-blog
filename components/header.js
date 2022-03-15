import Link from 'next/link'
import { useCookies } from 'react-cookie'
import styles from './header.module.css'

export default function Header() {
  const [cookies, removeCookie] = useCookies(['jwt-username']);
  const username = cookies['jwt-username'] !== 'undefined' ? cookies['jwt-username'] : undefined
  const logOut = e => {
    removeCookie('jwt-username')
    e.preventDefault()
  }

  return (
    <>
      <header className={styles['site-header']} role="banner" itemScope="itemscope" itemType="http://schema.org/WPHeader">
        <h1 className={styles['site-title']} itemScope itemType="http://schema.org/Organization">
            10up Blog
        </h1>
        <nav className={styles['site-navigation']} role="navigation" itemScope="itemscope" itemType="http://schema.org/SiteNavigationElement">
          <a href="#menu-main-nav" id="js-menu-toggle" className={styles['site-menu-toggle']}>
            <span className={styles['screen-reader-text']}>Primary Menu</span>
            <span aria-hidden="true">☰</span>
          </a>
          <ul id="menu-main-nav" className={styles['primary-menu']}>
            <li className={`${styles['menu-item']} menu-item-type-custom menu-item-object-custom menu-item-1912`}>
              <Link href="/">
                <a>
                  Home
                </a>
              </Link>
             </li>
            <li className={`${styles['menu-item']} menu-item-type-custom menu-item-object-custom menu-item-1915`}>
              <Link href="/about-us">
                <a>
                  About
                </a>
              </Link>
            </li>
            {username
              ?
                <li className={`${styles['logged-in']} ${styles['menu-item']} menu-item-type-custom menu-item-object-custom menu-item-1915`}>
                  <a href="#" onClick={logOut}>
                    Logout
                  </a>
                </li>
               :
                <li className={`${styles['logged-out']} ${styles['menu-item']} menu-item-type-custom menu-item-object-custom menu-item-1915`}>
                  <Link href="/login">
                    <a>
                      Login
                    </a>
                  </Link>
                </li>
            }
          </ul>
        </nav>
      </header>
      {username &&
        <section className={`${styles['welcome']} ${styles['logged-in']}`}>
            Welcome {username}!
        </section>
      }
    </>
  )
}