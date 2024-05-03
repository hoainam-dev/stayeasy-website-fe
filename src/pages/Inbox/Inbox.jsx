import React, { useContext, useEffect, useState } from "react";
import style from "./boxchat.module.css";
import HeaderInbox from "../../components/HeaderInbox/HeaderInbox";
import InboxDetail from "../../components/InboxDetail/InboxDetail";
import InboxListMessage from "../../components/InboxListMessage/InboxListMessage";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import { counterSelector } from "../../redux-tookit/selector";
import { Navigate } from "react-router-dom";
import CommonHeader from "../../components/header/CommonHeader";
import {UserContext} from '../../components/UserContext'
export default function Inbox({ children }) {
  // const counter = useSelector(counterSelector);
  // const user = useContext(UserContext).user
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // const idUser = JSON.parse(localStorage.getItem("user"))?.id;
  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")));
  // }, [counter]);

  return (
    <>
      {/* <HeaderInbox></HeaderInbox> */}
      {/* {user ? ( */}
        <>
          <CommonHeader padding="20"/>
          <div className={`mt-32 ${style.box_message}`}>
            <InboxListMessage></InboxListMessage>

            {children}

            <InboxDetail></InboxDetail>
          </div>
        </>
      {/* ) : (
        <Navigate to="/" replace={true} />
      )} */}
    </>
  );
}
