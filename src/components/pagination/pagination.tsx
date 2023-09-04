import { useState } from 'react'

import clsx from 'clsx'

import { UsePaginationProps, useCardsPagination } from '../../hooks/usePagination'

import s from './pagination.module.scss'

export const Pagination = (props: UsePaginationProps) => {
  const [people, setPeople] = useState([])

  const { nextPage, prevPage, page, gaps, setPage, totalPages } = useCardsPagination({
    contentPerPage: props.contentPerPage,
    count: props.count,
  })

  const classnames = {
    button: clsx(s.page, page === 1 && s.disabled),
  }

  return (
    <>
      <div className={s.pagination}>
        <p className={s.text}>
          {page}/{totalPages}
        </p>
        <button onClick={prevPage} className={classnames.button}>
          &larr;
        </button>
        <button onClick={() => setPage(1)} className={classnames.button}>
          1
        </button>
        {gaps.before ? '...' : null}
        {gaps.paginationGroup.map(el => (
          <button
            onClick={() => setPage(el)}
            key={el}
            className={`${s.page} ${page === el ? s.active : ''}`}
          >
            {el}
          </button>
        ))}
        {gaps.after ? '...' : null}
        <button
          onClick={() => setPage(totalPages)}
          className={`${s.page} ${page === totalPages && s.disabled}`}
        >
          {totalPages}
        </button>
        <button onClick={nextPage} className={`${s.page} ${page === totalPages && s.disabled}`}>
          &rarr;
        </button>
      </div>
    </>
  )
}
