import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { format } from 'date-fns'
import Comment from './Comment'
import styles from './CommentList.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from "react-toastify"
import { CommentData } from '../../types'

interface Inputs {
  name: string
  comment: string
  check: string | null
}

interface BlogIdRapper {
  blogId: Blog['id']
}

interface Blog {
  id: string
}

const CommentList: React.FC<BlogIdRapper> = ({ blogId }) => {

  const RequestUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment`
  const [comments, setComments] = useState<CommentData[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const clearForm = () => {
    const name = document.getElementById('name') as HTMLInputElement
    const comment = document.getElementById('comment') as HTMLInputElement
    const check = document.getElementById('check') as HTMLInputElement
    name.value = ''
    comment.value = ''
    check.value = ''
  }

  const sendForm: SubmitHandler<Inputs> = (data) => {
    const check = data.check
    if (check) {
      toast.error('コメントの投稿に失敗しました！')
      return
    }

    const params = {
      name: data.name,
      comment: data.comment,
      blogId: blogId,
      createdAt: new Date(),
    }

    axios
      .post(RequestUrl, params)
      .then((response) => {
        toast('コメントを投稿しました！')
        clearForm()
        getComments()
      })
      .catch((error) => {
        console.log('error', error)
        toast.error('コメントの投稿に失敗しました！')
      })
  }

  const getComments = useCallback(async () => {
    axios
      .get(`${RequestUrl}/${blogId}`)
      .then((response) => {
        setComments(response.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [RequestUrl, blogId])

  useEffect(() => {
    getComments()
  }, [getComments])

  return (
    <div className={styles.comment_list}>
      <h3>コメント一覧</h3>

      {
        comments.map((comment) => <Comment commentData={comment} key={comment.id} />)
      }

      <div className={styles.form}>
        <form onSubmit={handleSubmit(sendForm)}>
          <table className={styles.form_table}>
            <tbody>
              <tr>
                <td className={styles.form_item}>
                  <label htmlFor="name">氏名 <span className={styles.badge}>必須</span></label>
                </td>
                <td className={styles.form_body}>
                  <input
                    id="name"
                    type="text"
                    placeholder="山田 太郎"
                    {...register("name", {
                      required: {
                        value: true,
                        message: '入力が必須の項目です',
                      },
                      maxLength: {
                        value: 20,
                        message: '20文字以下で入力してください',
                      },
                    })}
                  />
                  {errors.name?.type === 'required' && (
                    <div className={styles.error}>{ errors.name?.message }</div>
                  )}
                  {errors.name?.type === 'maxLength' && (
                    <div className={styles.error}>{ errors.name?.message }</div>
                  )}
                </td>
              </tr>

              <tr>
                <td className={styles.form_item}>
                  <label>コメント本文 <span className={styles.badge}>必須</span></label>
                </td>
                <td className={styles.form_body}>
                  <textarea
                    id="comment"
                    placeholder="コメント内容・・・"
                    {...register("comment", {
                      required: {
                        value: true,
                        message: '入力が必須の項目です',
                      },
                      maxLength: {
                        value: 1000,
                        message: '1000文字以下で入力してください',
                      },
                    })}
                  />
                  {errors.comment?.type === 'required' && (
                    <div className={styles.error}>{ errors.comment?.message }</div>
                  )}
                  {errors.comment?.type === 'maxLength' && (
                    <div className={styles.error}>{ errors.comment?.message }</div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className={styles.bottun_area}>
            <input
              id="check"
              type="text"
              className={styles.hidden}
              {...register("check", {
                maxLength: {
                  value: 100,
                  message: '100文字以下で入力してください',
                },
              })}/>
            <button type="submit" className={styles.submit_button} id="submit">
              コメントを投稿する
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default CommentList
