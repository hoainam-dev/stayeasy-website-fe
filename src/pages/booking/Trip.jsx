import React, { useState, useEffect, useContext } from 'react'
import CommonHeader from '../../components/header/CommonHeader'
import Footer from "../../components/footer/Footer"
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from 'react-router-dom';
import axios from "axios";
import { UserContext } from "../../components/UserContext";
import TicketMenu from "./TicketMenu"
import { now } from 'moment/moment';
import Feedback from '../../components/feedback/Feedback';
import { Alert } from "../../components/Alert/Alert";
import { CallEnd } from '@mui/icons-material';
export default function Trip() {
    const [detailTrip, setDetailTrip] = useState(0);
    const [listBoking, setListBooking] = useState([]);
    const [dataCard, setDataCard] = useState([]);
    const [activeMenu, setActiveMenu] = useState('IN_PROGRESS');
    const user = useContext(UserContext).user;
    const userId = user?.id;
    useEffect(() => {
        if (!userId) return;
        axios
            .get(`http://localhost:8080/api/v1/stayeasy/booking/traveler/${userId}`)
            .then((response) => {
                const filteredData = response.data.filter(item => {
                    if ( item.confirmation === activeMenu && item.status === true) {
                        return true; // Trả về true để giữ lại phần tử thỏa mãn điều kiện
                    } else if (activeMenu === "REJECTED" && item.confirmation === activeMenu &&  item.cancel !== true) {
                        return true; // Trả về true để giữ lại phần tử có confirmation khớp với activeMenu // vé đã hủy 
                    } else {
                        return false; // Trả về false để loại bỏ các phần tử không thỏa mãn điều kiện
                    }
                });
                const convertedData = filteredData.map((cardData, index) => {
                    // Lấy từng giá trị riêng lẻ cho ngày, tháng, năm, giờ checkout
                    const checkInDate = new Date(cardData.checkIn);
                    const checkOutDate = new Date(cardData.checkOut);
                    const checkoutTime = cardData.checkOut.time ? cardData.checkOut.time : "12:00";
                    const checkinTime = cardData.checkIn.time ? cardData.checkIn.time : "07:00";
                    const checkoutDayOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][checkOutDate.getDay()];
                    const checkinDayOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][checkInDate.getDay()];
                    return {
                        idBooking: cardData.bookingId,
                        userId: cardData.userId,
                        propertyId: cardData.propertyId,
                        total: cardData.total,
                        cleanFee: cardData.propertyDTOS.serviceFee,
                        bnbFee : cardData.propertyDTOS.discount,
                        status: cardData.status,
                        comfirm: cardData.confirmation,
                        numGuest: cardData.numOfGuest,
                        guestName: cardData.userDTOS.lastName + "  " + cardData.userDTOS.firstName,
                        avatar: cardData.userDTOS.avatar ? cardData.userDTOS.avatar : "https://cdn-icons-png.flaticon.com/512/5968/5968596.png",
                        img: cardData.propertyDTOS.imagesList.map(image => image.url),
                        title: cardData.propertyDTOS.propertyName,
                        des: cardData.propertyDTOS.description,
                        checkInDate: new Date(cardData.checkIn),
                        checkin: {
                            time: checkinTime,
                            date: checkinDayOfWeek,
                            day: checkInDate.getDate(),
                            month: checkInDate.getMonth(),
                            year: checkInDate.getFullYear()
                        },
                        checkout: {
                            time: checkoutTime,
                            date: checkoutDayOfWeek,
                            day: checkOutDate.getDate(),
                            month: checkOutDate.getMonth(),
                            year: checkOutDate.getFullYear()
                        },
                        address: {
                            street: cardData.propertyDTOS.address,
                            city: "",
                            country: "Việt Nam"
                        },
                        index: index + 1
                    }
                },);
                setListBooking(filteredData);
                setDataCard(convertedData);
               
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId, activeMenu]);

    const openDetailTrip = (index) => {
        setDetailTrip(index);
    };
    const handleSetActiveMenu = (value) => {
        setActiveMenu(value);
    };


    return (
        <>
            <CommonHeader />
            <div className='mt-32 py-16 max-[768px]:mt-10 min-[768px]:px-[12rem] max-[768px]:px-[6rem] max-[425px]:px-[3rem]'>
                {/* title */}
                <h1 className='text-5xl font-medium mb-16'>Chuyến đi</h1>
                <div className="flex flex-col items-center justify-center pb-16">
                    <div className="text-center">
                        <TicketMenu activeMenu={activeMenu} setActiveMenu={handleSetActiveMenu} />
                    </div>
                </div>
                {/* grid area */}
                <div className='flex flex-wrap gap-10'>
                    {/* card */}
                    {dataCard.map((e, i) => {
                        return (
                            <>
                                <button onClick={() => { openDetailTrip(e.index); }} key={i} className='w-[31.8%] max-[1062px]:w-[100%] h-full shadow-lg rounded-xl'>
                                    <div className='relative bg-white'>
                                        <img src={e.img[0]} className='w-full h-[16rem] object-cover rounded-t-xl' />
                                        <div className='absolute top-2 left-2 p-2 bg-white text-xl rounded-lg'>
                                            {e.checkout.day - e.checkin.day >= 7 ? Math.round((e.checkout.day - e.checkin.day) / 7) : e.checkout.day - e.checkin.day}
                                            {e.checkout.day - e.checkin.day >= 7 ? " Tuần" : " Ngày"}</div>
                                    </div>
                                    <div className='text-start p-4'>
                                        <h2 className='line-clamp-1 py-1'>{e.title}</h2>
                                        <p className='text-xl line-clamp-1'>{e.des}</p>
                                        <hr />
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
                {detailTrip != 0 ?
                    <TripDetail userId={userId} data={dataCard[detailTrip - 1]} toggleClose={() => {
                        setDetailTrip(0);
                    }} />

                    : null}
                {/* title session 2 */}
                <h3 className='text-4xl font-medium my-10'>khám phá địa điểm gần</h3>

                <p>không thể tìm thấy đặt phòng của bạn ở đây? <span className='font-medium underline'> Đến trung tâm hỗ trợ</span></p>
            </div>
            <Footer />
        </>
    )
}

// popup detail trip
const TripDetail = ({ userId,data, toggleClose }) => {
    const [cancellationReasons, setCancellationReasons] = useState({
        cannotArrive: false,
        changePlans: false,
        other: false,
    });
    console.log(data.comfirm);
    const urlRefund = 'http://localhost:8080/api/v1/stayeasy/payment/refund';
    const [dataRefund, setDataRefund] = useState([]);
    const [showCancellationCard, setShowCancellationCard] = useState(false);
    const [showMessage, setMessage] = useState('');
    const [refundAmount, setRefundAmount] = useState();
    const [messageReponse, setmessageReponse] = useState('');
    const [isOpen , setIsOpen] = useState(false);
    const [load , setLoad] = useState(false);
    const handCheckout = (id) => {
        // Gọi phương thức POST của Axios
        axios.post(`http://localhost:8080/api/v1/stayeasy/payment/performPayout/${id}`)
            .then(response => {
                setLoad(true);
                // Xử lý kết quả trả về nếu cần
                Alert(2000, 'Trả phòng trong ngày', 'Trả phòng thành công', 'succsess', 'OK');
                window.location.reload();
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Error:', error);
                Alert(2000, 'Trả phòng trong ngày', 'Chúng tôi đã ghi nhận thông tin của bạn và đang chờ xử lí', 'warning', 'OK');
            
            }
            );
           
    };
    const handleCancel = (data, status) => {
        setShowCancellationCard(status);
        const checkDateCancel = differenceInCalendarDays(new Date(data.checkInDate), new Date());
        let refundPercentage = 0;
    
        if (checkDateCancel >= 5) {
            refundPercentage = 1 *data.total ; // Hoàn 100%
            setMessage('Hoàn trả 100% cho booking của bạn')
        } else if (checkDateCancel >= 3) {
            refundPercentage = data.total - ((data.total * data.bnbFee/100)/2) ; // Hoàn 50%
            setMessage('Hoàn trả 100% cho booking của bạn, khấu trừ 50% phí dịch vụ ariBnb')
        } else if (checkDateCancel <= 2 && checkDateCancel > 1) {
            refundPercentage = (data.total* 70/100) - (data.total* (data.bnbFee/200)) ; // Hoàn 50% // Hoàn 70%
            setMessage('Hoàn trả 70% booking của bạn')
        } else if (checkDateCancel <= 1) {
            refundPercentage = data.total * data.cleanFee/100; // Không hoàn tiền, chỉ hoàn phí dọn dẹp nếu có
            setMessage('Nếu bạn hủy vé, chúng tôi chỉ có thể gửi lại bạn phí dọn dẹp (nếu có)')
        }
        setRefundAmount(refundPercentage.toFixed(2)); // Cập nhật số tiền hoàn trả
    };
    const submitCancel = (data) => {
        const refundDTO = {
            invoiceId: data.idBooking,
            noteToPayer: generateNoteToPayer() ? generateNoteToPayer() : 'Hủy booking',
            refundAmount: refundAmount,
        };
        // Gọi hàm/API để xử lý việc hoàn tiền với refundDTO
        setDataRefund(refundDTO);
        postData(urlRefund, refundDTO)
    }
    const cancelRefund = () => {
        setShowCancellationCard(false);
    }
   
    // Function để gửi dữ liệu
    async function postData(url = '', data = {}) {
        try {
            // Sử dụng phương thức post của axios
            const response = await axios.post(url, data);
            if(!response) {
                setLoad(true);
            }
            // Xử lý kết quả trả về
            if (response.data.message === 'Hủy booking thành công và đã hoàn tiển.') {
                setShowCancellationCard(false);
                setmessageReponse(response.data.message)
                Alert(2000, 'Hủy đặt phòng', 'Hủy booking thành công và đã hoàn tiển', 'succsess', 'OK');
                window.location.reload();
            }
            return response.data;
        } catch (error) {
            // Xử lý lỗi
            console.error('Có lỗi xảy ra trong quá trình gửi dữ liệu:', error);
            Alert(2000, 'Hủy đặt phòng', 'Có lỗi xảy ra trong quá trình gửi dữ liệu ', 'error', 'OK');
        }
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCancellationReasons(prev => ({ ...prev, [name]: checked }));
    };

    const generateNoteToPayer = () => {
        const reasons = [];
        if (cancellationReasons.cannotArrive) reasons.push('Không thể đến được');
        if (cancellationReasons.changePlans) reasons.push('Thay đổi kế hoạch');
        if (cancellationReasons.other) reasons.push('Lí do khác');
        return reasons.join(', ');
    };
    const dataButton = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>,
            title: "Manage guests"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg>,
            title: "Change reservation"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" /></svg>,
            title: "Cancel reservation"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" className="block h-6 w-6"><path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z"></path></svg>,
            title: "Get a PDF for visa purposes"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>,
            title: "Add to wallet"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="14" width="10.5" viewBox="0 0 384 512"><path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z" /></svg>,
            title: "Get receipt"
        },
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
        if(load) {
        return (
            <div className=
              "flex justify-center items-center h-screen w-screen bg-gray-100 opacity-100" >
              <div className="flex flex-col items-center">
                <img src="https://cdn.dribbble.com/users/2356828/screenshots/15188850/media/f8152a69b40f21eec559e6e0d05a46f1.gif" alt="Loading" className="w-20% h-20%" />
                <p className="text-lg font-medium text-gray-700 mt-4">Quá trình thanh toán sắp hoàn tất...</p>
              </div>
            </div>
          );
    }
    return (
        <>
             {isOpen && (<div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <p>{messageReponse}</p>
            </div>
            </div>)}
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
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="10.5" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                            </button>
                        </div>
                        {/* button share */}
                        <div className='absolute top-5 left-10'>
                            <button onClick={toggleClose} className={`flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-white rounded-full text-black cursor-pointer`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" /></svg>
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
                                    <h4>Địa điểm tuyệt vời</h4>
                                    <p>Được đánh giá chất lượng dịch vụ tốt</p>
                                </div>
                            </div>
                            <hr />
                            {/* line 2 */}
                            <div className='flex items-center gap-6 mt-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className='block h-[24px] w-[24px] mb-3' fill='current'><path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"></path></svg>
                                <div>
                                    <h4>An toàn tuyệt đối</h4>
                                    <p>Được đánh giá là an toàn cho khách.</p>
                                </div>
                            </div>
                            <hr />
                            {/* line 3 */}
                            <div className='flex items-center gap-6 mt-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className='block h-[24px] w-[24px] mb-3' fill='current'><path d="M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z"></path></svg>
                                <div>
                                    <h4>Cân đối thời gian</h4>
                                    <p>Không gặp vấn đề checkin trễ hay hết phòng.</p>
                                </div>
                            </div>
                        </div>
                        {/* Right content */}
                        <div className='w-[40%] py-10 border-l-2 bg-gray-100 shadow-md rounded-xl'>
                            <div className='flex gap-10 justify-evenly items-center'>
                                <div>
                                    <p className='font-medium'>Nhận phòng</p>
                                    <p className='font-medium text-3xl'>{data.checkin.date}, {data.checkin.day}/{data.checkin.month}</p>
                                    <p className=''>{data.checkin.time}  AM</p>
                                </div>
                                <div>
                                    <p className='font-medium'>Trả phòng</p>
                                    <p className='font-medium text-3xl'>{data.checkout.date}, {data.checkout.day}/{data.checkout.month}</p>
                                    <p className=''>{data.checkout.time}  AM</p>
                                </div>
                            </div>
                            <div className='flex w-full justify-center item-center mt-6'>
                                <div className='w-fit'>
                                    {data.comfirm === 'PENDING' && data.status  ? (
                                        <div className='flex gap-4 items-center'>
                                            {!showCancellationCard && (
                                                <div className='flex gap-4 items-center'>
                                                    <p className='bg-gray-400 shadow-xl py-3 px-5 rounded-xl text-3xl font-medium'>Chờ Xác Nhận</p>
                                                    <button className='bg-zinc-950 text-white shadow-xl py-3 px-5 rounded-xl text-3xl font-medium' onClick={() => handleCancel(data, true)}>Hủy</button>
                                                </div>
                                            )}
                                            {showCancellationCard && (
                                                <div className='mt-5 p-4 bg-white shadow-xl flex flex-col gap-4'>
                                                    <p className='text-xl font-semibold mb-4'>Lí do hủy bỏ:</p>
                                                    <div className='flex flex-col gap-2 mb-4'>
                                                        <label><input type="checkbox" name="cannotArrive" checked={cancellationReasons.cannotArrive} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5" /> Không thể đến được</label>
                                                        <label><input type="checkbox" name="changePlans" checked={cancellationReasons.changePlans} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5" /> Thay đổi kế hoạch</label>
                                                        <label><input type="checkbox" name="other" checked={cancellationReasons.other} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5" /> Lí do khác</label>
                                                    </div>
                                                    <div className="flex flex-col space-y-4">
                                                    <p className='text-3xl font-semibold'>Khoản tiền hoàn trả: {refundAmount} $</p>
                                                    <p className={`text-2xl font-semibold ${showMessage ? 'text-red-600' : ''}`}>{showMessage}</p>
                                                    { (data.total - refundAmount).toFixed(2) > 0 && (
                                                    <div>
                                                        <p className='text-2xl font-semibold text-red-600'>Khoản khấu trừ: - {(data.total - refundAmount).toFixed(2)} $</p>
                                                    </div>
                                                    )}
                                                    </div>
                                                     {/* Nút Submit và Cancel */}
                                                    <div className='flex justify-end gap-4'>
                                                        <button className='bg-zinc-950 hover:bg-zinc-950 text-white font-bold py-2 px-4 rounded' onClick={() => submitCancel(data)}>Xác nhận</button>
                                                        <button className='bg-pink-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded' onClick={() => cancelRefund()}>Quay lại</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : data.comfirm === 'CONFIRMED' ?
                                        (<div className='flex gap-4 items-center'>
                                            {!showCancellationCard && (<div className='flex gap-4 items-center'>
                                                <p className='bg-pink-600 shadow-xl py-3 px-5 rounded-xl text-3xl font-medium'>Đã Xác Nhận</p>
                                                <button className='bg-zinc-950 text-white  shadow-xl py-3 px-5 rounded-xl text-3xl font-medium' onClick={() => handleCancel(data, true)}>Hủy</button>
                                            </div>)}
                                            {showCancellationCard && (
                                                <div className='mt-5 p-4 bg-white shadow-xl flex flex-col gap-4'>
                                                    <p className='text-xl font-semibold mb-4'>Lí do hủy bỏ:</p>
                                                    <div className='flex flex-col gap-2 mb-4'>
                                                        <label><input type="checkbox" name="cannotArrive" checked={cancellationReasons.cannotArrive} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5" /> Không thể đến được</label>
                                                        <label><input type="checkbox" name="changePlans" checked={cancellationReasons.changePlans} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5" /> Thay đổi kế hoạch</label>
                                                        <label><input type="checkbox" name="other" checked={cancellationReasons.other} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5" /> Lí do khác</label>
                                                    </div>
                                                    <p className='text-3xl font-semibold'>Khoản tiền hoàn trả: {refundAmount} $</p>
                                                    <p className='text-red-600 text-2xl font-semibold'>{showMessage}</p>
                                                    {/* Nút Submit và Cancel */}
                                                    <div className='flex justify-end gap-4'>
                                                        <button className='bg-zinc-950 hover:bg-zinc-950 text-white font-bold py-2 px-4 rounded' onClick={() => submitCancel(data)}>Xác nhận</button>
                                                        <button className='bg-pink-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded' onClick={() => cancelRefund()}>Quay lại</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        ) : data.comfirm === 'REJECTED' ? (
                                            <a href={`/explore`}>
                                            <p className='bg-red-600 shadow-xl py-3 px-5 rounded-xl text-3xl font-medium'>ĐẶT LẠI</p>
                                            </a>
                                        ) : data.comfirm === 'COMPLETED' ? (
                                            <p className='bg-green-600 shadow-xl py-3 px-5 rounded-xl text-3xl font-medium'>ĐÃ HOÀN THÀNH CHUYẾN ĐI</p>
                                        ) :
                                          data.comfirm === 'IN_PROGRESS'? (
                                            <div className='flex flex-col gap-2 mb-4'>
                                                <p className='bg-lime-400  shadow-xl py-3 px-5 rounded-xl text-3xl font-medium'>ĐANG DIỄN RA</p>
                                                <button className='bg-zinc-950 text-white  shadow-xl py-3 px-5 rounded-xl text-3xl font-medium' onClick={() => handCheckout(data.idBooking)}>Trả Phòng</button>
                                            </div>                  
                                            ): null} 
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* session 2 */}
                    {!(data.comfirm === "REJECTED" || data.confirm === "COMPLETED") && (<div className='py-5 px-10'>
                        <h2 className='text-4xl font-medium'>Chi tiết đặt</h2>
                        {/* detail */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='w-[5rem] h-[5rem] rounded-full'>
                                <img src={data.avatar} className='h-full w-full rounded-full object-cover' />
                            </div>
                            <div className='mt-3'>
                                <h3>Ai sẽ đến</h3>
                                <h4>{data.guestName}  cùng {data.numGuest} khách</h4>
                            </div>
                        </div>
                        <hr />
                        {/* code area */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>Mã đặt phòng</h3>
                                <p className='bg-gray-100 px-4'>{data.idBooking.substring(data.idBooking.length - 5).toUpperCase()}</p>
                            </div>
                        </div>
                        <hr />
                   
                        {   data.comfirm === "COMPLETED" && 
                            <div className='flex gap-4 items-center mt-5'>
                                <Feedback userId={userId} propertyId={data.propertyId} />
                            </div>
                        }        

                        {/* cancel area */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>Chính sách hủy đặt</h3>
                                <p className=''>Hoàn 100% trước ngày {data.checkin.day - 5} tháng {data.checkin.month}.</p>
                                <p className=''>Hoàn 50% phí dịch vụ airbnb trước ngày {data.checkin.day - 3} tháng {data.checkin.month}, đã bao gồm thuế.</p>
                                <p className=''>Hoàn 70% booking phòng trước ngày {data.checkin.day - 2} tháng {data.checkin.month}, đã bao gồm thuế.</p>
                                <p className=''>Chỉ hoàn phí lau dọn (nếu có) trước ngày {data.checkin.day - 1} tháng {data.checkin.month}.</p>
                                <Link><p className="underline font-medium">Read more</p></Link>
                            </div>
                        </div>
                        <hr />
                        {/* Policy area */}
                        <div className='flex gap-4 items-center mt-5'>
                            <p>Booking cuả bạn được bảo đảm bởi <span className='text-[#FF385C] font-medium'>air</span><span className='text-black font-medium'>cover </span><span className="underline font-medium"><Link>  Learn more</Link></span></p>
                        </div>
                        <hr />

                        {/* list button area */}
                        {dataButton.map((e, i) => {
                            return (
                                <>
                                    <IconButton icon={e.icon} title={e.title} />
                                    <hr />
                                </>
                            );
                        })}
                    </div>)}

                    {/* session 3 */}
                    <div className='py-5 px-10'>
                        <h2 className='text-4xl font-medium'>Checking in & out</h2>

                        {/* checkin method */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>Cách thức Check-in</h3>
                                <p>Chìa khóa trao tay</p>
                            </div>
                        </div>
                        <hr />

                        {/* get inside */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>Làm sao tới đây</h3>
                                <p>Bạn sẽ tìm thấy hướng dẫn để đến đây 48 giờ trước khi nhận phòng</p>
                            </div>
                        </div>
                        <hr />
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
                        <hr />
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
                        <hr />

                        {/* Co-hosts */}
                        <div className='flex gap-4 items-center mt-5'>
                            <div className='mt-3'>
                                <h3>Co-hosts</h3>
                                <p>Loc, Minh</p>
                                <Link><p className="underline font-medium">Show more</p></Link>
                            </div>
                        </div>
                        <hr />

                        {/* call host */}
                        <IconButton icon={<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z" /></svg>}
                            title="Call host" />
                        <hr />
                    </div>

                    {/* session 6 */}
                    <div className='py-5 px-10'>
                        <h2 className='text-4xl font-medium'>Payment info</h2>
                        {/* About your host method */}
                        <div className='flex gap-4 items-center'>
                            <div className='mt-3'>
                                <h3>Total cost</h3>
                                <p className="text-gray-700">${data.total} USD</p>
                            </div>
                        </div>
                        <hr />

                        {/* Add detail for expensing your trip */}
                        <IconButton icon={<svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192zM224 248c13.3 0 24 10.7 24 24v56h56c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V376H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h56V272c0-13.3 10.7-24 24-24z" /></svg>}
                            title="Add detail for expensing your trip" />
                        <hr />

                        {/* call host */}
                        <IconButton icon={<svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z" /></svg>}
                            title="Get recript" />
                        <hr />
                    </div>

                    {/* session 7 */}
                    <div className='py-5 px-10'>
                        <h2 className='text-4xl font-medium'>Get support anytime</h2>
                        <p>If you need help, we're availiable 24/7 from anywhere in the world</p>

                        {/* Contact Airbnb support */}
                        <IconButton icon={<svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192zM224 248c13.3 0 24 10.7 24 24v56h56c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V376H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h56V272c0-13.3 10.7-24 24-24z" /></svg>}
                            title="Contact Airbnb support" />
                        <hr />

                        {/* call host */}
                        <IconButton icon={<svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z" /></svg>}
                            title="Visit the Help Center" />
                        <hr />
                    </div>
                </div>
            </div>
        </>
    )
};

const IconButton = ({ icon, title, toogleBtn }) => {
    return (
        <button onClick={toogleBtn} className='flex justify-between items-center w-full pr-14'>
            <div className='flex items-center gap-3'>
                {icon}
                <p className='mt-3'>{title}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
        </button>
    );
};