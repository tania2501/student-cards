import clsx from 'clsx'

import { PaginationType } from '../../../hooks/usePagination'
import usePagination from '../../../hooks/usePagination/usePagination'
import { Typography } from '../typography'

import s from './pagination.module.scss'

export const Pagination = (props: PaginationType) => {
  const { nextPage, prevPage, page, gaps, setPage, totalPages } = usePagination({
    contentPerPage: props.contentPerPage,
    count: props.count,
    page: props.page,
    setPage: props.setPage,
  })
  const classNames = {
    arrowLeft: clsx(s.arrow, page === 1 && s.disabled),
    arrowRight: clsx(s.arrow, page === totalPages && s.disabled),
    total: clsx(s.page, page === totalPages && s.active),
    first: clsx(s.page, page === 1 && s.active),
  }

  return (
    <>
      <div className={s.pagination}>
        <button onClick={prevPage} className={classNames.arrowLeft} disabled={page === 1}>
          &lsaquo;
        </button>
        <button onClick={() => setPage(1)} className={classNames.first}>
          <Typography as="span" variant="body2">
            1
          </Typography>
        </button>
        {gaps.before ? '...' : null}
        {gaps.paginationGroup.map(el => (
          <button
            onClick={() => setPage(el)}
            key={el}
            className={`${s.page} ${page === el && s.active}`}
          >
            <Typography as="span" variant="body2">
              {el}
            </Typography>
          </button>
        ))}
        {gaps.after ? '...' : null}

        {totalPages > 1 && (
          <button onClick={() => setPage(totalPages)} className={classNames.total}>
            <Typography as="span" variant="body2">
              {totalPages}
            </Typography>
          </button>
        )}

        <button onClick={nextPage} className={classNames.arrowRight} disabled={page === totalPages}>
          &rsaquo;
        </button>
      </div>
    </>
  )
}
