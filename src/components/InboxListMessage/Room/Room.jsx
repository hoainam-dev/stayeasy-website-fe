import React, { useContext, useEffect, useState } from 'react'
import style from '../inboxListMessage.module.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext';

export default function Room({ data }) {
    // const idUser = JSON.parse(localStorage.getItem('user'))?.id.toLocaleLowerCase()
    const idUser = useContext(UserContext).user?.id;

    const [host, setHost] = useState()
    const hostId = data.userId === idUser ? data.hostId : data.userId
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/stayeasy/chatroom/get-host/${hostId}`)
            .then(data => data.json())
            .then(data => {
                setHost(data)
            })
    }, [hostId])
    return (
        <li>
            <Link to={`/inbox/${data.roomChatId}`}>
                <div className={style.avt_box}>
                    <img src={`${host ? host.avatar : ''}`} alt="" />
                </div>
                <div className={style.content_box}>
                    <div>
                        <span className={style.name_user}>{host ? host.firstName+" "+host.lastName : ''}</span>
                         {/* <span>.</span><span className={style.sub_content}>Gia Vien District</span> */}
                    </div>
                    {/* <div>
                        <span className={style.message_user}>Can I help An?</span>
                    </div> */}
                    {/* <div>
                        <span className={style.sub_content}>Invited to book</span><span>.</span><span className={style.sub_content}>Feb 11-16</span>
                    </div> */}
                </div>
            </Link>
        </li>
    )
}
