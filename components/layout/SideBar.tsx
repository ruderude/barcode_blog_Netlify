import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from './SideBar.module.scss'
import { BsFillBookmarkHeartFill } from 'react-icons/bs'
import { FaTags } from 'react-icons/fa'
import { CategoryType, TagType } from '../../types'

const SideBar: NextPage<any> = ({ categories, tags }) => {

  // ソート
  categories.sort((a: CategoryType, b: CategoryType) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  tags.sort((a: TagType, b: TagType) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  

  return (
    <>
      <div className="sidebar">

        <div>
          <div>
            <h3 className={styles.title}>カテゴリー</h3>
          </div>
          <ul className={styles.ul}>
            {categories.reverse().map((category: any) => (
              <li className={styles.li} key={category.id}>
                <Link href={`/category/${category.id}`}>
                  <BsFillBookmarkHeartFill color={'red'} />&nbsp;{category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div>
            <h3 className={styles.title}>タグ</h3>
          </div>
          <ul className={styles.tag_ul}>
            {tags.reverse().map((tag: any) => (
              <li className={styles.tag_li} key={tag.id}>
                <Link href={`/tag/${tag.id}`}>
                  <FaTags color={'red'} />&nbsp;{tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.space}></div>

      </div>
    </>
  )
}

export default SideBar
