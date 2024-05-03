import React, { useContext, useState } from "react";
import Footer from "../../components/footer/Footer";
import CommonHeader from "../../components/header/CommonHeader";
import { Link } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import { NameUpdateForm } from "../../components/AccountSetting/UpdateName";
import { EmailUpdateForm } from "../../components/AccountSetting/UpdateEmail";
import { PhoneUpdateForm } from "../../components/AccountSetting/UpdatePhone";
import { AddressUpdateForm } from "../../components/AccountSetting/UpdateAddress";

export default function PersonalInfo({ title }) {
  const user = useContext(UserContext).user;
  const [isDisable, setIsDisable] = useState(0);

  function obscureEmail(email) {
    if(email){
      const parts = email.split("@");
      const name = parts[0];
      const domain = parts[1];
      let obscuredName =
        name.length > 2
          ? name[0] + "*".repeat(name.length - 2) + name[name.length - 1]
          : name[0] + "*";
      return `${obscuredName}@${domain}`;
    }
  }

  return (
    <>
      <CommonHeader />
      <div className="flex flex-col py-[4rem] mt-32 max-[768px]:mt-9 min-[1286px]:px-[24rem] min-[640px]:px-[7rem] max-[640px]:px-[2rem]">
        <div className="flex items-center gap-3 font-medium">
          <Link to="/account-settings" className="hover:underline">Tài khoản</Link>
          <svg xmlns="http://www.w3.org/2000/svg" height="12" width="7.5" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
          <span>{title}</span>
        </div>
        <h1 className="text-[3.5rem] font-bold my-2">{title}</h1>
        <div className="lg:flex justify-between">
          <div className="lg:w-[55%] mt-14">
            {/* email */}
            <EmailUpdateForm
              title="Địa chỉ Email"
              isDisable={isDisable}
            />
            <hr />

            {/* Name */}
            <NameUpdateForm 
              title="Họ và tên"
              description="Đây là tên trên giấy thông hành của bạn, có thể là giấy phép hoặc hộ chiếu."
              user={user?user: "Chưa cung cấp"}
              isnull={user?.firstName && user?.firstName ? false : true}
              setIsDisabled={setIsDisable}
              isDisable={isDisable}
            />
            <hr />


            {/* phone */}
            <PhoneUpdateForm
              title="Số điện thoại"
              description="Thêm số điện thoại để khách đã xác nhận và Airbnb có thể liên hệ với bạn. Bạn có thể thêm các số điện thoại khác và chọn mục đích sử dụng tương ứng."
              data={user?.phone
                  ? user?.phone
                  : "Thêm số điện thoại để khách đã xác nhận và Airbnb có thể liên hệ với bạn. Bạn có thể thêm các số điện thoại khác và chọn mục đích sử dụng tương ứng."}
              isnull={user?.phone ? false : true}
              setIsDisabled={setIsDisable}
              isDisable={isDisable}
            />
            <hr />

            {/* address */}
            <AddressUpdateForm
              title="Địa chỉ"
              data={user?.address ? user : "Chưa được cung cấp"}
              isnull={user?.address ? false : true}
              setIsDisabled={setIsDisable}
              isDisable={isDisable}
            />
            <hr />

            {/* hotline */}
            <Infor
              title="Liên hệ trong trường hợp khẩn cấp"
              data={user?.hotline ? user?.hotline : "Chưa được cung cấp"}
              isnull={user?.hotline ? false : true}
              setIsDisabled={setIsDisable}
              isDisable={isDisable}
            />

          </div>
          <div className="lg:w-[35%] mt-14 p-5 border border-gray-700 rounded-2xl">
            <div className="flex flex-col gap-4">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="block h-[48px] w-[48px] fill-[#E31C5F] stroke-current"aria-hidden="true"role="presentation"focusable="false">
                <g><g stroke="none">
                  <path d="M27 5l.585.005c4.29.076 8.837.984 13.645 2.737l.77.288V35.4l-.008.13a1 1 0 0 1-.47.724l-.116.06L27 42.716V25a1 1 0 0 0-.883-.993L26 24H12V8.029l.77-.286c4.797-1.75 9.336-2.658 13.62-2.737L27 5z"fill-opacity=".2"></path>
                  <path d="M27 1c5.599 0 11.518 1.275 17.755 3.816a2 2 0 0 1 1.239 1.691L46 6.67V35.4a5 5 0 0 1-2.764 4.472l-.205.097-15.594 6.93L27 47l-2.461-1h2.451a.01.01 0 0 0 .007-.003L27 45.99v-1.085l15.218-6.763a3 3 0 0 0 1.757-2.351l.019-.194.006-.196V6.669l-.692-.278C37.557 4.128 32.121 3 27 3S16.443 4.128 10.692 6.391L10 6.67 9.999 24H8V6.669a2 2 0 0 1 1.098-1.786l.147-.067C15.483 2.275 21.401 1 27 1z"></path></g><g fill="none" stroke-width="2">
                  <path d="M4 24h22a1 1 0 0 1 1 1v20.99a.01.01 0 0 1-.01.01H4a1 1 0 0 1-1-1V25a1 1 0 0 1 1-1z"></path>
                  <path d="M21 25v-5a6 6 0 1 0-12 0v5"></path>
                  <circle cx="15" cy="35" r="2"></circle>
                </g></g>
              </svg>
              <h2>Tại sao thông tin của tôi không hiển thị ở đây?</h2>
              <p className="text-gray-500">Chúng tôi đang ẩn một số chi tiết tài khoản để bảo vệ danh tính của bạn.</p>
            </div>
            <hr />
            <div className="flex flex-col gap-4">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="block h-[48px] w-[48px] fill-[#E31C5F] stroke-current"aria-hidden="true" role="presentation" focusable="false"><g stroke="none"><path d="m39 15.999v28.001h-30v-28.001z" fill-opacity=".2"></path><path d="m24 0c5.4292399 0 9.8479317 4.32667079 9.9961582 9.72009516l.0038418.27990484v2h7c1.0543618 0 1.9181651.8158778 1.9945143 1.8507377l.0054857.1492623v32c0 1.0543618-.8158778 1.9181651-1.8507377 1.9945143l-.1492623.0054857h-34c-1.0543618 0-1.91816512-.8158778-1.99451426-1.8507377l-.00548574-.1492623v-32c0-1.0543618.81587779-1.9181651 1.85073766-1.9945143l.14926234-.0054857h7v-2c0-5.5228475 4.4771525-10 10-10zm17 14h-34v32h34zm-17 14c1.6568542 0 3 1.3431458 3 3s-1.3431458 3-3 3-3-1.3431458-3-3 1.3431458-3 3-3zm0 2c-.5522847 0-1 .4477153-1 1s.4477153 1 1 1 1-.4477153 1-1-.4477153-1-1-1zm0-28c-4.3349143 0-7.8645429 3.44783777-7.9961932 7.75082067l-.0038068.24917933v2h16v-2c0-4.418278-3.581722-8-8-8z"></path></g></svg>
              <h2>Những chi tiết nào có thể được chỉnh sửa?</h2>
              <p className="text-gray-500">
                Thông tin liên lạc và chi tiết cá nhân có thể được chỉnh sửa.
                Nếu thông tin này được sử dụng để xác minh danh tính của bạn,
                bạn sẽ cần được xác minh lại vào lần đặt chỗ tiếp theo—hoặc để
                tiếp tục đón tiếp khách.
              </p>
            </div>
            <hr />
            <div className="flex flex-col gap-4">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="block h-[48px] w-[48px] fill-[#E31C5F] stroke-current"aria-hidden="true" role="presentation" focusable="false"><g stroke="none"><path d="M24 9C14.946 9 7.125 15.065 4.74 23.591L4.63 24l.013.054c2.235 8.596 9.968 14.78 18.99 14.943L24 39c9.053 0 16.875-6.064 19.26-14.59l.11-.411-.013-.052c-2.234-8.597-9.968-14.78-18.99-14.944L24 9z"fill-opacity=".2"></path><path d="M24 5c11.18 0 20.794 7.705 23.346 18.413l.133.587-.133.587C44.794 35.295 35.181 43 24 43 12.82 43 3.206 35.295.654 24.588l-.133-.587.048-.216C2.985 12.884 12.69 5 24 5zm0 2C13.88 7 5.16 13.887 2.691 23.509l-.12.492.032.14c2.288 9.564 10.728 16.513 20.65 16.846l.377.01L24 41c10.243 0 19.052-7.056 21.397-16.861l.031-.14-.031-.138c-2.288-9.566-10.728-16.515-20.65-16.848l-.377-.01L24 7zm0 10a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"></path></g></svg>
              <h2>Thông tin nào được chia sẻ với người khác?</h2>
              <p className="text-gray-500">Airbnb only releases contact information for Hosts and guests after a reservation is confirmed.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const Infor = ({ title, data, description, isnull, setIsDisabled, isDisable }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };  
  
  return (
    <>
      <div className={isDisable===0||isDisable===5?"mt-4 mb-10":"pointer-events-none opacity-50 mt-4 mb-10"}>
        {isEditing ? (
              <>
                <div className="flex justify-between">
                  <p className="text-[1.7rem] p-0 m-0">{title}</p>
                  <button onClick={()=>{handleEditToggle();setIsDisabled(0)}} className="underline font-medium text-2xl">Hủy</button>
                </div>
                <p className="text-gray-500 text-[1.5rem] p-0 m-0">{description}</p>
              </>
          ) : (
            <div className="flex justify-between">
              <div className="flex flex-col w-[80%]">
                <p className="text-[1.7rem] p-0 m-0">{title}</p>
                <p className="text-gray-500 text-[1.5rem]">{data}</p>
              </div>
              <div className="justify-start">
                <button onClick={()=>{handleEditToggle();setIsDisabled(5);}} className="underline font-medium text-2xl ml-16">
                  {isnull ? "Thêm" : "Sửa"}
                </button>
              </div>
            </div>
          )}
      </div>
    </>
  );
};