import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import CommonHeader from "../../components/header/CommonHeader";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { UpdatePassword } from "../../components/AccountSetting/UpdatePassword";
import { UserContext } from "../../components/UserContext";
import moment from "moment";

export default function LoginAndSecurity({ title }) {
  var [currentActive, setCurrentActive] = useState(0);

  return (
    <>
    <CommonHeader/>
    {/* max-[768px]: Từ 768px trở xuống */}
    {/* min-[768px]: Từ 768px trở lên */}
    <div className='flex flex-col py-[4rem] mt-32 max-[768px]:mt-9 min-[1286px]:px-[24rem] min-[640px]:px-[7rem] max-[640px]:px-[2rem]'>
      <div className='flex items-center gap-3 font-medium'>
        <Link to='/account-settings' className='hover:underline'>
          Tài khoản
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" height="12" width="7.5" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
        <span>{title}</span>
      </div>
      <h1 className='text-[3.5rem] font-bold my-2'>{title}</h1>
      <div className='mt-16 lg:w-[55%]'>
        <div className='flex gap-5 font-medium'>
          <NavLink to="/account-settings/login-and-security" className="bg-transparent" onClick={() => setCurrentActive(0)}>
            <div className={currentActive==0?"text-[#008489] border-b-2 border-[#008489] py-2":"py-2"}>
              <p>ĐĂNG NHẬP</p>
            </div>
          </NavLink>
          <NavLink to="/account-settings/login-and-security/login-requests" className="bg-transparent" onClick={() => setCurrentActive(1)}>
            <div className={currentActive==1?"text-[#008489] border-b-2 border-[#008489] py-2":"py-2"}>
              <p>YÊU CẦU ĐĂNG NHẬP</p>
            </div>
          </NavLink>
          <NavLink to="/account-settings/login-and-security/shared-access" className="bg-transparent" onClick={() => setCurrentActive(2)}>
            <div className={currentActive==2?"text-[#008489] border-b-2 border-[#008489] py-2":"py-2"}>
              <p>TRUY CẬP CHIA SẺ</p>
            </div>
          </NavLink>
          </div>
          <hr className="mt-0"/>
        </div>
        {currentActive == 0 ? (
          <Login />
        ) : currentActive == 1 ? (
          <LoginRequests />
        ) : (
          <SharedAccess />
        )}
      </div>
      <Footer />
    </>
  );
}

