import React from "react";
import style from "./header.module.css";
export default function HeaderInbox() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <header>
      <a href="/" className={style.header_logo}>
        <img src="/images/logo.png" alt=""></img>
      </a>
      <div className={style.header_profile}>
        <a href="/">Airbnb your home</a>
        <i className={`${style.global_icon} fa-solid fa-globe`}></i>
        <button className={style.profile_btn}>
          <i className={`${style.global_menu} fa-solid fa-bars`}></i>
          <div className={style.profile_avt}>
            <img src={`${user ? user.avatar : ""}`} alt=""></img>
          </div>
        </button>
      </div>
    </header>
  );
}
