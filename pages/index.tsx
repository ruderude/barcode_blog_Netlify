import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { client } from "../libs/client"
import SideBar from '../components/layout/SideBar'
import Card from '../components/elements/Card'
import Pagination from '../components/elements/Pagination'

const Home: NextPage<any> = ({ blogs, categories, tags, totalCount, perPage }) => {

  const title = `バーコード・ブログ: トップページ、ブログ一覧`
  const description = `バーコード・ブログ: トップページ、ブログ一覧`

  // ページネーション用
  const area = 'home'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>BarCode Blog</h1>
          <p>バーテンエンジニアの日記</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2 className='page_title'>
            ブログ一覧
          </h2>

          <div className={styles.card_container}>
            {blogs.map((blog: any) => (
              <div className={styles.card_box} key={blog.id}>
                <Card blog={blog} />
              </div>
            ))}
          </div>

          <br />

          <div className="center">
            <Pagination area={area} perPage={perPage} totalCount={totalCount} currentPage={1} />
          </div>
          
        </div>

        <SideBar categories={categories} tags={tags} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  // ページネーション用
  const PER_PAGE = process.env.PER_PAGE as unknown as number

  const data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: PER_PAGE, orders: '-publishedAt' } })
  const categoryData = await client.get({ endpoint: "categories", queries: { orders: 'publishedAt' } })
  const tagData = await client.get({ endpoint: "tags", queries: { orders: 'publishedAt' } })

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
      totalCount: data.totalCount,
      perPage: PER_PAGE,
    },
  }
}

export default Home
