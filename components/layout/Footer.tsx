import React, { useEffect, useState } from "react"
import Link from 'next/link'
import styles from './Footer.module.scss'
import { PAGELINKS } from "../../config/pagelinks"

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <ul className={styles.menu}>
          {PAGELINKS.map((link) => (
            <li key={link.name}>
              <Link href={link.path}>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.copyright}>
          &copy; BarCode Blog
        </p>
      </div>
    </footer>
  )
}

export default Footer