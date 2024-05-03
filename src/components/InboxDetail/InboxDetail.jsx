import React, { useContext } from 'react'
import style from './inboxDetail.module.css'
import { ShowContext } from '../../pages/Inbox/ShowComponent'

export default function InboxDetail() {
  const active = useContext(ShowContext).active
    const changeActive = useContext(ShowContext).changeActive
    return (
    <div className={active?style.detail_box: `${style.detail_box} ${style.detail_hide}`}>
          <div className={style.detail_box_top}>
            <h2>Detail</h2>
            <div>
              <i onClick={changeActive} className="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div className={style.detail_content}>
            <div className={style.detail_img}>
              <img src="/images/ex.jpg" alt="" />
            </div>
            <div className={style.detail_content_book}>
              <h2>Anna invited you book their home</h2>
              <p>The invitation allows you to instantly book for the next 18 hours.</p>
              <a href="/">
                <span>
                  Book now
                </span>
              </a>
            </div>

            <div className={style.trip_detail_containr}>
              <h3>Trip Details</h3>
              <a href='/' className={style.trip_detail_box}>
                <div className={style.trip_content}>
                  <p>Double Bungalow 1 - Garden View+Free bicycles</p>
                  <span>Room in bed and breakfast · Gia Vien District, Ninh Binh, VN
                  </span>
                </div>
                <div className={style.trip_icon}>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </a>
            </div>

            <div className={style.host_box}>
              <div className={style.host_info}>
                <p>Hosted by Anna</p>
                <span>292 reviews</span>
              </div>
              <div className={style.host_image}>
                <img src="https://mui.com/static/images/avatar/2.jpg" alt="" />
              </div>
            </div>

            <div className={style.host_check}>
              <span>Check-in</span>
              <span>Feb 11, 2024</span>
            </div>
            <div className={style.host_check}>
              <span>Check-out</span>
              <span>Feb 16, 2024</span>
            </div>
            <div className={style.host_check}>
              <span>Guests</span>
              <span>1 adult</span>
            </div>
            <div className={style.pay_container}>
              <div className={style.pay_detail}>
                <h3>Payment Details</h3>
              </div>
              <div className={style.pay_content}>
                <span>$23.35 x 5 nights</span>
                <span>$116.75</span>
              </div>
              <div className={style.pay_content}>
                <span>Airbnb service fee</span>
                <span>$16.48</span>
              </div>
            </div>
            <div className={style.tottal}>
              <span>Total</span>
              <span>$133.23</span>
            </div>
            <div className={style.warning_detail}>
              <p>Always communicate through Airbnb</p>
              <span>To protect your payment, never transfer money or communicate outside of the Airbnb website or app. <a href="/">Learn more</a></span>
            </div>
            <div className={style.report}>
              <a href="/">Report Host</a>
            </div>
          </div>

        </div>
  )
}
