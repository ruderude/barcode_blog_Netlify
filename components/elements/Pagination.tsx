import React, { useEffect, useState } from "react"
import Link from 'next/link'
import styles from './Pagination.module.scss'
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'

interface PaginationProps {
  area?: string
  perPage: number
  totalCount: number
  currentPage?: number
  genre?: string
}

const Pagination: React.FC<PaginationProps> = ({ area, perPage, totalCount, currentPage, genre = null }) => {

  let path = ''
  switch (area) {
    case 'category':
      path = `/category/${genre}`
      break
    case 'tag':
      path = `/tag/${genre}`
      break
    default:
      path = ''
      break
  }

  const startPage = 1
  const endPage = Math.ceil(totalCount / perPage)

  const range = (start: number, end: number) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <ul className={styles.Pagination}>
      <li className={styles.Pagination_item}>
        <Link className={styles.Pagination_item_link} href={`${path}/page/${startPage}`}><MdOutlineKeyboardDoubleArrowLeft color={'black'} /></Link>
      </li>
      {range(1, Math.ceil(totalCount / perPage)).map((number, index) => (
        currentPage == number ?
          (<li className={styles.Pagination_item} key={index}>
        <Link className={`${styles.Pagination_item_link} ${styles.isActive}`} href={`${path}/page/${number}`}><span>{number}</span></Link>
        </li>)
        :
          (<li className={styles.Pagination_item} key={index}>
            <Link className={styles.Pagination_item_link} href={`${path}/page/${number}`}><span>{number}</span></Link>
        </li>)
      ))}
      <li className={styles.Pagination_item}>
        <Link className={styles.Pagination_item_link} href={`${path}/page/${endPage}`}><MdOutlineKeyboardDoubleArrowRight color={'black'} /></Link>
      </li>
    </ul>
  );
}

export default Pagination
