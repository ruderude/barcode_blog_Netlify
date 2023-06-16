import type { NextPage } from 'next'
import React, { useEffect } from "react"
import Head from 'next/head'
import { client } from "../../libs/client"
import { useRouter } from "next/router"

const Category: NextPage<any> = ({ categories }) => {
  const title = `バーコード・ブログ: カテゴリー一覧`
  const description = `バーコード・ブログ: カテゴリー一覧`

  const router = useRouter()
  const url = `/category/${categories[0].id}`

  useEffect(() => {
    router.push(url)
  }, [router, url])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </>
  )
}

export const getStaticProps = async () => {
  const categoryData = await client.get({ endpoint: "categories", queries: { orders: 'publishedAt' } })

  return {
    props: {
      categories: categoryData.contents,
    },
  }
}

export default Category
