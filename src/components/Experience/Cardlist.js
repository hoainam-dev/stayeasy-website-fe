import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export const CardVertical = ({ data, totalItems, itemsPerSlide, currentIndex }) => {

    return (
        <div className="flex gap-4 transition-transform duration-700 ease-in-out" style={{ width: `${100 * (totalItems / itemsPerSlide)}%`, transform: `translateX(-${(100 / totalItems) * currentIndex}%)` }}>
            {data.map((card, index) => (
                <button className="overflow-hidden text-start w-[15.6%]" key={index}>
                    {/* Header */}
                    <div className="relative">
                        <img src={card.imageUrl} alt="Header" className="w-full h-[28.5rem] rounded-2xl border border-gray-500" />
                        {/* Button trên ảnh */}
                        <button className="absolute top-0 right-0 mt-4 mr-4 px-2 py-1">
                        <FontAwesomeIcon style={{ stroke:'white' }} className="text-4xl z-10 text-customColor transition-all ease-in duration-200" icon={icon({ name: "heart", family: "classic", style: "solid" })}/>
                        </button>
                    </div>
            
                    {/* Body */}
                    <div className="flex flex-col mt-3">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="block h-5 w-5 mb-3 text-current"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>
                            <p className="text-2xl">4.91<span className="text-2xl text-gray-500">(322) · </span></p>
                            <p className="text-gray-500 text-2xl"> India</p>
                        </div>
                        <div className='h-[5rem] line-clamp-2'>
                            <p>{card.text}</p>
                        </div>
                        <div>
                            <p><span className="font-medium">From $46</span> / person</p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};



export const CardHorizontal = ({ data, totalItems, itemsPerSlide, currentIndex }) => {
    return (
        <div className="flex gap-4 transition-transform duration-700 ease-in-out" style={{ width: `${100 * (totalItems / itemsPerSlide)}%`, transform: `translateX(-${(100 / totalItems) * currentIndex}%)` }}>
            {data.map((card, index) => (
                <button className="flex justify-between text-start overflow-hidden w-[32.5%] p-[1rem] border border-gray-500 rounded-2xl" key={index}>
                    {/* Header */}
                    <img src={card.imageUrl} alt="Header" className="w-[13rem] h-[16.5rem] rounded-2xl border border-gray-500" />
                    {/* Body */}
                    <div className="flex flex-col ml-6">
                        <div className="flex justify-end">
                            <button>
                                <FontAwesomeIcon style={{ stroke:'black' }}  className="text-3xl z-10 text-white transition-all ease-in duration-200" icon={icon({ name: "heart", family: "classic", style: "solid" })}/>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="block h-4 w-4 mb-3 text-current"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>
                            <p className="text-xl">4.91<span className="text-gray-500">(322) · </span></p>
                            <p className="text-gray-500 text-xl"> India</p>
                        </div>
                        <p className="text-gray-800 text-2xl">{card.text}</p>
                        <p><span className="font-medium text-2xl">From $15 </span>/ person</p>
                        <div className=" flex gap-3">
                            <button className="border border-gray-500 py-[0.5rem] px-3 rounded-xl text-xl font-medium">3:30 PM</button>
                            <button className="border border-gray-500 py-[0.5rem] px-3 rounded-xl text-xl font-medium">4:30 PM</button>
                            <button className="border border-gray-500 py-[0.5rem] px-3 rounded-xl text-xl font-medium">5:30 PM</button>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};
