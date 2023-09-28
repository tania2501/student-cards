import { Provider } from 'react-redux'

import { CardsTabs } from './components/ui/tabs'

import { Router } from '@/router'
import { store } from '@/services/store'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      <CardsTabs tabsTitle={['tab1', 'tab2', 'tab3']} myDecks={'tab1'} usersDecks={'user'} />
    </Provider>
  )
}
