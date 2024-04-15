import '../styles/global.css'
import Nav from '@/components/nav/nav'
import Footer from '@/components/footer/footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
