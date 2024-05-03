import {memo} from 'react';
function NumGuest({type, totalGuest, setTotalGuest}) {
    
    if(type === "adult") {
        return (
            <div className="flex justify-between items-center w-full p-4 pb-0">
                <div className="flex flex-col">
                    <span className="text-3xl font-semibold">Người lớn</span>
                    <span className="text-2xl font-normal">Tuổi từ 13 trở lên</span>
                </div>
                <div className="flex items-center w-24 justify-between">
                    <button onClick={()=> setTotalGuest(totalGuest-1)} className={`${totalGuest<2 ? 'disable': ''} text-3xl font-semibold`}>-</button>
                    <span className="text-3xl font-semibold">{totalGuest}</span>
                    <button onClick={()=> setTotalGuest(totalGuest+1)} className="text-3xl font-semibold">+</button>
                </div>
            </div>
        )
    }else if(type === "children") {
        return (
            <div className="flex justify-between items-center w-full p-4 pb-0">
                <div className="flex flex-col">
                    <span className="text-3xl font-semibold">Trẻ em</span>
                    <span className="text-2xl font-normal">Tuổi 2-12</span>
                </div>
                <div className="flex items-center w-24 justify-between">
                    <button onClick={()=> setTotalGuest(totalGuest-1)} className={`${totalGuest<1 ? 'disable': ''} text-3xl font-semibold`}>-</button>
                    <span className="text-3xl font-semibold">{totalGuest}</span>
                    <button onClick={()=> setTotalGuest(totalGuest+1)} className="text-3xl font-semibold">+</button>
                </div>
            </div>
        )
}else if(type === "infants") {
    return (
        <div className="flex justify-between items-center w-full p-4 pb-0">
            <div className="flex flex-col">
                <span className="text-3xl font-semibold">Em bé</span>
                <span className="text-2xl font-normal">Dưới 2 tuổi</span>
            </div>
            <div className="flex items-center w-24 justify-between">
                    <button onClick={()=> setTotalGuest(totalGuest-1)} className={`${totalGuest<1 ? 'disable': ''} text-3xl font-semibold`}>-</button>
                    <span className="text-3xl font-semibold">{totalGuest}</span>
                    <button onClick={()=> setTotalGuest(totalGuest+1)} className="text-3xl font-semibold">+</button>
                </div>
        </div>
    )
}else {
    return (
        <div className="flex justify-between items-center w-full p-4 pb-0">
            <div className="flex flex-col">
                <span className="text-3xl font-semibold">Thú cưng</span>
            </div>
            <div className="flex items-center w-24 justify-between">
                    <button onClick={()=> setTotalGuest(totalGuest-1)} className={`${totalGuest<1 ? 'disable': ''} text-3xl font-semibold`}>-</button>
                    <span className="text-3xl font-semibold">{totalGuest}</span>
                    <button onClick={()=> setTotalGuest(totalGuest+1)} className="text-3xl font-semibold">+</button>
                </div>
        </div>
    )
}
}
export default memo(NumGuest);