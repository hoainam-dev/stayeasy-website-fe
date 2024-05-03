import React, { useState } from 'react'
import CommonHeader from '../components/header/CommonHeader'
import Footer from '../components/footer/Footer'
import { da } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export default function Trip() {
    const [detailTrip, setDetailTrip] = useState(0);

    const cardData = [
        {img: ["https://s.net.vn/EfLi","https://s.net.vn/EY4G","https://s.net.vn/DZWM"], 
        title: "Nhà Quận 1", des: "Chúng tôi cho thuê 1 phòng ngủ trong căn hộ rộng rãi",
        checkin: {time: "11:00 AM", date: "Thứ 6", day: 17, month: "3", year: "2023"}, 
        checkout: {time: "11:00 AM", date: "Thứ 7", day: 18, month: "3", day: 18, year: "2023"},
        address: {street: "207 Bùi Viện", city: "Quận 1, Thành phố Hồ Chí Minh", country: "Việt Nam"}, index: 1},

        {img: ["https://s.net.vn/cWSu","https://s.net.vn/roLh","https://s.net.vn/wEDb","https://s.net.vn/HZzE"], 
        title: "Nhà Quận 1", des: "Chúng tôi cho thuê 1 phòng ngủ trong căn hộ rộng rãi",
        checkin: {time: "11:00 AM", date: "Thứ 6", day: 17, month: "3", year: "2023"}, 
        checkout: {time: "11:00 AM", date: "Thứ 7", day: 24, month: "3", year: "2023"},
        address: {street: "207 Bùi Viện", city: "Quận 1, Thành phố Hồ Chí Minh", country: "Việt Nam"}, index: 2},

        {img: ["https://s.net.vn/CC7n","https://s.net.vn/rAlo","https://s.net.vn/9SW5"], title: "Nhà Quận 1", des: "Chúng tôi cho thuê 1 phòng ngủ trong căn hộ rộng rãi",
        checkin: {time: "11:00 AM", date: "Thứ 6", day: 15, month: "3", year: "2023"}, 
        checkout: {time: "11:00 AM", date: "Thứ ", day: 30, month: "3", year: "2023"},
        address: {street: "207 Bùi Viện", city: "Quận 1, Thành phố Hồ Chí Minh", country: "Việt Nam"}, index: 3},

        {img: ["https://s.net.vn/CC7n","https://s.net.vn/rAlo","https://s.net.vn/9SW5"], title: "Nhà Quận 1", des: "Chúng tôi cho thuê 1 phòng ngủ trong căn hộ rộng rãi",
        checkin: {time: "11:00 AM", date: "Thứ 6", day: 15, month: "3", year: "2023"}, 
        checkout: {time: "11:00 AM", date: "Thứ 7", day: 20, month: "3", year: "2023"},
        address: {street: "207 Bùi Viện", city: "Quận 1, Thành phố Hồ Chí Minh", country: "Việt Nam"}, index: 3},
    ];

    const openDetailTrip = (index) => {
        setDetailTrip(index);
    };
    
  return (
    <>
        <CommonHeader />
        <div className='mt-32 py-16 max-[768px]:mt-10 min-[768px]:px-[12rem] max-[768px]:px-[6rem] max-[425px]:px-[3rem]'>
            {/* title */}
            <h1 className='text-5xl font-medium mb-16'>Chuyến đi</h1>
            <h3 className='text-4xl font-medium  mb-10'>Đặt chỗ sắp tới</h3>

            {/* grid area */}
            <div className='flex flex-wrap gap-10'>
                {/* card */}
                {cardData.map((e, i) => {
                    return(
                        <>
                            <button onClick={()=>{openDetailTrip(e.index);}} key={i} className='w-[31.8%] max-[1062px]:w-[100%] h-full shadow-lg rounded-xl'>
                                <div className='relative bg-white'>
                                    <img src={e.img[0]} className='w-full h-[16rem] object-cover rounded-t-xl'/>
                                    <div className='absolute top-2 left-2 p-2 bg-white text-xl rounded-lg'>
                                        {e.checkout.day - e.checkin.day>=7?Math.round((e.checkout.day - e.checkin.day)/7):e.checkout.day - e.checkin.day} 
                                        {e.checkout.day - e.checkin.day>=7?" Tuần":" Ngày"}</div>
                                </div>
                                <div className='text-start p-4'>
                                    <h2 className='line-clamp-1 py-1'>{e.title}</h2>
                                    <p className='text-xl line-clamp-1'>{e.des}</p>
                                    <hr/>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='text-start w-[25%] px-4'>
                                        <p className='text-3xl line-clamp-1'>Tháng {e.checkin.month}</p>
                                        <p className='text-3xl line-clamp-1'>{e.checkin.day}</p>
                                        <p className='text-2xl line-clamp-1'>{e.checkin.year}</p>
                                    </div>
                                    <div className='text-start w-[70%] border-l-2 pl-8 pr-4 mb-4'>
                                        <p className='text-3xl line-clamp-1'>{e.address.street}</p>
                                        <p className='text-3xl line-clamp-2'>{e.address.city}</p>
                                        <p className='text-2xl line-clamp-1'>{e.address.country}</p>
                                    </div>
                                </div>
                            </button>
                        </>
                    );
                })}
            </div>
            {detailTrip!=0?
                <TripDetail data={cardData[detailTrip-1]} toggleClose={()=>{setDetailTrip(0);}}/>
            :null}
            {/* title session 2 */} 
            <h3 className='text-4xl font-medium my-10'>khám phá địa điểm gần</h3>

            <p>không thể tìm thấy đặt phòng của bạn ở đây? <span className='font-medium underline'> Đến trung tâm hỗ trợ</span></p>
        </div>
        <Footer />
    </>
  )
}

