import React, { useState } from "react";
import ButtonCustom from "./ButtonCustom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { grouptSlice } from "../../redux-tookit/reducer/grouptSlice";
import { grouptSelector } from "../../redux-tookit/selector";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";

// Component show menu when not authenticate yet
// Show Popup for Login and register
export default function AuthModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy phần path name của URL hiện tại
  const currentPath = window.location.pathname;

  const { isOpenLoginModal } = useSelector(grouptSelector);

  const [isLogin, setIsLogin] = useState(true);

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // method show modal
  const toggleOpenPopup = () => {
    dispatch(grouptSlice.actions.openLoginForm());
  };

  // method hide modal
  const toggleClosePopup = () => {
    dispatch(grouptSlice.actions.openLoginForm());
  };

  const registerState = {
    setIsLogin: setIsLogin
  }

  const loginState = {
    navigate: navigate
  }

  const forgotPassState = {
    setIsLogin: setIsLogin,
    setIsForgotPassword: setIsForgotPassword
  }

  return (
    <>
      <Dropdown.Menu className="w-[23rem] h-[fit] border-white rounded-full shadow-lg px-0">
        <Dropdown.Item>
          <div className="w-full" onClick={() => {
              if(currentPath!=="/login"){
                setIsLogin(true);
                setIsForgotPassword(false);
                toggleOpenPopup();
              }
              }}>
            <p className="text-2xl font-medium mt-2 px-2">Đăng nhập</p>
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div className="w-full" onClick={() => {
              if(currentPath!=="/login"){
                setIsLogin(false);
                setIsForgotPassword(false);
                toggleOpenPopup();
              }
            }}>
            <p className="text-2xl mt-2 px-2">Đăng ký</p>
          </div>
        </Dropdown.Item>
        <hr/>
        <Dropdown.Item>
          <div className="w-full" onClick="">
            <p className="text-2xl mt-2 px-2">Cho thuê chỗ ở qua Stayeasy</p>
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div className="w-full" onClick="">
            <p className="text-2xl mt-2 px-2">Trung tâm trợ giúp</p>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
      
      {/* modal start */}
      {isOpenLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center overflow-auto">
          {/* close modal when click out of modal area */}
          <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={toggleClosePopup}></div>
          {/* header area start */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden z-50 max-[2700px]:max-w-[37%] max-[1440px]:max-w-[50%] max-[1100px]:max-w-[53%] max-[970px]:max-w-[57%] max-[470px]:max-w-[70%] w-full h-[90%]">
            <div className="items-center font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
              {/* close modal button */}
              <button className="absolute -mr-2 text-gray-500 hover:text-gray-700" onClick={toggleClosePopup}>
                <svg xmlns="http://www.w3.org/2000/svg" height="" width="15" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
              <h2 className="text-3xl justify-center text-center font-semibold">
                {!isLogin ? "Đăng ký" : isForgotPassword ? "Quên Mật khẩu" : "Đăng nhập"}
              </h2>
            </div>
            {/* header area end */}

            <hr />
            {/* body area start */}
            <div className="px-10 py-4 overflow-auto max-h-[88%] max-h-[200px]:max-h-[30%] z-50">

              {/* form start */}
              {!isLogin?(
                  <RegisterForm state={registerState}/>
                ):isForgotPassword?(
                  <ForgotPassword state={forgotPassState} />
                ):(
                  <LoginForm state={loginState} />
              )}

              {/* switch modal */}
              {isForgotPassword
              ?
              <div className="justify-center text-center my-3">
                Bạn đã có tài khoản? 
                <button className="text-[#FF002C]" onClick={() => {
                  setIsLogin(true);
                  setIsForgotPassword(false);
                }}>
                  Đăng nhập
                </button>
              </div>
              :
                <div className="justify-center text-center my-3">
                  {setIsLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
                  <button className="text-[#FF002C]" onClick={() => {
                    setIsLogin(!isLogin);
                    setIsForgotPassword(false);
                  }}>
                    {isLogin ? "Đăng ký" : "Đăng nhập"}
                  </button>
                </div>
              }

              {isLogin&&(
                <div className="justify-center text-center my-3">
                  <button className="text-[#FF002C]"
                    onClick={() => {
                      setIsForgotPassword(true);
                      }}>Quên mật khẩu</button>
                </div>
              )}

              {/* line */}
              <div className="flex items-center justify-center my-3">
                <div className="border-t border-gray-300 w-full"></div>
                <div className="mx-4 text-gray-500">hoặc</div>
                <div className="border-t border-gray-300 w-full"></div>
              </div>
              {/* other login function area start */}
              <ButtonCustom />
            </div>
          </div>
        </div>
      )}
    </>
  );
}