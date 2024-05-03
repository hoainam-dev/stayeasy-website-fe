import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { changePassword } from '../../redux-tookit/actions/authActions';
import { useDispatch } from 'react-redux';

export const UpdatePassword = ({ title, value }) => {
    const dispatch = useDispatch();

    const [isEditting, setEditting] = useState(false);

    const [passwordErrorMessage, setPasswordErrorMessage] = useState();

    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [powerOfPasswordMessage, SetPowerOfPasswordMessage] = useState(false);

    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    function togglePasswordVisibility(index) {
        index===0?setIsOldPasswordVisible((prevState) => !prevState):
        index===1?setIsNewPasswordVisible((prevState) => !prevState):
        setIsConfirmPasswordVisible((prevState) => !prevState)
    }

    const setInputDefault = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordErrorMessage("");
    }

    const data = { 
        oldpassword : oldpassword,
        newpassword : newpassword,
        confirmpassword : confirmpassword,
        setPasswordErrorMessage : setPasswordErrorMessage,
        setEditting : setEditting,
        setInputDefault : setInputDefault
    };


    const handleUpdatePassword = () => {
        if(oldpassword!==""&&newpassword!==""&&confirmpassword!==""){
            if(oldpassword===newpassword){
                setPasswordErrorMessage("Mật khẩu mới không được trùng với mật khẩu cũ!");
            }else if(confirmpassword!==newpassword){
                setPasswordErrorMessage("Mật khẩu mới của bạn không khớp. Vui lòng thử lại!");
            }else{
                dispatch(changePassword(data));
            }
        }else{
            setPasswordErrorMessage("Vui lòng nhập mật khẩu!");
        }
    };

    const validatePassword = (pass)=>{
        if(pass.length>=10&&/\d/.test(pass)) {
            SetPowerOfPasswordMessage(true);
        }else {
            SetPowerOfPasswordMessage(false);
        };
    }

    return (
        <>
            <div className="flex justify-between mt-10">
                <p className="text-[1.7rem] text-gray-700 font-medium p-0 m-0">{title}</p>
                <button onClick={()=>{setEditting(!isEditting);}} 
                    className="font-medium text-[1.7rem] ml-3 text-[#008489] hover:underline">
                   {isEditting?"Hủy":" Thay đổi"}
                </button>
            </div>
            {!isEditting?
                <p className="text-gray-500">{value}</p>
            :
                <>
                    <div className="w-full mt-2">
                        {/* old password */}
                        <label htmlFor="phoneInput" className={`text-2xl`}>Mật khẩu hiện tại</label>
                        <div className="relative">
                            <input type={isOldPasswordVisible ? "text" : "password"}
                            value={oldpassword}
                            className="border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full"
                            onChange={(e) => {
                                setPasswordErrorMessage();
                                setOldPassword(e.target.value);
                            }}
                            />
                            <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onClick={()=>{togglePasswordVisibility(0)}}>
                                {isOldPasswordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <Link to="/login">
                        <p className="text-[#008489] text-xl hover:underline mb-4">Bạn cần mật khẩu mới?</p>
                    </Link>
                    <div className="w-full mt-2 mb-4">
                        <label htmlFor="phoneInput" className={`text-2xl`}>Mật khẩu mới</label>
                        <div className="relative">
                            <input type={isNewPasswordVisible ? "text" : "password"}
                            value={newpassword}
                            className="border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full"
                            onChange={(e) => {
                                setPasswordErrorMessage();
                                setNewPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            />
                            <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onClick={()=>{togglePasswordVisibility(1)}}>
                                {isNewPasswordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-2 mb-4">
                        <label htmlFor="phoneInput" className={`text-2xl`}>Nhập lại mật khẩu</label>
                        <div className="relative">
                            <input type={isConfirmPasswordVisible ? "text" : "password"}
                            className="border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full"
                            value={confirmpassword}
                            onChange={(e) => {
                                setPasswordErrorMessage();
                                setConfirmPassword(e.target.value);
                            }}
                            />
                            <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onClick={()=>{togglePasswordVisibility(2)}}>
                                {isConfirmPasswordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" color="" height="14" width="17.5" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* độ mạnh yếu của mật khẩu */}
                    {newpassword &&
                        <div className="flex items-center gap-2 mt-2">
                            <p className={`text-2xl ${powerOfPasswordMessage?"text-[#008489]":"text-[#C13515]"}`}>Độ bảo mật của mật khẩu: {powerOfPasswordMessage?"Mạnh":"Yếu"}</p>
                        </div>
                    }
                    <button onClick={()=>{handleUpdatePassword()}} className="px-4 py-3 bg-[#008489] rounded-xl text-white font-medium">Thay đổi mật khẩu</button>
                    {/* error area */}
                    {passwordErrorMessage &&
                        <div className='flex mt-4'>
                            <div className='bg-[#FC642D] py-4 px-3 rounded-s-xl'>
                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" fill="#fff" className="h-[24px] w-[24px] block"><path d="m23.49 20.79c.39.73.12 1.64-.61 2.03-.22.12-.46.18-.71.18h-20.33c-.83 0-1.5-.67-1.5-1.5 0-.25.06-.49.18-.71l10.16-18.94c.39-.73 1.3-1 2.03-.61.26.14.47.35.61.61zm-11.05-18.47c-.05-.09-.12-.16-.2-.2-.24-.13-.55-.04-.68.2l-10.16 18.94c-.04.07-.06.15-.06.24 0 .28.22.5.5.5h20.33c.08 0 .16-.02.24-.06.24-.13.33-.43.2-.68zm-.48 4.68c-.58.02-1.04.51-1.02 1.1l.29 7.42c.01.27.23.48.5.48h.54c.27 0 .49-.21.5-.48l.29-7.42c0-.01 0-.03 0-.04 0-.58-.47-1.06-1.06-1.06-.01 0-.03 0-.04 0zm-.96 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z"></path></svg>
                            </div>
                            <div  className='pt-[1.2rem] pb-2 px-3 border-y border-r rounded-e-xl w-full'>
                                <p className="text-2xl font-medium mt-2">{passwordErrorMessage}</p>
                            </div>
                        </div>
                    }
                </>
            }
        </> 
    );
}
