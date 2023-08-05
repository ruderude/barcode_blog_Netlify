import React, { useEffect, useState } from "react"
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { client } from "../../libs/client"
import { format } from 'date-fns'
import SideBar from '../../components/layout/SideBar'
import CommentList from '../../components/comment/CommentList'
import styles from './Blog.module.scss'
import { BsFillBookmarkHeartFill } from 'react-icons/bs'
import { FaTags } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

const BlogId: NextPage<any> = ({ blog, categories, tags }) => {

  const title = `バーコード・ブログ: ${blog.title}`
  const description = `バーコード・ブログ: ${blog.title}`

  const [createdAt, setCreatedAt] = useState<string>()
  const [updatedAt, setUpdatedAt] = useState<string>()

  useEffect(() => {
    setCreatedAt(format(new Date(blog.createdAt), 'yyyy年MM月dd日'))
    setUpdatedAt(format(new Date(blog.updatedAt), 'yyyy年MM月dd日'))
  }, [blog.createdAt, blog.updatedAt])

  console.log(blog)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="container">
        <div className="main">
          <div className={styles.blog}>
            <div className={styles.date}>作成日時：{ createdAt }</div>
            <div className={styles.date}>更新日時：{ updatedAt }</div>
            <div className={styles.category}><BsFillBookmarkHeartFill color={'red'} />&nbsp;{blog.category && blog.category.name}</div>
            <div className={styles.tags_parent}>
              {blog.tags &&
                blog.tags.map((tag: any) => (
                  <div className={styles.tags_children} key={tag.id}>
                    <FaTags color={'red'} />&nbsp;{tag.name}</div>
              ))}
            </div>
            <br />
            <div className={styles.image_container}>
              <Image
                src={blog.image.url}
                alt={blog.title}
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <div>
              <h1 className={styles.title}>{blog.title}</h1>
            </div>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: `${blog.body}`,
              }}
            /> */}
            <ReactMarkdown>{blog.body}</ReactMarkdown>
          </div>

          <hr />

          
          <CommentList blogId={blog.id} />
          
        </div>

        <SideBar categories={categories} tags={tags} />
      </div>

      <br />

    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" })
  const paths = data.contents.map((content: any) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = context.params.id
  const blog = await client.get({ endpoint: "blog", contentId: id })
  const categoryData = await client.get({ endpoint: "categories" })
  const tagData = await client.get({ endpoint: "tags" })

  return {
    props: {
      blog: blog,
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  }
}

export default BlogId