import { Provider } from 'react-redux'

import { Router } from '@/router'
import { store } from '@/services/store'

export function App() {
  return (
    <Provider store={store}>
      <div style={{ width: '80%', margin: '5.8rem auto' }}>
        <Router />
      </div>
    </Provider>
  )
}
