import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// const store = configureStore({
//   reducer: rootReducer,
// });
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
    <BrowserRouter>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
