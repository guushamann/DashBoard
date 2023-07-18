
import dynamic from "next/dynamic";
import Footer from './footer'
const Navbar = dynamic(() => import("./navbar"), { ssr: false });
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}