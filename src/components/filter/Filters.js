import React, { useState } from "react";
import "./filter.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CabinIcon from "@mui/icons-material/Cabin";
import FestivalIcon from "@mui/icons-material/Festival";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CastleIcon from "@mui/icons-material/Castle";
import PoolIcon from "@mui/icons-material/Pool";
import LandscapeIcon from "@mui/icons-material/Landscape";
import BalconyIcon from "@mui/icons-material/Balcony";
import ForestIcon from "@mui/icons-material/Forest";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataCategorySelector } from "../../redux-tookit/selector";
import axios from "axios";
import { dataCategorySlice } from "../../redux-tookit/reducer/dataCategorySlice";
import { dataHomeSlice } from "../../redux-tookit/reducer/dataHomeSlice";

function Filters() {
  const dispatch = useDispatch();
  const { dataCategory } = useSelector(dataCategorySelector);

  useEffect(() => {
    dispatch(dataCategorySlice.actions.getDataCategoryRequest());
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/category`)
      .then(function (response) {
        dispatch(
          dataCategorySlice.actions.getDataCategorySuccess(response.data)
        );
      })
      .catch(function (error) {
        dispatch(dataCategorySlice.actions.getDataCategoryFailure());

        console.log(error);
      });
  }, []);

  const ItemCategories = [
    {icon:<CabinIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Cabin"},
    {icon:<SouthAmericaIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Đảo"},
    {icon:<BeachAccessIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Bãi biển"},
    {icon:<AcUnitIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Tuyết"},
    {icon:<CastleIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Lâu đài"},
    {icon:<FestivalIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Cắm trại"},
    {icon:<PoolIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Hồ bơi"},
    {icon:<LandscapeIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Cảnh đẹp"},
    {icon:<BalconyIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Kiến trúc"},
    {icon:<ForestIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Nông trại"},
    {icon:<CabinIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Cabin"},
    {icon:<SouthAmericaIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Đảo"},
    {icon:<BeachAccessIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Bãi biển"},
    {icon:<AcUnitIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Tuyết"},
    {icon:<CastleIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Lâu đài"},
    {icon:<FestivalIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Cắm trại"},
    {icon:<PoolIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Hồ bơi"},
    {icon:<LandscapeIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Cảnh đẹp"},
    {icon:<BalconyIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Kiến trúc"},
    {icon:<ForestIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Nông trại"}
  ];

  //toggle
  const [isEnabled, setIsEnabled] = useState(false);

  // navbar index
  const itemsPerSlide = 10;
  const totalItems = (ItemCategories.length+dataCategory.length);
  const itemsToMove = 6;
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= (ItemCategories.length+dataCategory.length) - itemsPerSlide;
  
  const goToPrevious = () => {
    console.log(currentIndex);
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsToMove, 0));
  };

  const goToNext = () => {
    console.log(currentIndex);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsToMove, totalItems - itemsPerSlide + 1));
  };

  const handleClick = (categoryId) => {
    dispatch(dataHomeSlice.actions.getDataHomeRequest());
    axios
      .get(
        `http://localhost:8080/api/v1/stayeasy/property/category/${categoryId}`
      )
      .then(function (response) {
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataHomeSlice.actions.getDataHomeFailure());

        console.log(error);
      });
  };


  return (
    <div className="">
      {/* navbar */}
        <div className="py-8 px-24">
            <div className="flex items-center gap-2">
                <div className="flex overflow-hidden pl-6">
                  <div className="flex items-center justify-center">
                    <button onClick={() => {goToPrevious(1);}} className={`border border-black px-[1.2rem] py-[0.9rem] rounded-full text-black cursor-pointer ${isAtStart ? "hidden" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512">
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                        </svg>
                    </button>
                  </div>
                  <div className="overflow-hidden">
                      <div className="flex gap-1 transition-transform duration-700 ease-in-out" style={{ maxWidth: "fit-content", whiteSpace: "nowrap", width: `${100 * (totalItems / itemsPerSlide)}%`, transform: `translateX(-${(155 / totalItems) * currentIndex}%)`,}}>
                          {dataCategory.map((item, index) => {
                            return (
                            <div key={index} className="flex flex-col items-center gap-2 px-5 hover:cursor-pointer"
                              onClick={() => handleClick(item.categoryId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" fill="#717171" viewBox="0 0 640 512"><path d="M560 160A80 80 0 1 0 560 0a80 80 0 1 0 0 160zM55.9 512H381.1h75H578.9c33.8 0 61.1-27.4 61.1-61.1c0-11.2-3.1-22.2-8.9-31.8l-132-216.3C495 196.1 487.8 192 480 192s-15 4.1-19.1 10.7l-48.2 79L286.8 81c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 426.4C3 435.3 0 445.6 0 456.1C0 487 25 512 55.9 512z"/></svg>
                                <p className="text-xl text-[#717171] font-medium">{item.categoryName}</p>
                              </div>
                              );
                          })}
                          {ItemCategories.map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 px-5 hover:cursor-pointer" 
                              onClick={() => handleClick(item.categoryId)}>
                              {item.icon}
                              <p className="text-xl text-[#717171] font-medium">{item.categoryName}</p>
                            </div>
                          ))}
                      </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <button onClick={() => {goToNext(1);}} className={`border border-black px-[1.2rem] py-[0.9rem] rounded-full text-black cursor-pointer ${isAtEnd ? " hidden" : ""}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="14" width="8.75" viewBox="0 0 320 512">
                          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                      </svg>
                    </button> 
                  </div>
                </div>
                <div className="p-3">
                  <button className="flex items-center text-center gap-3 px-4 py-[1.4rem] border border-black rounded-3xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14"><path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/></svg>
                    <p className="text-xl font-medium m-0 p-0">Filters</p>
                  </button>
                </div>
                <div className="p-3" style={{ maxWidth: "fit-content", whiteSpace: "nowrap" }}>
                  <button onChange={() => setIsEnabled(!isEnabled)} className="flex items-center text-center gap-3 px-4 py-3 border border-black rounded-3xl">
                    <p className="text-xl font-medium m-0 p-0">Display total before taxes</p>
                    <SwitchToggle isEnabled={isEnabled} setIsEnabled={setIsEnabled}/>
                  </button> 
                </div>
            </div>
        </div>
    </div>
  );
}

const SwitchToggle = ({ isEnabled, setIsEnabled }) => {
  return (
    <label className="flex items-center cursor-pointer">
      {/* Switch Container */}
      <div className="relative">
        {/* Switch */}
        <input type="checkbox" className="sr-only" checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)}/>
        {/* Line */}
        <div className={`block w-16 h-10 rounded-full ${isEnabled?"bg-[#222222]":"bg-[#B0B0B0]"}`}></div>
        {/* Dot */}
        <div className="dot absolute left-[0.2rem] top-[0.13rem] bg-white w-9 h-9 rounded-full" style={{transform: isEnabled ? 'translateX(65%)' : 'translateX(0%)',transition: 'transform 0.2s ease-in-out'}}></div>
      </div>
    </label>
  );
};

export default Filters;
