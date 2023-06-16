import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link"
import { client } from "../../../libs/client"
import SideBar from '../../../components/layout/SideBar'
import Card from '../../../components/elements/Card'
import styles from './Category.module.scss'
import { BsFillBookmarkHeartFill } from 'react-icons/bs'
import { CategoryType } from '../../../types'
import Pagination from '../../../components/elements/Pagination'

const Category: NextPage<any> = ({ blogs, categories, tags, category, totalCount, perPage }) => {
  const title = `バーコード・ブログ: カテゴリー【${category.name}】`
  const description = `バーコード・ブログ: カテゴリー【${category.name}】`

  // ページネーション用
  const area = 'category'

  categories.sort((a: CategoryType, b: CategoryType) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Category</h1>
          <p>{category.name}</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2 className='page_title'>
            カテゴリー：{category.name}
          </h2>

          <div className={styles.categories_parent}>
            {categories.map((item: any) => (
              category.id === item.id ?
              <div key={item.id}>
                <Link href={`/category/${item.id}`}>
                  <span className={styles.categories_children} suppressHydrationWarning>
                    <BsFillBookmarkHeartFill color={'green'} />&nbsp;{item.name}
                  </span>
                </Link>
              </div>
              :
              <div key={item.id}>
                <Link href={`/category/${item.id}`}>
                  <span className={styles.categories_children} suppressHydrationWarning>
                    <BsFillBookmarkHeartFill color={'red'} />&nbsp;{item.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.card_container}>
            {blogs.length === 0 ?
              (<div className='margin_center my-10'>ブログコンテンツがありません</div>)
              :
              blogs.map((blog: any) => (
              <div className={styles.card_box} key={blog.id}>
                <Card blog={blog} />
              </div>
            ))}
          </div>

          <br />

          {(blogs.length !== 0) &&
            <div className="center">
              <Pagination area={area} perPage={perPage} totalCount={totalCount} currentPage={1}  genre={category.id}/>
            </div>
          }

        </div>
        
        <SideBar categories={categories} tags={tags} />
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" })

  const paths = data.contents.map((content: any) => `/category/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
  // ページネーション用
  const PER_PAGE = process.env.PER_PAGE as unknown as number
  const PAGE = 1

  const categoryPath = context.params.category
  const data = await client.get({ endpoint: "blog", queries: { filters: `category[equals]${categoryPath}`, offset: (PAGE - 1) * PER_PAGE, limit: PER_PAGE, orders: '-publishedAt' } })
  const categoryData = await client.get({ endpoint: "categories", queries: { orders: 'publishedAt' } })
  const tagData = await client.get({ endpoint: "tags", queries: { orders: 'publishedAt' } })
  const category = await client.get({ endpoint: "categories", contentId: categoryPath })

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
      category: category,
      totalCount: data.totalCount,
      perPage: PER_PAGE,
    },
  }
}

export default Category