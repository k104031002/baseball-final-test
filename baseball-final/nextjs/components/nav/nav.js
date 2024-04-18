import React from 'react'
import { GoPerson } from 'react-icons/go'
import { PiShoppingCart } from 'react-icons/pi'
// import styles from 'styles/nav.module.css'
import styles from './nav.module.css'

export default function Nav() {
  return (
    <header
      className={`container-fluid d-flex bg-dark justify-content-center align-items-center ${styles.header}`}
    >
      <nav
        className={`container d-flex justify-content-between ${styles.container}`}
      >
        <div className="logo-con d-flex align-items-center gap-1">
          <div className="logo-box">
            <img src="/images/logo.png" alt="" className="img" />
          </div>
          <h4>棒球好玩家</h4>
        </div>
        <div className="d-flex align-items-center">
          <ul className="list-unstyled d-sm-flex d-none gap-2">
            <li>首頁</li>
            <li>專欄</li>
            <li>課程活動</li>
            <li>商城</li>
            <li>商品租借</li>
            <li>場域地圖</li>
            <li>揪團</li>
            <button className="btn btn-dark"></button>
          </ul>
          <ul className="members list-unstyled d-flex gap-2 ul">
            <li>
              <GoPerson />
            </li>
            <li>
              <PiShoppingCart />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
