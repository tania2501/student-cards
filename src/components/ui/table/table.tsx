import { ComponentProps, FC } from 'react'

import clsx from 'clsx'

import { SvgArrowDown, SvgArrowTop } from '../../../assets/icons/arrow'

import s from './table.module.scss'

export const Root: FC<ComponentProps<'table'>> = ({ className, ...rest }) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} {...rest} />
}
export const Head: FC<ComponentProps<'thead'>> = ({ className, ...rest }) => {
  const classNames = {
    thead: clsx(className, s.thead),
  }

  return <thead className={classNames.thead} {...rest} />
}
export const Body: FC<ComponentProps<'tbody'>> = props => {
  return <tbody {...props} />
}
export const Row: FC<ComponentProps<'tr'>> = ({ className, ...rest }) => {
  return <tr className={className} {...rest} />
}

export type HeadCellProps = ComponentProps<'th'> & {
  sortable?: boolean
}

export const HeaderCell: FC<HeadCellProps> = ({ className, children, sortable, ...rest }) => {
  const classNames = {
    headerCell: clsx(className, s.headerCell),
  }

  return (
    <th className={classNames.headerCell} {...rest}>
      <span>{children}</span>
    </th>
  )
}
export const Cell: FC<ComponentProps<'td'>> = ({ className, ...rest }) => {
  const classNames = {
    cell: clsx(className, s.tableCell),
  }

  return <td className={classNames.cell} {...rest} />
}

export type Column = {
  title: string
  key: string
  sortable?: boolean
}

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export const Header: FC<
  Omit<
    ComponentProps<'thead'> & {
      columns: Column[]
      sort?: Sort
      onSort?: (sort: Sort) => void
    },
    'children'
  >
> = ({ columns, sort, onSort, ...restProps }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'asc' })

    if (sort.direction === 'desc') return onSort(null)

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }
  const abc = sort?.direction === 'asc' ? <SvgArrowDown /> : <SvgArrowTop />

  return (
    <Head {...restProps}>
      <Row>
        {columns.map(({ title, key, sortable }) => (
          <HeaderCell key={key} onClick={handleSort(key, sortable)} sortable={sortable}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {title} {sort?.key === key ? abc : ''}
            </div>
          </HeaderCell>
        ))}
      </Row>
    </Head>
  )
}

export const Table = {
  Root,
  Head,
  HeaderCell,
  Row,
  Body,
  Cell,
  Header,
}
