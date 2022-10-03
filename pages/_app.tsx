import '../styles/global.css'
import { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
