import clsx from 'clsx'

import { UsePaginationProps, useCardsPagination } from '../../../hooks/usePagination'
import { Typography } from '../typography'

import s from './pagination.module.scss'
type PaginationType = UsePaginationProps & {
  currentPage: number
  setCurrentPage: (page: number) => void
}
export const Pagination = (props: PaginationType) => {
  const { setCurrentPage, gaps, currentPage, totalPages } = useCardsPagination({
    contentPerPage: props.contentPerPage,
    count: props.count,
    currentPage: props.currentPage,
    setCurrentPage: props.setCurrentPage,
  })

  const classNames = {
    arrowLeft: clsx(s.arrow, currentPage === 1 && s.disabled),
    arrowRight: clsx(s.arrow, currentPage === totalPages && s.disabled),
    total: clsx(s.page, currentPage === totalPages && s.active),
    first: clsx(s.page, currentPage === 1 && s.active),
  }
  const a = props.count / props.contentPerPage > 1
  const b = props.count / props.contentPerPage > 2

  return (
    <>
      <div className={s.pagination}>
        <button
          onClick={() => props.setCurrentPage(props.currentPage - 1)}
          className={classNames.arrowLeft}
          disabled={props.currentPage - 1 < 1}
        >
          &lsaquo;
        </button>
        <button onClick={() => setCurrentPage(1)} className={classNames.first}>
          <Typography as="span" variant="body2">
            1
          </Typography>
        </button>
        {gaps.before ? '...' : null}
        {b &&
          gaps.paginationGroup.map(el => (
            <button
              onClick={() => setCurrentPage(el)}
              key={el}
              className={`${s.page} ${currentPage === el && s.active}`}
            >
              <Typography as="span" variant="body2">
                {el}
              </Typography>
            </button>
          ))}
        {gaps.after ? '...' : null}
        {a && (
          <button onClick={() => setCurrentPage(totalPages)} className={classNames.total}>
            <Typography as="span" variant="body2">
              {totalPages}
            </Typography>
          </button>
        )}
        <button
          onClick={() => props.setCurrentPage(props.currentPage + 1)}
          className={classNames.arrowRight}
          disabled={props.currentPage + 1 > props.count / props.contentPerPage}
        >
          &rsaquo;
        </button>
      </div>
    </>
  )
}
