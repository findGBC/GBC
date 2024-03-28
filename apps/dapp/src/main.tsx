import './styles/globals.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { ConnectKitProvider } from 'connectkit'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WagmiConfig } from 'wagmi'
import { arbitrum } from 'wagmi/chains'

import App from './app'
import { ThemeContextProvider } from './styles/themes/themeContext'

const chains = [arbitrum]

const metadata = {
  description: 'Blueberry dapp',
  icons: ['https://findgbc.com/assets/logo.fd4f0653.png'],
  name: 'Blueberry Dapp',
  url: 'https://app.findgbc.com',
}

const projectId = 'ee05477a503741ca2cea692cbd359514'
const wagmiConfig = defaultWagmiConfig({ chains, metadata, projectId })
createWeb3Modal({ chains, projectId, wagmiConfig })

const element = document.getElementById('root') as HTMLElement

const root = createRoot(element)
const queryClient = new QueryClient()

root.render(
  <ThemeContextProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <ConnectKitProvider>
            <App />
          </ConnectKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </BrowserRouter>
  </ThemeContextProvider>,
)
