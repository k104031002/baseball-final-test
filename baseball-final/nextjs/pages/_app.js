import '../styles/global.css'
import Nav from '@/components/nav/nav'
import Footer from '@/components/footer/footer'
import 'react-datepicker/dist/react-datepicker.css'
import React from 'react'
import '@/scss/all.css'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import DateRangePicker from '@/pages/DateRangePicker' // 导入DateRangePicker组件
import '@/pages/react-datepicker.css'

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
export { DateRangePicker } // 导出DateRangePicker组件
