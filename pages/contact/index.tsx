import type { NextPage } from 'next'
import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { client } from "../../libs/client"
import SideBar from '../../components/layout/SideBar'
import styles from './Contact.module.scss'
import emailjs from '@emailjs/browser'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from "react-toastify"

interface Inputs {
  to_name: string
  to_email: string
  message: string
  check: string | null
}

const Contact: NextPage<any> = ({ categories, tags, publicKey, serviceId, templateId }) => {
  const title = `バーコード・ブログ: お問い合わせ`
  const description = `バーコード・ブログ: お問い合わせ`

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const clearForm = () => {
    const to_name = document.getElementById('to_name') as HTMLInputElement
    const to_email = document.getElementById('to_email') as HTMLInputElement
    const message = document.getElementById('message') as HTMLInputElement
    const check = document.getElementById('check') as HTMLInputElement
    to_name.value = ''
    to_email.value = ''
    message.value = ''
    check.value = ''
  }

  const sendForm: SubmitHandler<Inputs> = (data) => {
    const check = data.check
    if (check) {
      toast.error('メール送信に失敗しました！')
      return
    }

    const params = {
      to_name: data.to_name,
      to_email: data.to_email,
      message: data.message,
    }

    emailjs.send(
      serviceId,
      templateId,
      params,
      publicKey
    )
      .then((result) => {
        toast('お問い合わせメールを送信しました！')
        clearForm()
      }, (error) => {
        console.log(error.text)
        toast.error('メール送信に失敗しました！')
      })
  }
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.bg}>
          <h1>Contact</h1>
          <p>お問い合わせ</p>
        </div>
      </header>

      <div className="container">
        <div className="main">

          <h2 className='page_title'>
            お問い合わせ
          </h2>

          <div className={styles.contact}>
            <form onSubmit={handleSubmit(sendForm)}>
              <table className={styles.form_table}>
                <tbody>
                  <tr>
                    <td className={styles.form_item}>
                      <label htmlFor="to_name">氏名 <span className={styles.badge}>必須</span></label>
                    </td>
                    <td className={styles.form_body}>
                      <input
                        id="to_name"
                        type="text"
                        placeholder="山田 太郎"
                        {...register("to_name", {
                          required: {
                            value: true,
                            message: '入力が必須の項目です',
                          },
                          maxLength: {
                            value: 30,
                            message: '30文字以下で入力してください',
                          },
                        })}
                      />
                      {errors.to_name?.type === 'required' && (
                        <div className={styles.error}>{ errors.to_name?.message }</div>
                      )}
                      {errors.to_name?.type === 'maxLength' && (
                        <div className={styles.error}>{ errors.to_name?.message }</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className={styles.form_item}>
                      <label htmlFor="to_email">メールアドレス <span className={styles.badge}>必須</span></label>
                    </td>
                    <td className={styles.form_body}>
                      <input
                        id="to_email"
                        type="text"
                        placeholder="info@email.com"
                        {...register("to_email", {
                          required: {
                            value: true,
                            message: '入力が必須の項目です',
                          },
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "メールアドレスの形式が違います"
                          },
                          maxLength: {
                            value: 150,
                            message: '150文字以下で入力してください',
                          },
                        })}
                      />
                      {errors.to_email?.type === 'required' && (
                        <div className={styles.error}>{ errors.to_email?.message }</div>
                      )}
                      {errors.to_email?.type === 'pattern' && (
                        <div className={styles.error}>{ errors.to_email?.message }</div>
                      )}
                      {errors.to_email?.type === 'maxLength' && (
                        <div className={styles.error}>{ errors.to_email?.message }</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className={styles.form_item}>
                      <label>本文 <span className={styles.badge}>必須</span></label>
                    </td>
                    <td className={styles.form_body}>
                      <textarea
                        id="message"
                        placeholder="問い合わせ内容・・・"
                        {...register("message", {
                          required: {
                            value: true,
                            message: '入力が必須の項目です',
                          },
                          maxLength: {
                            value: 2000,
                            message: '2000文字以下で入力してください',
                          },
                        })}
                      />
                      {errors.message?.type === 'required' && (
                        <div className={styles.error}>{ errors.message?.message }</div>
                      )}
                      {errors.message?.type === 'maxLength' && (
                        <div className={styles.error}>{ errors.message?.message }</div>
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
                  問い合わせを送信する
                </button>
              </div>

            </form>

          </div>
          
        </div>

        <SideBar categories={categories} tags={tags} />
      </div>

    </>
  )
}

export const getStaticProps = async () => {
  const categoryData = await client.get({ endpoint: "categories" })
  const tagData = await client.get({ endpoint: "tags" })
  const publicKey = process.env.EMAILJS_PUBLIC_KEY
  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID

  return {
    props: {
      categories: categoryData.contents,
      tags: tagData.contents,
      publicKey,
      serviceId,
      templateId,
    },
  }
}

export default Contact
