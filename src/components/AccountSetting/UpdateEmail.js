import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";

export const EmailUpdateForm = ({ title, isDisable}) => {
  const user = useContext(UserContext).user;

  const [email, setEmail] = useState(user?.email);

  useEffect(()=>{
    if(!user){
      return;
    }
    setEmail(user.email);
  }, [user]);
  return (
    <>
      <div className={isDisable===0||isDisable===6?"mt-4 mb-10":"pointer-events-none opacity-50 mt-4 mb-10"}>
        <div className="flex justify-between">
          <div className="flex flex-col w-[80%]">
            <p className="text-[1.7rem] p-0 m-0">{title}</p>
            <p className="text-gray-500 text-[1.5rem]">{email}</p>
          </div>
        </div>
      </div>
    </>
  );
};