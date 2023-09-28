import { FC } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

type TabsType = Tabs.TabsProps & {
  tabsTitle: string[]
  myDecks: any
  usersDecks: any
}
export const CardsTabs: FC<TabsType> = ({ tabsTitle, myDecks, usersDecks, ...rest }) => {
  return (
    <Tabs.Root defaultValue="tab1" {...rest}>
      <Tabs.List className={s.tabList}>
        {tabsTitle.map((t, i) => (
          <Tabs.Trigger value={t} key={i} className={s.tabTitle}>
            {t}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value={'tab1'}>{myDecks}</Tabs.Content>
      <Tabs.Content value={'tab2'}>{usersDecks}</Tabs.Content>
    </Tabs.Root>
  )
}
