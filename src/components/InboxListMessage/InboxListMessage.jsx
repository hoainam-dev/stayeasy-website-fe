import React, { useContext, useEffect, useState } from "react";
import style from "./inboxListMessage.module.css";
import Room from "./Room/Room";
import { useSelector } from "react-redux";
import { counterSelector } from "../../redux-tookit/selector";
import {UserContext} from '../../components/UserContext'
export default function InboxListMessage() {
  const [listRoom, setListRoom] = useState([]);
  const counter = useSelector(counterSelector);
  const user = useContext(UserContext).user
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // const idUser = JSON.parse(localStorage.getItem("user"))?.id;
  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")));
  // }, [counter]);
  
  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/stayeasy/chatroom/get/all/room/user/${user?.id}`,
      {

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `BEARER ${localStorage.getItem("access_token")}`
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setListRoom(data);
      });
  }, [user]);

  return (
    <div className={style.inbox_box}>
      <div className={style.inbox_box_top}>
        <h2>Messages</h2>
        <div>
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="M14 25h4v4h-4zm-4-3h12v-4H10zm-4-7h20v-4H6zM2 4v4h28V4z"></path>
          </svg>
        </div>
      </div>

      <div className={style.inbox_box_content}>
        <ul>
          {
            listRoom.length > 0 ?
          listRoom.map((e) => (
            <Room key={e.roomChatId} data={e}></Room>
          )): <></>}
        </ul>
      </div>
    </div>
  );
}
