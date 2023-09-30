import { FC } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

type TabsType = Tabs.TabsProps & {
  tabsTitle: string[]
  show: boolean
  setShow: (show: boolean) => void
}
export const CardsTabs: FC<TabsType> = ({ tabsTitle, show, setShow, children, ...rest }) => {
  return (
    <Tabs.Root defaultValue={tabsTitle[1]} {...rest}>
      <Tabs.List className={s.tabList}>
        <Tabs.Trigger
          value={tabsTitle[0]}
          className={s.tabTitle}
          onClick={() => setShow(true)}
          data-state={show ? 'active' : 'inactive'}
        >
          {tabsTitle[0]}
        </Tabs.Trigger>
        <Tabs.Trigger
          value={tabsTitle[1]}
          className={s.tabTitle}
          onClick={() => setShow(false)}
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
