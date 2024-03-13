import './styles/globals.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import { ThemeContextProvider } from './styles/themes/themeContext'

const element = document.getElementById('root') as HTMLElement

const root = createRoot(element)
const queryClient = new QueryClient()

root.render(
  <ThemeContextProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </ThemeContextProvider>
)
