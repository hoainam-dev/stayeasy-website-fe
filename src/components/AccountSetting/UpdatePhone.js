import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { updateInformation } from "../../redux-tookit/actions/userActions";
import { sendPhoneCode } from "../../redux-tookit/actions/emailActions";

import ReactInputVerificationCode from 'react-input-verification-code';

import "./Loading.css";


export const PhoneUpdateForm = ({ title, description, isnull, setIsDisabled, isDisable }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useContext(UserContext).user;

  const [isEditing, setIsEditing] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState();
  
  const [phone, setPhone] = useState(user?.phone);
  
  const [isValidate, setIsValidate] = useState(false);
  
  useEffect(()=>{
    if(!user){
      return;
    }
    setPhone(user.phone);
  }, [user]);
  
  const raw = JSON.stringify({
    "id": user?.id,
    "phone": phone
  });
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  // test phone code
  const [code, setCode] = useState();
  const [codeConfirm, setCodeConfirm] = useState();
  
  const [isSendCode, setIsSendCode] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  
  const [codeErrorMessage, setCodeErrorMessage] = useState(); //message code error
  const [codeSuccessMessage, setCodeSuccessMessage] = useState(); //message code success

  // state countdown -> countdown time to resend code
  const [countdown, setCountdown] = useState(60);

  // set state message
  const setMessage = ( phoneSuccessMessage, phoneErrorMessage, phoneCodeError, isSendCode, isVerify) =>{
      setCodeSuccessMessage(phoneSuccessMessage);
      setPhoneErrorMessage(phoneErrorMessage);
      setCodeErrorMessage(phoneCodeError);
      setIsSendCode(isSendCode);
      setIsVerify(isVerify);
  }

  // data send email code
  const dataSendPhoneCode = {
    phone: phone,
    setCode: setCode,
    setIsSending: setIsSending,
    setCountdown: setCountdown,
    setMessage: setMessage
  }

  // method validate email input and send email from authAction
  const handleSendPhoneCode = () => {
    if (phone==="" ||!phone) {
      setPhoneErrorMessage("Số điện thoại không hợp lệ");
      setCodeErrorMessage();
      setIsSendCode(false);
    }else if(phone&&(phone.length>=12||phone.length<10)){
      setPhoneErrorMessage("Số điện thoại không hợp lệ");
      setCodeErrorMessage();
      setIsSendCode(false);
    }else {
        if (!isSendCode) {
          setIsSending(true);
          dispatch(sendPhoneCode(dataSendPhoneCode));
          // Gửi email và sau đó đặt thời gian đếm ngược

          let countdownValue = 60;

          setTimeout(()=>{setCodeSuccessMessage();},[10000]);

          // Gửi email và sau đó đặt thời gian đếm ngược
          // Trong trường hợp này, tôi sẽ đặt thời gian đếm ngược là 60 giây
          const interval = setInterval(() => {
              if (countdownValue > 0) {
                  setCountdown(countdownValue);
                  countdownValue -= 1;
              } else {
                  setIsSendCode(false);
                  clearInterval(interval);
              }
          }, 1000);
          
          // Dừng đếm ngược khi component bị unmount
          return () => clearInterval(interval);
      }
    }
  }

  //method resend code to email
  const handleReSendPhoneCode = () =>{
      if(!isSendCode){
          setIsSending(true);
          dispatch(sendPhoneCode(dataSendPhoneCode));

          setTimeout(()=>{setCodeSuccessMessage();},[10000]);

          let countdownValue = 57;

          // Gửi email và sau đó đặt thời gian đếm ngược
          // Trong trường hợp này, tôi sẽ đặt thời gian đếm ngược là 60 giây
          const interval = setInterval(() => {
              if (countdownValue > 0) {
                  setCountdown(countdownValue);
                  countdownValue -= 1;
              } else {
                  setIsSendCode(false);
                  clearInterval(interval);
              }
          }, 1000);
          
          // Dừng đếm ngược khi component bị unmount
          return () => clearInterval(interval);
      }else{
          setPhoneErrorMessage("Vui lòng thử lại sau 60 giây.");
      }
  }

  // method validate email input and send email from authAction
  const handleCheckCode = () => {
    if (code!=codeConfirm) {
        setCodeSuccessMessage();
        setCodeErrorMessage("Mã xác minh không hợp lệ!");
    } else {
      dispatch(updateInformation('số điện thoại', raw, setIsDisabled, setIsEditing, isEditing, location, navigate));
      setIsVerify(true);
      setCodeErrorMessage();// đặt lại message error của code
    }
  }
  
  return (
    <>
      <div className={isDisable===0||isDisable===3?"mt-4 mb-10":"pointer-events-none opacity-50 mt-4 mb-10"}>
        {isEditing ? (
              <>
                <div className="flex justify-between">
                  <p className="text-[1.7rem] p-0 m-0">{title}</p>
                  <button onClick={()=>{
                    handleEditToggle();
                    setPhone(user?.phone);
                    setPhoneErrorMessage();
                    setCodeErrorMessage();
                    setCodeSuccessMessage();
                    setIsDisabled(0);
                    setIsValidate(false);
                    setIsSendCode(false);
                    setIsVerify(false);
                  }} className="underline font-medium text-2xl">Hủy</button>
                </div>
                <p className="text-gray-500 text-[1.5rem] p-0 m-0">{description}</p>
                <div className="relative py-4 w-full">
                  <label htmlFor="phoneInput" className={`absolute top-8 left-6 text-xl ${phoneErrorMessage?"text-[#C13515] font-bold":"text-gray-500"}`}>Số điện thoại</label>
                  <PhoneInput
                    country={"vn"}
                    inputProps={{
                      autoFocus: true,
                      enableAreaCodes:false,
                    }}
                    enableAreaCodeStretch
                    enableSearch={true}
                    value={phone}
                    inputStyle={{width:"100%", paddingLeft:"5.5rem", paddingRight:"5.5rem", paddingTop:"1.5rem", paddingBottom:"1.5rem", borderRadius:"1rem"}}
                    onChange={(e) => {
                      setPhoneErrorMessage();
                      setPhone(e);
                      if(e!==""&&!(/^\d+$/.test(e))){
                        setPhoneErrorMessage("Số điện thoại không được chứa ký tự!");
                        setIsValidate(false);
                      }else{setIsValidate(true);}
                    }}/>
                </div>
                {/* error phone message */}
                {phoneErrorMessage &&
                    <div className="flex items-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false" fill="#C13515" className="block h-[12px] w-[12px] mb-[0.7rem]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
                        <p className="text-xl text-[#C13515]">{phoneErrorMessage}</p>
                    </div>
                }

                {/* success code message */}
                {!codeSuccessMessage == ""? (
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-3 rounded relative" role="alert">
                        <span class="block sm:inline">{codeSuccessMessage}</span>
                    </div>
                ) : ("")}

                {/* error code verify message */}
                {codeErrorMessage ? (
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-3 rounded relative" role="alert">
                        <span class="block sm:inline">{codeErrorMessage}</span>
                    </div>
                ) : ("")}

                {/* form code verify */}
                {isVerify &&
                  <div className="py-4 w-full">
                    <ReactInputVerificationCode
                      length={6}
                      value={codeConfirm}
                      onChange={(e) => {
                        setCodeErrorMessage();
                        setCodeConfirm(e);
                      }}/>
                    <div className="flex gap-3">
                      <div>Chưa nhận được mã? <button className="pt-2 underline font-medium" disabled={isSendCode} onClick={()=>{handleReSendPhoneCode()}}>Gửi lại 
                      {isSendCode && <span className="mt-3"> ({countdown}s)</span>}</button></div>
                      {isSending&&(
                        <div class="balls2 underline">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      )}
                    </div>
                  </div>
                }

                <button onClick={()=>{isVerify?handleCheckCode():handleSendPhoneCode()}} 
                    className={`flex items-center gap-3 px-5 py-3 bg-black rounded-2xl text-white font-medium`}>
                      {isVerify?"Xác nhận":"Gửi mã"}
                      {!isVerify&&isSending&&(
                        <div class="balls">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      )}
                </button>
              </>
          ) : (
            <div className="flex justify-between">
              <div className="flex flex-col w-[80%]">
                <p className="text-[1.7rem] p-0 m-0">{title}</p>
                <p className="text-gray-500 text-[1.5rem]">
                  {user?.phone
                  ?'+' + user?.phone.slice(0, 2) + ' ' + user?.phone.slice(2, 5) + ' ' + user?.phone.slice(5, 8) + ' ' + user?.phone.slice(8)
                  :"Chưa cung cấp"}
                </p>
              </div>
              <div className="justify-start">
                <button onClick={()=>{handleEditToggle();setIsDisabled(3)}} className="underline font-medium text-2xl ml-16">
                  {isnull ? "Thêm" : "Sửa"}
                </button>
              </div>
            </div>
          )}
      </div>
    </>
  );
};