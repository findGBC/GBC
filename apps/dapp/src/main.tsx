import './styles/globals.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import { ThemeContextProvider } from './styles/themes/themeContext'

import { arbitrum } from 'wagmi/chains'

const chains = [arbitrum]

import { WagmiConfig } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

const metadata = {
  name: 'Blueberry Dapp',
  description: 'Blueberry dapp',
  url: 'https://dapp.findgbc.com',
  icons: ['https://findgbc.com/assets/logo.fd4f0653.png'],
}

const projectId = 'ee05477a503741ca2cea692cbd359514'
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createWeb3Modal({ wagmiConfig, projectId, chains })

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
