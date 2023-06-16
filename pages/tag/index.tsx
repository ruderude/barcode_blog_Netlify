import type { NextPage } from 'next'
import React, { useEffect } from "react"
import Head from 'next/head'
import { client } from "../../libs/client"
import { useRouter } from "next/router"

const Tags: NextPage<any> = ({ tags }) => {
  const title = `バーコード・ブログ: タグ一覧`
  const description = `バーコード・ブログ: タグ一覧`

  const router = useRouter()
  const url = `/tag/${tags[0].id}`

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
  const tagData = await client.get({ endpoint: "tags", queries: { orders: 'publishedAt' } })

  return {
    props: {
      tags: tagData.contents,
    },
  }
}

export default Tags