const Login = () => {
  const userFetch = useContext(UserContext).user;
  const [caculatorTime, setCaculatorTime] = useState();
  const [unit, setUnit] = useState();

  useEffect(()=>{
      if(!userFetch){
          return;
      }else{
        // Tạo một đối tượng moment từ LocalDateTime
        const dateTimeMoment = moment(userFetch?.updateAt);
        
        // Lấy ngày giờ hiện tại
        const currentDateTime = moment();
  
        // Tính khoảng thời gian giữa hai ngày giờ
        const duration = moment.duration(currentDateTime.diff(dateTimeMoment));

        if(Math.floor(duration.asSeconds())>60){
          if(Math.floor(duration.asMinutes())>60){
            if(Math.floor(duration.asHours())>24){
              setCaculatorTime(Math.floor(duration.asDays()));
              setUnit("ngày");
            }else{
              setCaculatorTime(Math.floor(duration.asHours()));
              setUnit("giờ");
            }
          }else{
            setCaculatorTime(Math.floor(duration.asMinutes()));
            setUnit("phút");
          }
        }else{
          setCaculatorTime(Math.floor(duration.asSeconds()));
          setUnit("giây");
        }
      }
  },[userFetch]);

  return (
    <>
      <div className="lg:flex lg:justify-between">
        <div className="lg:w-[55%]">
          <h1 className="font-bold text-gray-600 mt-12 mb-12">Login</h1>
          {/* password */}
          <UpdatePassword title="Mật khẩu" value={`Cập nhật lần cuối ${!caculatorTime? '0 giờ trước' : caculatorTime + " "+ unit +" trước"}`} button="Thay đổi"/>
          <hr />

          <h1 className="font-bold text-gray-600 mt-12 mb-12">
            Social accounts
          </h1>
          {/* Facebook */}
          <Infor title="Facebook" value="Chưa liên kết" button="Liên kết" />
          <hr />
          {/* Name */}
          <Infor title="Google" value="Chưa liên kết" button="Liên kết" />
          <hr />

          <h1 className="font-bold text-gray-600 mt-12 mb-12">
            Device history
          </h1>
          {/* Name */}
          <DeviceHistory title="Thiết bị" value="Last updated 7 days ago" button="Đăng xuất thiết bị"/>
          <hr />
        </div>
        <div className="flex flex-col gap-3 lg:w-[35%] h-fit p-5 border border-gray-700 rounded-lg">
          <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" fill="currentColor" className="h-[40px] w-[40px] block text-[#Ffb400]"><path d="m5 20.5a.5.5 0 0 1 -.5.5h-.5v.5a.5.5 0 0 1 -1 0v-.5h-.5a.5.5 0 0 1 0-1h .5v-.5a.5.5 0 0 1 1 0v .5h.5a.5.5 0 0 1 .5.5zm1.5 1.5a.5.5 0 1 0 .5.5.5.5 0 0 0 -.5-.5zm16-20h-.5v-.5a.5.5 0 0 0 -1 0v .5h-.5a.5.5 0 0 0 0 1h .5v.5a.5.5 0 0 0 1 0v-.5h.5a.5.5 0 0 0 0-1zm-2.58 4.87a13.41 13.41 0 0 1 -6.76-3.2.37.37 0 0 0 -.63.26l.08 16.22a.38.38 0 0 0 .55.32 11.98 11.98 0 0 0 7.07-13.31.37.37 0 0 0 -.31-.3z"></path><path d="m14.39 8.32a1.93 1.93 0 0 0 -3.66 0l-2.42 4.85a3.09 3.09 0 0 0 -.4 1.61 2.36 2.36 0 0 0 2.23 2.23 3.95 3.95 0 0 0 2.42-1.06 3.95 3.95 0 0 0 2.42 1.06 2.36 2.36 0 0 0 2.23-2.23 3.09 3.09 0 0 0 -.4-1.61zm-2.72 4.38c0-.05.01-1.23.89-1.23s.88 1.18.88 1.23a3.25 3.25 0 0 1 -.88 1.83 3.25 3.25 0 0 1 -.89-1.83zm3.31 3.31a2.92 2.92 0 0 1 -1.71-.77 4.3 4.3 0 0 0 1.17-2.54 2.02 2.02 0 0 0 -1.8-2.22l-.08-.01a2.02 2.02 0 0 0 -1.89 2.15l.01.08a4.29 4.29 0 0 0 1.17 2.54 2.92 2.92 0 0 1 -1.71.77 1.36 1.36 0 0 1 -1.23-1.23 2.13 2.13 0 0 1 .29-1.16l2.42-4.85c.33-.65.55-.76.94-.76s.61.11.94.76l2.42 4.85a2.13 2.13 0 0 1 .29 1.16 1.36 1.36 0 0 1 -1.23 1.23zm7.01-10.35a.5.5 0 0 0 -.43-.4 13.03 13.03 0 0 1 -8.68-4.57.52.52 0 0 0 -.77 0 13.03 13.03 0 0 1 -8.68 4.57.5.5 0 0 0 -.43.4c-1.58 8.19 1.55 14.02 9.3 17.31a.5.5 0 0 0 .39 0c7.75-3.29 10.87-9.11 9.3-17.31zm-9.49 16.3c-7.1-3.09-9.91-8.25-8.57-15.76a13.98 13.98 0 0 0 8.57-4.43 13.98 13.98 0 0 0 8.57 4.43c1.33 7.51-1.48 12.67-8.57 15.76z"fill="#484848"></path></svg>
          <h3 className="text-3xl">
            Hãy làm cho tài khoản của bạn an toàn hơn
          </h3>
          <h4 className="text-[1.7rem]">
            Bảo mật tài khoản của bạn:{" "}
            <span className="font-normal text-gray-500 text-[1.7rem]">
              Thấp
            </span>
          </h4>
          <p>
            Chúng tôi luôn nỗ lực tìm cách tăng cường sự an toàn trong cộng đồng
            của mình. Đó là lý do tại sao chúng tôi xem xét mọi tài khoản để đảm
            bảo tài khoản đó an toàn nhất có thể.
          </p>
          <div className="w-[20%]">
            <hr />
          </div>
          <button className="bg-[#008489] w-[13rem] px-5 py-3 rounded-lg text-white font-bold">
            cải thiện
          </button>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-gray-600 mt-12 mb-12">Account</h1>
        <div className="flex justify-between">
          <p className="text-3xl">Khóa tài khoản của bạn</p>
          <button className="text-red-600 hover:underline hover:text-[#008489]">
            Vô hiệu hóa
          </button>
        </div>
        <hr />
      </div>
    </>
  );
};

const LoginRequests = () => {
  return (
    <>
      <div className="lg:flex lg:justify-between">
        <div className="lg:w-[55%]">
          <h1 className="font-bold text-gray-600 mt-16 mb-16">
            Yêu cầu đăng nhập
          </h1>
          <p>
            Các thành viên trong nhóm có thể phải nhập mã xác minh khi đăng nhập
            vào tài khoản này lần đầu tiên. Phê duyệt hoặc từ chối yêu cầu đăng
            nhập của họ trên trang này.
          </p>
          {/* Pending requests */}
          <h2 className="font-medium text-gray-600 mt-12 mb-12">
            Yêu Cầu Đang Đợi Giải Quyết
          </h2>
          <hr />
          {/* Approved requests */}
          <h2 className="font-medium text-gray-600 mt-12 mb-12">
            Yêu cầu được phê duyệt
          </h2>
          <hr />
          {/* Satisfied requests */}
          <h2 className="font-medium text-gray-600 mt-12 mb-12">
            Yêu cầu được đáp ứng
          </h2>
          <hr />
          {/* Declined requests */}
          <h2 className="font-medium text-gray-600 mt-12 mb-12">
            Yêu cầu bị từ chối
          </h2>
          <hr />
        </div>
        <div className="flex flex-col gap-3 lg:w-[35%] h-fit p-5 border border-gray-700 rounded-lg">
          <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" fill="currentColor" className="h-[40px] w-[40px] block text-[#Ffb400]"><path d="m5 20.5a.5.5 0 0 1 -.5.5h-.5v.5a.5.5 0 0 1 -1 0v-.5h-.5a.5.5 0 0 1 0-1h .5v-.5a.5.5 0 0 1 1 0v .5h.5a.5.5 0 0 1 .5.5zm1.5 1.5a.5.5 0 1 0 .5.5.5.5 0 0 0 -.5-.5zm16-20h-.5v-.5a.5.5 0 0 0 -1 0v .5h-.5a.5.5 0 0 0 0 1h .5v.5a.5.5 0 0 0 1 0v-.5h.5a.5.5 0 0 0 0-1zm-2.58 4.87a13.41 13.41 0 0 1 -6.76-3.2.37.37 0 0 0 -.63.26l.08 16.22a.38.38 0 0 0 .55.32 11.98 11.98 0 0 0 7.07-13.31.37.37 0 0 0 -.31-.3z"></path><path d="m14.39 8.32a1.93 1.93 0 0 0 -3.66 0l-2.42 4.85a3.09 3.09 0 0 0 -.4 1.61 2.36 2.36 0 0 0 2.23 2.23 3.95 3.95 0 0 0 2.42-1.06 3.95 3.95 0 0 0 2.42 1.06 2.36 2.36 0 0 0 2.23-2.23 3.09 3.09 0 0 0 -.4-1.61zm-2.72 4.38c0-.05.01-1.23.89-1.23s.88 1.18.88 1.23a3.25 3.25 0 0 1 -.88 1.83 3.25 3.25 0 0 1 -.89-1.83zm3.31 3.31a2.92 2.92 0 0 1 -1.71-.77 4.3 4.3 0 0 0 1.17-2.54 2.02 2.02 0 0 0 -1.8-2.22l-.08-.01a2.02 2.02 0 0 0 -1.89 2.15l.01.08a4.29 4.29 0 0 0 1.17 2.54 2.92 2.92 0 0 1 -1.71.77 1.36 1.36 0 0 1 -1.23-1.23 2.13 2.13 0 0 1 .29-1.16l2.42-4.85c.33-.65.55-.76.94-.76s.61.11.94.76l2.42 4.85a2.13 2.13 0 0 1 .29 1.16 1.36 1.36 0 0 1 -1.23 1.23zm7.01-10.35a.5.5 0 0 0 -.43-.4 13.03 13.03 0 0 1 -8.68-4.57.52.52 0 0 0 -.77 0 13.03 13.03 0 0 1 -8.68 4.57.5.5 0 0 0 -.43.4c-1.58 8.19 1.55 14.02 9.3 17.31a.5.5 0 0 0 .39 0c7.75-3.29 10.87-9.11 9.3-17.31zm-9.49 16.3c-7.1-3.09-9.91-8.25-8.57-15.76a13.98 13.98 0 0 0 8.57-4.43 13.98 13.98 0 0 0 8.57 4.43c1.33 7.51-1.48 12.67-8.57 15.76z"fill="#484848"></path></svg>
          <h3 className="text-3xl">Giữ tài khoản của bạn an toàn</h3>
          <p>
            Chỉ trả lời các yêu cầu từ những người bạn biết. Tin tặc có thể muốn
            truy cập vào tài khoản của bạn bằng cách bắt chước email của thành
            viên trong nhóm.
          </p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-gray-600 mt-16 mb-16">Account</h1>
        <div className="flex justify-between">
          <p className="text-3xl">Khóa tài khoản của bạn</p>
          <button className="text-red-600 hover:underline hover:text-[#008489]">
            Vô hiệu hóa
          </button>
        </div>
        <hr />
      </div>
    </>
  );
};

const SharedAccess = () => {
  return (
    <div className="lg:flex lg:justify-between">
      <div className="lg:w-[55%] mt-10">
        <h1 className="font-bold mb-6">Quyền truy cập được chia sẻ</h1>
        <p>
          Xem xét cẩn thận từng yêu cầu trước khi phê duyệt quyền truy cập.
          Chúng tôi sẽ gửi email cho nhân viên hoặc đồng nghiệp của bạn mã gồm 4
          chữ số cho phép họ đăng nhập vào tài khoản của bạn bằng thiết bị đáng
          tin cậy của họ.
        </p>
      </div>
      <div className="flex flex-col gap-3 lg:w-[35%] p-5 border border-gray-700 rounded-2xl">
        <svg
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-[48px] w-[48px] fill-[#E31C5F] stroke-current"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <g>
            <g stroke="none">
              <path
                d="M27 5l.585.005c4.29.076 8.837.984 13.645 2.737l.77.288V35.4l-.008.13a1 1 0 0 1-.47.724l-.116.06L27 42.716V25a1 1 0 0 0-.883-.993L26 24H12V8.029l.77-.286c4.797-1.75 9.336-2.658 13.62-2.737L27 5z"
                fill-opacity=".2"
              ></path>
              <path d="M27 1c5.599 0 11.518 1.275 17.755 3.816a2 2 0 0 1 1.239 1.691L46 6.67V35.4a5 5 0 0 1-2.764 4.472l-.205.097-15.594 6.93L27 47l-2.461-1h2.451a.01.01 0 0 0 .007-.003L27 45.99v-1.085l15.218-6.763a3 3 0 0 0 1.757-2.351l.019-.194.006-.196V6.669l-.692-.278C37.557 4.128 32.121 3 27 3S16.443 4.128 10.692 6.391L10 6.67 9.999 24H8V6.669a2 2 0 0 1 1.098-1.786l.147-.067C15.483 2.275 21.401 1 27 1z"></path>
            </g>
            <g fill="none" stroke-width="2">
              <path d="M4 24h22a1 1 0 0 1 1 1v20.99a.01.01 0 0 1-.01.01H4a1 1 0 0 1-1-1V25a1 1 0 0 1 1-1z"></path>
              <path d="M21 25v-5a6 6 0 1 0-12 0v5"></path>
              <circle cx="15" cy="35" r="2"></circle>
            </g>
          </g>
        </svg>
        <h3>Thêm thiết bị từ những người bạn tin tưởng</h3>
        <p>
          Khi bạn phê duyệt một yêu cầu, bạn cấp cho ai đó quyền truy cập đầy đủ
          vào tài khoản của bạn. Họ sẽ có thể thay đổi việc đặt chỗ và gửi tin
          nhắn thay mặt bạn.
        </p>
      </div>
    </div>
  );
};

const Infor = ({ title, value, button, toggleBtn }) => {
  return (
    <div className="flex justify-between my-8">
      <div>
        <p className="text-[1.7rem] text-gray-700 font-medium p-0 m-0">
          {title}
        </p>
        <p className="text-gray-500">{value}</p>
      </div>
      <button onClick={toggleBtn} className="font-medium text-[1.7rem] ml-3 text-[#008489]">
        {button}
      </button>
    </div>
  );
};

const DeviceHistory = ({ title, value, button }) => {
  return (
    <div className="flex justify-between my-8">
      <div className="flex gap-4">
      <svg viewBox="0 0 24 24" role="img" aria-hidden="false" aria-label="Desktop device" focusable="false" className="h-[30px] w-[30px] block"><path d="m22.5 2h-21c-.8271484 0-1.5.6728516-1.5 1.5v14c0 .8271484.6728516 1.5 1.5 1.5h8.5v3h-5.5c-.2763672 0-.5.2236328-.5.5s.2236328.5.5.5h15c.2763672 0 .5-.2236328.5-.5s-.2236328-.5-.5-.5h-5.5v-3h8.5c.8271484 0 1.5-.6728516 1.5-1.5v-14c0-.8271484-.6728516-1.5-1.5-1.5zm-21 1h21c.2753906 0 .5.2241211.5.5v11.5h-22v-11.5c0-.2758789.2241211-.5.5-.5zm11.5 19h-2v-3h2zm9.5-4h-21c-.2758789 0-.5-.2246094-.5-.5v-1.5h22v1.5c0 .2753906-.2246094.5-.5.5z"></path></svg>
      <div>
        <p className="text-[1.7rem] text-gray-700 font-medium p-0 m-0">
          {title}
        </p>
        <p className="text-gray-500">{value}</p>
      </div>
      </div>
      <button className="font-medium text-[1.7rem] ml-3 text-[#008489]">
        {button}
      </button>
    </div>
  );
};
