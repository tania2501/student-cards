import { Provider } from 'react-redux'

import { Header } from './components/ui/header'

import { Router } from '@/router'
import { store } from '@/services/store'

export function App() {
  return (
    <Provider store={store}>
      <Header />
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Router />
      </div>
    </Provider>
  )
}
