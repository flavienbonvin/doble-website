import "../styles/globals.css"
import type { AppProps } from "next/app"
import Nav from "../components/Nav"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-zinc-50">
      <Nav />
      <div className="container mx-auto px-4 md:px-0">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
