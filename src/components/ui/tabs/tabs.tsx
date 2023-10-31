import { FC } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

type TabsType = Tabs.TabsProps & {
  tabsTitle: string[]
  show: boolean
  setShow: (show: boolean) => void
  setAuthorId?: (value: string | undefined) => void
  userId?: string
}

export const CardsTabs: FC<TabsType> = ({
  tabsTitle,
  show,
  setShow,
  setAuthorId,
  userId,
  children,
  ...rest
}) => {
  const showMyDecks = () => {
    setShow(true)
    setAuthorId?.(userId)
  }
  const showAllDecks = () => {
    setShow(false)
    setAuthorId?.(undefined)
  }

  return (
    <Tabs.Root defaultValue={tabsTitle[1]} {...rest}>
      <Tabs.List className={s.tabList}>
        <Tabs.Trigger
          value={tabsTitle[0]}
          className={s.tabTitle}
          onClick={showMyDecks}
          data-state={show ? 'active' : 'inactive'}
        >
          {tabsTitle[0]}
        </Tabs.Trigger>
        <Tabs.Trigger
          value={tabsTitle[1]}
          className={s.tabTitle}
          onClick={showAllDecks}
          data-state={show ? 'inactive' : 'active'}
        >
          {tabsTitle[1]}
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value={tabsTitle[0]}>{children}</Tabs.Content>
      <Tabs.Content value={tabsTitle[1]}>{children}</Tabs.Content>
    </Tabs.Root>
  )
}
