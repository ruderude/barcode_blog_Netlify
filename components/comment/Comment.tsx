import React, { useEffect, useState } from "react"
import { format } from 'date-fns'
import styles from './Comment.module.scss'
import { CommentData } from '../../types'

interface CommentRapper {
  commentData: CommentData
}

const Comment: React.FC<CommentRapper> = ({ commentData }) => {

  const commentLines = commentData.comment.split("\n");

  return (
    <div className={styles.comment}>
      <div className={styles.parent}>
        <div className={styles.name}>
          名前：{commentData.name}
        </div>
        <div className={styles.date}>
          {commentData.createdAt && format(new Date(commentData.createdAt), 'yyyy年MM月dd日 HH:mm')}
        </div>
      </div>
      
      <div>
        {commentLines.map((line: any, index: number) => (
          <React.Fragment key={index}>
            {line}
            {index < commentLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default Comment
