import React, { useEffect, useState, memo } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ListImage({ setIndex, currentImageInit, imagesList }) {
    var currentURL = window.location.href;
    var url = new URL(currentURL);
  
    const [activeIndex, setActiveIndex] = useState(imagesList.indexOf(currentImageInit));
    useEffect(() => {
        setIndex(activeIndex + 1);
    }, [activeIndex]);
  
    const handleNext = () => {
        if (activeIndex === imagesList.length - 1) {
            setActiveIndex(0);
            setIndex(1);
        } else {
            setActiveIndex(activeIndex + 1);
            setIndex(activeIndex + 2);
        }
        url.searchParams.set('image', imagesList[activeIndex].imageId);
        window.history.replaceState({}, '', url);
    };
    const handlePrev = () => {
        if (activeIndex === 0) {
            setActiveIndex(imagesList.length - 1);
            setIndex(imagesList.length);
        } else {
            setActiveIndex(activeIndex - 1);
            setIndex(activeIndex);
        }
        url.searchParams.set('image', imagesList[activeIndex].imageId);
        window.history.replaceState({}, '', url);
    };


  return (
    <div className="w-full h-full bg-black flex justify-center align-middle relative">
        <div className="absolute -left-7 top-[45%] preImage w-[40px] h-[40px] rounded-[50%] bg-white flex justify-center items-center justify-items-center" onClick={handlePrev}>
            <button className="text-5xl text-black flex justify-center items-center justify-items-center p-2">
                <FontAwesomeIcon icon={icon({name: 'chevron-left', family: 'classic', style: 'solid'})} />
            </button>
        </div>
        <div className="w-[90%] h-full">
            <img className="object-contain w-full h-full" src={imagesList[activeIndex].url} alt="" />
        </div>
        <div className="absolute -right-5 top-[45%] nextImage w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center justify-items-center" onClick={handleNext}>
            <button className="text-5xl text-black flex justify-center items-center justify-items-center">
                <FontAwesomeIcon icon={icon({name: 'chevron-right', family: 'classic', style: 'solid'})} />
            </button>
        </div>
    </div>
  );
}

export default memo(ListImage);
