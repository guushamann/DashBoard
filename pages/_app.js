import '../styles/globals.css'
import { Roboto } from "next/font/google";
import Layout from '../components/layout'
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
      html {
        font-family: ${roboto.style.fontFamily};
      }
    `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>

  )
}