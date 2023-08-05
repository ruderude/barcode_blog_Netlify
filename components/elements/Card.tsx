import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import styles from './Card.module.scss'
import { BsFillBookmarkHeartFill } from 'react-icons/bs'
import { FaTags } from 'react-icons/fa'

const Card = ({ blog }: { blog: any }) => {
  const [createdAt, setCreatedAt] = useState<string>()
  const [updatedAt, setUpdatedAt] = useState<string>()

  console.log('blog', blog)

  useEffect(() => {
    setCreatedAt(format(new Date(blog.createdAt), 'yyyy年MM月dd日'))
    setUpdatedAt(format(new Date(blog.updatedAt), 'yyyy年MM月dd日'))
  }, [blog.createdAt, blog.updatedAt])

  return (
    <>
      <Link href={`/blog/${blog.id}`}>
        <div className={styles.wrapper}>
          <article className={styles.card}>
            <div className={styles.card__header}>
              <figure style={{ position: 'relative', width: '100%', height: '150px' }} className={styles.card__thumbnail}>
                <Image
                  src={blog.image.url}
                  alt={blog.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                  }}
                />
              </figure>
              <p className={styles.card__title} style={{wordWrap: 'break-word'}}>{blog.title}</p>
            </div>
            <div className={styles.card__body}>
              <div className={styles.card__text2}>作成日時：{createdAt}</div>
              <div className={styles.card__text2}>更新日時：{updatedAt}</div>
            </div>
            <div className={styles.card__footer}>
              <div>
               <BsFillBookmarkHeartFill color={'red'} />&nbsp;{blog.category.name}
              </div>
              {/* <div>
                {blog.tags.map((tag: any) => (
                  <span style={{marginLeft: '2px'}} key={tag.id}><FaTags color={'red'} />{tag.name}</span>
                ))}
              </div> */}
            </div>
          </article>
        </div>
      </Link>
    </>
  )
}

export default Card
