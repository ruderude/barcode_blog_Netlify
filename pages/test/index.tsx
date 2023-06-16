import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { client } from "../../libs/client"
import SideBar from '../../components/layout/SideBar'

const Test: NextPage<any> = ({ blogs, categories, tags }) => {

  const title = `バーコード・ブログ: テスト`
  const description = `バーコード・ブログ: テスト`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="main">
      </div>

      <SideBar categories={categories} tags={tags} />
    </>
  )
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" })
  const categoryData = await client.get({ endpoint: "categories" })
  const tagData = await client.get({ endpoint: "tags" })

  return {
    props: {
      blogs: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  }
}

export default Test
