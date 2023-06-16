import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'
import { PAGELINKS } from "../../config/pagelinks"

const Header = () => {
  const [path, setPath] = useState<string>('/')
  const [nav, setNav] = useState<boolean>(false)

  const router = useRouter()

  const toggleNav = () => {
    setNav(!nav)
  }

  useEffect(() => {
    setPath(router.pathname)
  }, [router.pathname])

  return (<>
    <header>
      <div className={ styles.wrapper_pc_nav }>
        <nav>
          <ul>
            {PAGELINKS.map((link) => (
              <li key={link.name} className={path === link.path ? styles.current : ""}>
                <Link href={link.path}>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.wrapper_sp_nav}>
        <div className={`${styles.openbtn1} ${nav ? styles.active : ""}`}
          onClick={toggleNav}
        ><span></span><span></span><span></span></div>
          <nav className={`${styles.g_nav} ${nav ? styles.panelactive : ""}`}>
            <div className={styles.g_nav_list}>
              <ul>
                {PAGELINKS.map((link) => (
                  <li onClick={toggleNav} key={link.name}>
                    <Link href={link.path}>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        <div className={`${styles.circle_bg} ${nav ? styles.circleactive : ""}`}></div>
      </div>
    </header>
  </>)
}

export default Header