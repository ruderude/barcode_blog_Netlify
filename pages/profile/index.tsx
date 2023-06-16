import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { client } from "../../libs/client"
import SideBar from '../../components/layout/SideBar'
import styles from './Profile.module.scss'
import { ImPacman } from 'react-icons/im'

const Profile: NextPage<any> = ({ categories, tags }) => {
  const title = `バーコード・ブログ: プロフィール`
  const description = `バーコード・ブログ: プロフィール`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Profile</h1>
          <p>プロフィール</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2 className='page_title'>
            プロフィール
          </h2>

          <div className={styles.profile}>
            <div className={styles.me}>
              <ImPacman />&nbsp;
              39歳からプログラミング学習を開始して40歳からプログラマになりました。
              1979年生まれの訓志といいます。
            </div>
          </div>
        </div>

        <SideBar categories={categories} tags={tags} />
      </div>
      
    </>
  )
}

export const getStaticProps = async () => {
  const categoryData = await client.get({ endpoint: "categories" })
  const tagData = await client.get({ endpoint: "tags" })

  return {
    props: {
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  }
}

export default Profile
