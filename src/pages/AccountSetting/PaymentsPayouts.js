import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import CommonHeader from "../../components/header/CommonHeader";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Header from "../../components/header/Header";

export default function PaymentsPayouts({ title }) {
  var [currentActive, setCurrentActive] = useState(0);

  return (
    <>
    <CommonHeader/>
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
        <div className='flex gap-3 font-medium'>
          <NavLink to="/account-settings/payments/payment-methods" className="bg-transparent" onClick={() => setCurrentActive(0)}>
            <div className={currentActive==0?"text-black px-3 border-b-[3px] border-black mb-0"
              :"text-gray-500 hover:bg-gray-100 px-3 rounded-lg mb-0"}>
              <p className="hover:bg-gray-100 hover:rounded-lg p-2">Thanh toán</p>
            </div>
          </NavLink>
          <NavLink to="/account-settings/payments/payout-methods" className="bg-transparent" onClick={() => setCurrentActive(1)}>
            <div className={currentActive==1?"text-black px-3 border-b-[3px] border-black mb-0"
            :"text-gray-500 hover:bg-gray-100 px-3 rounded-lg mb-0"}>
            <p className="hover:bg-gray-100 hover:rounded-lg p-2">Hoàn tiền</p>
            </div>
          </NavLink>
          </div>
          <hr className="m-0 p-0" />
        </div>
        {currentActive == 0 ? <Payments /> : <Payouts />}
      </div>
      <Footer />
    </>
  );
}

const Payments = () => {
  return (
    <>
      <div className="lg:flex justify-between">
        <div className="lg:w-[55%] my-14">
          <div className="">
            <h1>Thanh toán của bạn</h1>
            <p>
              Theo dõi tất cả các khoản thanh toán và hoàn lại tiền của bạn.
            </p>
            <button className="px-[2rem] py-[1.2rem] my-8 bg-black rounded-xl text-white font-bold">
              Quản lý thanh toán
            </button>
          </div>
          <div className="my-10">
            <h1>Phương thức thanh toán</h1>
            <p className="text-gray-600">
              Thêm phương thức thanh toán bằng hệ thống thanh toán an toàn của
              chúng tôi, sau đó bắt đầu lên kế hoạch cho chuyến đi tiếp theo của
              bạn.
            </p>
          </div>
          <hr />
          <button className="px-[2rem] py-[1.2rem] my-8 bg-black rounded-xl text-white font-bold">
            Thêm phương thức thanh toán
          </button>
          <div className="my-20">
            <h1>Tín dụng quà tặng Stayeasy</h1>
            <button className="px-[2rem] py-[1.2rem] my-8 bg-black rounded-xl text-white font-bold">
              Thêm thẻ quà tặng
            </button>
          </div>
          <div>
            <h1>Phiếu giảm giá</h1>
            <hr />
            <div className="flex justify-between mt-5">
              <p>Phiếu giảm giá của bạn</p>
              <p>0</p>
            </div>
            <hr />
            <button className="px-[2rem] py-[1.2rem] my-8 bg-black rounded-xl text-white font-bold">
              Thêm mã
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:w-[35%] h-fit p-5 border border-gray-700 rounded-lg">
          <svg
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="block h-[48px] w-[48px] fill-[#E31C5F] stroke-current"
          >
            <g>
              <g stroke="none">
                <path
                  d="m41.999 10v24h-4.287l1.01-.6546823c.242375-.158375.3706719-.3933125.3998895-.6646172l.0064994-.1183828c.004513-1.4230639-2.4648559-3.6737529-5.4115565-1.9238459l-.1928324.1198459-5.278 3.2416823-2.2539866.0005578c.1712874-1.0118843-.1666572-1.9090959-.8837185-1.9909612l-.1084949-.0060789-19.0018-.0005177.001-22.003z"
                  fill-opacity=".2"
                ></path>
                <path d="m44 6c1.0543618 0 1.9181651.81587779 1.9945143 1.85073766l.0054857.14926234v28c0 1.0543618-.8158778 1.9181651-1.8507377 1.9945143l-.1492623.0054857h-12.446l3.079-2h9.367v-28h-40v24.0033177c-.51283584 0-.93550716.3860402-.99327227.8833788l-.00672773.1166212-.00007248 4.729076c-.55177975-.3192182-.93689844-.8944853-.9928825-1.5633277l-.00704502-.169066v-28c0-1.0543618.81587779-1.91816512 1.85073766-1.99451426l.14926234-.00548574zm-20 9c3.8659932 0 7 3.1340068 7 7s-3.1340068 7-7 7-7-3.1340068-7-7 3.1340068-7 7-7zm0 2c-2.7614237 0-5 2.2385763-5 5s2.2385763 5 5 5 5-2.2385763 5-5-2.2385763-5-5-5zm-15-5c.55228475 0 1 .4477153 1 1s-.44771525 1-1 1-1-.4477153-1-1 .44771525-1 1-1z"></path>
              </g>
              <g fill="none" stroke-width="2">
                <path d="m24.9998 32.0035177c1.3716282 0 1.5099129 2.8120004-.3683588 4.2183752l8.8925588-5.4635752c3.031-1.968 5.609.35 5.6043889 1.804-.0013889.321-.1293889.602-.4063889.783l-17.2344901 11.1920163c-.947203.6151103-2.110299.8011277-3.2021.5121216l-14.54130246-3.8491683c-.43862489-.1161066-.74410744-.5129735-.74410744-.9667052v-7.2302644c0-.5522848.44771525-1 1-1z"></path>
                <path d="m13.9998 37.0035177h8.051c1.2682235 0 2.2021119-.4127594 2.8457108-1.0010914"></path>
              </g>
            </g>
          </svg>
          <h3 className="text-2xl">
            Thực hiện tất cả các khoản thanh toán thông qua Airbnb
          </h3>
          <p className="text-2xl">
            Luôn thanh toán và liên lạc qua Airbnb để đảm bảo bạn được bảo vệ
            theo Điều khoản dịch vụ, Điều khoản dịch vụ thanh toán, việc hủy và
            các biện pháp bảo vệ khác của chúng tôi. Tìm hiểu thêm
            <span className="font-normal text-gray-500 text-[1.7rem]">
              Thấp
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

const Payouts = () => {
  return (
    <>
      <div className="lg:flex lg:justify-between lg:mb-24">
        <div className="lg:w-[55%] my-14">
          <div className="">
            <h1>Bạn sẽ được thanh toán bằng cách nào</h1>
            <p>
              Thêm ít nhất một phương thức thanh toán để chúng tôi biết nơi gửi
              tiền của bạn.
            </p>
            <button className="px-[2rem] py-[1.2rem] my-8 bg-black rounded-xl text-white font-bold">
              Thiết lập các khoản thanh toán
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:w-[35%] h-fit p-5 border border-gray-700 rounded-lg">
          <h3 className="text-3xl font-bold">Need help?</h3>
          <button>
            <div className="flex justify-between items-center text-start gap-5">
              <p className="underline font-medium">
                Khi nào bạn sẽ nhận được khoản thanh toán của mình
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="14"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </div>
          </button>
          <button>
            <div className="flex justify-between items-center text-start gap-5">
              <p className="underline font-medium">
                Cách thức thanh toán hoạt động
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </div>
          </button>
          <button>
            <div className="flex justify-between items-center text-start gap-5">
              <p className="underline font-medium">
                Đi tới lịch sử giao dịch của bạn
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
