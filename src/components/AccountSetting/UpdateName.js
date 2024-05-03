import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserContext } from "../UserContext";
import { updateInformation } from "../../redux-tookit/actions/userActions";
import { Alert } from "../Alert/Alert";

export const NameUpdateForm = ({ title, description, isnull, setIsDisabled, isDisable }) => {
  const user = useContext(UserContext).user;

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);

  useEffect(() => {
    if(!user){
      return;
    }
    setFirstName(user.firstName);
    setLastName(user.lastName);
  },[user]);
    
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState();
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState();
  
  const [isEditing, setIsEditing] = useState(false);

  const raw = JSON.stringify({
    "id": user?.id,
    "firstName": firstName,
    "lastName": lastName
  });

  const dispatch = useDispatch();

  const handleUpdateName = () => {
    if(firstName===""||lastName===""){
      Alert(2000, 'Thay đổi họ và tên', 'Nhập thông tin đi ba!😒', 'error', 'OK');
    }else{
      dispatch(updateInformation('họ và tên', raw, setIsDisabled, setIsEditing, isEditing));
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };  
    
  return (
    <>
      <div className={isDisable===0||isDisable===1?"mt-4 mb-10":"pointer-events-none opacity-50 mt-4 mb-10"}>
        {isEditing ? (
            <>
                <div className="flex justify-between">
                  <p className="text-[1.7rem] p-0 m-0">{title}</p>
                  <button onClick={()=>{
                      handleEditToggle();
                      setIsDisabled(0);
                      setFirstName(user?.firstName);
                      setLastName(user?.lastName);
                  }} className="underline font-medium text-2xl">Hủy</button>
                </div>
                <p className="text-gray-500 text-[1.5rem] p-0 m-0">{description}</p>
                <div className="flex py-4 gap-4">
                <div className="relative w-1/2">
                  <label htmlFor="firstNameInput" className={`absolute top-2 left-6 text-xl ${firstNameErrorMessage?"text-[#C13515] font-bold":"text-gray-500"}`}>Họ</label>
                  <input type="text" id="firstNameInput" 
                      value={firstName} 
                      onChange={(e) => {
                        e.target.value==""?setFirstNameErrorMessage("Không được để trống!"):setFirstNameErrorMessage();
                        setFirstName(e.target.value);
                      }}
                      className={`border ${firstNameErrorMessage?"border-red-800 bg-[#fff8f6]":""} rounded-2xl text-gray-700 px-[1.4rem] pt-10 pb-2 w-full`}
                      required/>
                  {firstNameErrorMessage &&
                    <div className="flex items-center gap-2 mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false" fill="#C13515" className="block h-[12px] w-[12px] mb-[0.7rem]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
                      <p className="text-xl text-[#C13515]">{firstNameErrorMessage}</p>
                    </div>
                  }
                </div>
                <div className="relative w-1/2">
                  <label htmlFor="firstNameInput" className={`absolute top-2 left-6 text-xl ${lastNameErrorMessage?"text-[#C13515] font-bold":"text-gray-500"}`}>Tên</label>
                  <input type="text" id="lastNameInput" 
                      value={lastName} onChange={(e)=>{
                        e.target.value==""?setLastNameErrorMessage("Không được để trống!"):setLastNameErrorMessage();
                        setLastName(e.target.value);
                      }}
                      className={`border ${lastNameErrorMessage?"border-red-800 bg-[#fff8f6]":""} rounded-2xl text-gray-700 px-[1.4rem] pt-10 pb-2 w-full`}
                      required/>
                  {lastNameErrorMessage &&
                    <div className="flex items-center gap-2 mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false" fill="#C13515" className="block h-[12px] w-[12px] mb-[0.7rem]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
                      <p className="text-xl text-[#C13515]">{lastNameErrorMessage}</p>
                    </div>
                  }
                </div>
              </div>
              <button onClick={()=>{handleUpdateName()}} className="px-5 py-3 bg-black rounded-2xl text-white font-medium">
                Lưu
              </button>
            </>
          ) : (
            <div className="flex justify-between">
              <div className="flex flex-col w-[80%]">
                <p className="text-[1.7rem] p-0 m-0">{title}</p>
                <p className="text-gray-500 text-[1.5rem]">{
                user?.firstName&&user?.lastName?user?.firstName + " " + user?.lastName:"Chưa cung cấp"}</p>
              </div>
              <div className="justify-start">
                <button onClick={()=>{handleEditToggle();setIsDisabled(1)}} className="underline font-medium text-2xl ml-16">
                  {isnull ? "Thêm" : "Sửa"}
                </button>
              </div>
            </div>
          )}
      </div>
    </>
  );
};