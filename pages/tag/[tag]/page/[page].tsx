import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link"
import { client } from "../../../../libs/client"
import SideBar from '../../../../components/layout/SideBar'
import Card from '../../../../components/elements/Card'
import styles from '../Tags.module.scss'
import { FaTags } from 'react-icons/fa'
import { TagType } from '../../../../types'
import Pagination from '../../../../components/elements/Pagination'

const TagId: NextPage<any> = ({ blogs, categories, tags, tag, totalCount, perPage, currentPage }) => {
  const title = `バーコード・ブログ: ${tag.name}}`
  const description = `バーコード・ブログ: ${tag.name}`

  // ページネーション用
  const area = 'tag'

  tags.sort((a: TagType, b: TagType) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Tag</h1>
          <p>{tag.name}</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2 className='page_title'>
            タグ：{tag.name}
          </h2>

          <div className={styles.tags_parent}>
            {tags.map((item: any) => (
              tag.id === item.id ? 
              <div key={item.id}>
                <Link href={`/tag/${item.id}`}>
                  <span className={styles.tags_children} suppressHydrationWarning>
                    <FaTags color={'green'} />&nbsp;{item.name}
                  </span>
                </Link>
              </div>
              :
              <div key={item.id}>
                <Link href={`/tag/${item.id}`}>
                  <span className={styles.tags_children} suppressHydrationWarning>
                    <FaTags color={'red'} />&nbsp;{item.name}
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
              <Pagination area={area} perPage={perPage} totalCount={totalCount} currentPage={currentPage}  genre={tag.id}/>
            </div>
          }
          
        </div>

        <SideBar categories={categories} tags={tags} />
      </div>

    </>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "tags" })

  // ページネーション用
  const PER_PAGE = process.env.PER_PAGE as unknown as number

  const repos = await client.get({ endpoint: "blog" })

  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);

  const pathsData = data.contents.map((content: any) => {
    return range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/tag/${content.id}/page/${repo}`)
  })

  const paths = pathsData.flat()

  return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
  // ページネーション用
  const PER_PAGE = process.env.PER_PAGE as unknown as number
  const PAGE = context.params.page as number

  const tagPath = context.params.tag
  const data = await client.get({ endpoint: "blog", queries: { filters: `tags[contains]${tagPath}`, offset: (PAGE - 1) * PER_PAGE, limit: PER_PAGE, orders: '-publishedAt' } })
  const categoryData = await client.get({ endpoint: "categories", queries: { orders: 'publishedAt' } })
  const tagData = await client.get({ endpoint: "tags", queries: { orders: 'publishedAt' } })
  const tag = tagData.contents.find((tag: any) => tag.id === tagPath)

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
      tag: tag,
      totalCount: data.totalCount,
      perPage: PER_PAGE,
      currentPage: PAGE
    },
  }
}

export default TagId