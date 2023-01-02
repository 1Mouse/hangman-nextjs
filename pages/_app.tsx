import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "papercss/dist/paper.min.css"

import { Provider as JotaiProvider } from 'jotai'
import { AuthProvider } from '../context/AuthProvider';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <JotaiProvider>
        <Component {...pageProps} />
      </JotaiProvider>
    </AuthProvider>
  )
}
