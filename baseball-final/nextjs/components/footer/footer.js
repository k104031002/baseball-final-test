import React from 'react'
import '@/node_modules/bootstrap/dist/css/bootstrap.min.css'
import styles from './footer.module.css'
import { MdOutlinePhoneInTalk } from 'react-icons/md'
import { CiCalendar, CiMail } from 'react-icons/ci'

export default function Footer() {
  return (
    <>
      <footer
        className={`footer container-fluid d-flex justify-content-center ${styles.footer}`}
      >
        <nav className="container1 " style={{ width: 1440 }}>
          <div className="topbox d-flex align-items-start justify-content-between">
            <div className="logo-con d-flex align-items-center gap-1">
              <div className="logo-box">
                <img src="/images/logo.png" alt="" className="img" />
              </div>
              <h4>棒球好玩家</h4>
            </div>
            <div
              className="navbox d-sm-flex d-none justify-content-between"
              style={{ width: 966 }}
            >
              <ul className="list-unstyled">
                <li>訓練課程</li>
                <li>投球</li>
                <li>打擊</li>
                <li>守備</li>
              </ul>
              <ul className="list-unstyled">
                <li>資訊</li>
                <li>首頁</li>
                <li>關於我們</li>
                <li>聯絡我們</li>
              </ul>
              <ul className="list-unstyled">
                <li>會員</li>
                <li>我的帳號</li>
                <li>會員中心</li>
                <li>購物車</li>
              </ul>
              <ul className="list-unstyled">
                <li>追蹤我們</li>
                <li />
              </ul>
              <ul className="list-unstyled">
                <li>聯絡資訊</li>
                <li>
                  <MdOutlinePhoneInTalk /> 0200000000
                </li>
                <li>
                  <CiCalendar /> 08:30-17:30
                </li>
                <li>
                  <CiMail /> baseball@test.com
                </li>
              </ul>
            </div>
          </div>
          <h6>© 2024 Baseball. All Rights Reserved.</h6>
        </nav>
      </footer>
    </>
  )
}
