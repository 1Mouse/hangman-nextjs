import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "papercss/dist/paper.min.css"

import { Provider } from 'jotai'


export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider>
        <Component {...pageProps} />
      </Provider>
  )
}
