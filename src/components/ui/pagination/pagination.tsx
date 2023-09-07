import { useState } from 'react'

import clsx from 'clsx'

import { UsePaginationProps, useCardsPagination } from '../../../hooks/usePagination'
import { MainSelect } from '../select'
import { Typography } from '../typography'

import s from './pagination.module.scss'

export const Pagination = (props: UsePaginationProps) => {
  const [pageCount, setPageCount] = useState(JSON.stringify(props.contentPerPage))

  const { nextPage, prevPage, page, gaps, setPage, totalPages } = useCardsPagination({
    contentPerPage: JSON.parse(pageCount),
    count: props.count,
  })

  const classNames = {
    arrowLeft: clsx(s.arrow, page === 1 && s.disabled),
    arrowRight: clsx(s.arrow, page === totalPages && s.disabled),
    total: clsx(s.page, page === totalPages && s.active),
    first: clsx(s.page, page === 1 && s.active),
  }
  const a = props.count / JSON.parse(pageCount) > 1
  const b = props.count / JSON.parse(pageCount) > 2

  return (
    <>
      <div className={s.pagination}>
        <button onClick={prevPage} className={classNames.arrowLeft}>
          &lsaquo;
        </button>
        <button onClick={() => setPage(1)} className={classNames.first}>
          <Typography variant="body2">1</Typography>
        </button>
        {gaps.before ? '...' : null}
        {b &&
          gaps.paginationGroup.map(el => (
            <button
              onClick={() => setPage(el)}
              key={el}
              className={`${s.page} ${page === el && s.active}`}
            >
              <Typography variant="body2">{el}</Typography>
            </button>
          ))}
        {gaps.after ? '...' : null}
        {a && (
          <button onClick={() => setPage(totalPages)} className={classNames.total}>
            <Typography variant="body2">{totalPages}</Typography>
          </button>
        )}
        <button onClick={nextPage} className={classNames.arrowRight}>
          &rsaquo;
        </button>
        <div className={s.select}>
          <Typography variant="body2">Показать </Typography>
          <MainSelect
            value={['5', '6', '10', '20', '30', '50', '100']}
            defaultValue={pageCount}
            onChange={setPageCount}
          />
          <Typography>на странице</Typography>
        </div>
      </div>
    </>
  )
}