// popup detail trip
const TripDetail = ({ data, toggleClose }) => {

    const dataButton = [
        {icon: <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>,
        title: "Manage guests"},
        {icon: <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>,
        title: "Change reservation"},
        {icon: <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>,
        title: "Cancel reservation"},
        {icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" className="block h-6 w-6"><path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z"></path></svg>,
        title: "Get a PDF for visa purposes"},
        {icon: <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>,
        title: "Add to wallet"},
        {icon: <svg xmlns="http://www.w3.org/2000/svg" height="14" width="10.5" viewBox="0 0 384 512"><path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"/></svg>,
        title: "Get receipt"},
    ]

    const itemsPerSlide = 1;
    const itemsToMove = 1;

    // session1 index
    const [currentIndex, setCurrentIndex] = useState(0);
    const isAtStart = currentIndex === 0;
    const isAtEnd = currentIndex >= data.img.length - itemsPerSlide;
    

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerSlide, 0))
    };
    
    const goToNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsToMove, data.img.length - itemsPerSlide + 1));
    };
    return (
        <>
            <div className="fixed top-0 inset-0 flex items-center justify-center z-[1000]">
            {/* close modal when click out of modal area */}
            <div className="absolute inset-0 bg-gray-500 opacity-50 m-0 p-0" onClick={toggleClose}></div>
                <div className="mx-[25rem] bg-white overflow-scroll rounded-xl z-[1000] h-[65rem]">
                {/* slide */}
                    <div className="relative overflow-hidden">
                        {/* img */}
                        <div className='flex transition-transform duration-700 ease-in-out' style={{ width: `${100 * (data.img.length / itemsPerSlide)}%`, transform: `translateX(-${(100 / data.img.length) * currentIndex}%)` }}>
                            {data.img.map((image, index) => (
                                <button className="text-start w-full" key={index}>
                                    <img src={image} alt="Header" className="w-full h-[35rem] object-cover rounded-b-2xl" />
                                </button>
                            ))}
                        </div>
                        {/* button close popup */}
                        <div className='absolute top-5 right-10'>
                            <button onClick={toggleClose} className={`flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-white rounded-full text-black cursor-pointer`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="10.5" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                            </button>
                        </div>
                        {/* button share */}
                        <div className='absolute top-5 left-10'>
                            <button onClick={toggleClose} className={`flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-white rounded-full text-black cursor-pointer`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg>
                            </button>
                        </div>
                        {/* button go to previous */}
                        <div className='absolute top-[50%] left-10'>
                            <button onClick={goToPrevious} className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] bg-gray-500 rounded-full text-black cursor-pointer ${isAtStart ? "opacity-30 cursor-not-allowed" : ""}`} disabled={isAtStart}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="8.75" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
                            </button>
                        </div>
                        {/* button go to next */}
                        <div className='absolute top-[50%] right-10'>
                            <button onClick={goToNext} className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] bg-gray-500 rounded-full text-black cursor-pointer ${isAtEnd ? "opacity-30 cursor-not-allowed" : ""}`} disabled={isAtEnd}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="8.75" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                            </button>
                        </div>
                    </div>
                {/* session 1 */}
                    <div className='px-10 py-10 flex justify-between items-center'>
                        {/* Left content */}
                        <div className='w-[60%] pr-24'>
                            {/* line 1 */}
                            <div className='flex items-center gap-6 mt-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className='block h-[24px] w-[24px] mb-3' fill='current'><path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path></svg>
                                <div>
                                    <h4>Great location</h4>
                                    <p>100% of recent guests gave the location a 5-star rating.</p>
                                </div>
                            </div>
                            <hr/>
                            {/* line 2 */}
                            <div className='flex items-center gap-6 mt-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className='block h-[24px] w-[24px] mb-3' fill='current'><path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"></path></svg>
                                <div>
                                    <h4>Great location</h4>
                                    <p>Check yourself in with the lockbox.</p>
                                </div>
                            </div>
                            <hr/>
                            {/* line 3 */}
                            <div className='flex items-center gap-6 mt-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className='block h-[24px] w-[24px] mb-3' fill='current'><path d="M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z"></path></svg>
                            <div>
                                    <h4>Great location</h4>
                                    <p>100% of recent guests gave the location a 5-star rating.</p>
                                </div>
                            </div>
                        </div>
                        {/* Right content */}
                        <div className='w-[40%] py-10 border-l-2 bg-gray-100 shadow-md rounded-xl'>
                            <div className='flex gap-10 justify-evenly items-center'>
                                <div>
                                    <p className='font-medium'>Check-in</p>
                                    <p className='font-medium text-3xl'>{data.checkin.date}, {data.checkin.day}/{data.checkin.month}</p>
                                    <p className=''>{data.checkin.time}</p>
                                </div>
                                <div>
                                    <p className='font-medium'>Checkout</p>
                                    <p className='font-medium text-3xl'>{data.checkout.date}, {data.checkout.day}/{data.checkout.month}</p>
                                    <p className=''>{data.checkout.time}</p>
                                </div>
                            </div>
                            <div className='w-full text-center mt-12'>
                                <button className='bg-[#FF385C] shadow-xl py-3 px-5 rounded-xl text-3xl font-medium'>HỦY ĐẶT</button>
                            </div>
                        </div>
                    </div>

                {/* session 2 */}
                    <div className='py-5 px-10'>
                        <h2 className='text-4xl font-medium'>Chi tiết đặt</h2>
                        {/* detail */} 
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='w-[5rem] h-[5rem] rounded-full'>
                                <img src='https://s.net.vn/rZgB' className='h-full w-full rounded-full object-cover'/>
                            </div>
                            <div className='mt-3'>
                                <h3>Who's comming</h3>
                                <p>1 guest</p>
                            </div>
                        </div>
                        <hr/>
                        {/* code area */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>Mã đặt phòng</h3>
                                <p className='bg-gray-100 px-4'>10D51A9D-86EA-4D9E-AB05-5A8CBBB84842</p>
                            </div>
                        </div>
                        <hr/>

                        {/* cancel area */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>Chính sách hủy đặt</h3>
                                <p className=''>Free cancellation before 1:00 PM on Feb 12. After that, the reservation is non-refundable.</p>
                                <Link><p className="underline font-medium">Read more</p></Link>
                            </div>
                        </div>
                        <hr/>
                        {/* Policy area */}
                        <div className='flex gap-4 items-center mt-5'>
                            <p>Your booking is protected by <span className='text-[#FF385C] font-medium'>air</span><span className='text-black font-medium'>cover </span><span className="underline font-medium"><Link>  Learn more</Link></span></p>
                        </div>
                        <hr/>

                        {/* list button area */}
                        {dataButton.map((e, i) => {
                            return(
                                <>
                                    <IconButton icon={e.icon} title={e.title}/>
                                    <hr/>
                                </>
                            );
                        })}
                    </div>

                {/* session 3 */}
                    <div className='py-5 px-10'>
                        <h2 className='text-4xl font-medium'>Checking in & out</h2>

                        {/* checkin method */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>Check-in method</h3>
                                <p>Keypad</p>
                            </div>
                        </div>
                        <hr/>

                        {/* get inside */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>How to get inside</h3>
                                <p>You'll find instructions to get inside here 48 hours before check in</p>
                            </div>
                        </div>
                        <hr/>
                    </div>

                {/* session 4 */}
                    <div className='py-5 px-10'>
                        <h2 className='text-4xl font-medium'>Where you're staying</h2>
                        {/* checkin method */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>House rules</h3>
                                <p>6 guests maximum</p>
                                <p>No pet</p>
                                <p>Self check-in with Keypad</p>
                                <Link><p className="underline font-medium">Show more</p></Link>
                            </div>
                        </div>
                        <hr/>
                    </div>

                {/* session 5 */}
                    <div className='py-5 px-10'>
                        <h2 className='text-4xl font-medium'>Hosted by Stay & Fun</h2>
                        {/* About your host method */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>About your host</h3>
                                <p>6 guests maximum</p>
                                <Link><p className="underline font-medium">Show more</p></Link>
                            </div>
                        </div>
                        <hr/>

                        {/* Co-hosts */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>Co-hosts</h3>
                                <p>Loc, Minh</p>
                                <Link><p className="underline font-medium">Show more</p></Link>
                            </div>
                        </div>
                        <hr/>

                        {/* call host */}
                        <IconButton icon={<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z"/></svg>} 
                                    title="Call host"/>
                        <hr/>
                    </div>

                {/* session 6 */}
                    <div className='py-5 px-10'>
                        <h2 className='text-4xl font-medium'>Payment info</h2>
                        {/* About your host method */}
                        <div className='flex gap-4 items-center'>
                            <div className='mt-3'>
                                <h3>toltal cost</h3>
                                <p>$74.63 USD</p>
                            </div>
                        </div>
                        <hr/>

                        {/* Add detail for expensing your trip */}
                        <IconButton icon={<svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192zM224 248c13.3 0 24 10.7 24 24v56h56c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V376H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h56V272c0-13.3 10.7-24 24-24z"/></svg>} 
                                    title="Add detail for expensing your trip"/>
                        <hr/>

                        {/* call host */}
                        <IconButton icon={<svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"/></svg>} 
                                    title="Get recript"/>
                        <hr/>
                    </div>

                {/* session 7 */}
                    <div className='py-5 px-10'>
                        <h2 className='text-4xl font-medium'>Get support anytime</h2>
                        <p>If you need help, we're availiable 24/7 from anywhere in the world</p>

                        {/* Contact Airbnb support */}
                        <IconButton icon={<svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192zM224 248c13.3 0 24 10.7 24 24v56h56c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V376H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h56V272c0-13.3 10.7-24 24-24z"/></svg>} 
                                    title="Contact Airbnb support"/>
                        <hr/>

                        {/* call host */}
                        <IconButton icon={<svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"/></svg>} 
                                    title="Visit the Help Center"/>
                        <hr/>
                    </div>
                </div>
            </div>
        </>
    )
};

const IconButton = ({icon, title, toogleBtn}) => {
    return(
        <button onClick={toogleBtn} className='flex justify-between items-center w-full pr-14'>
            <div className='flex items-center gap-3'>
                {icon}
                <p className='mt-3'>{title}</p>  
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
        </button>
    );
};