import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { WagmiConfig, createConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'


import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID ?? '',

    // Required
    appName: "MerkleDrop",

    // Optional
    appDescription: "Christmas comes early, go claim your zkBob tokens",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    chains:[goerli]
  }),
);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <Component {...pageProps} />
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  )
}

export default App
