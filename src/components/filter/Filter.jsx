import React, { useState } from "react";
import "./filter.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataCategorySelector } from "../../redux-tookit/selector";
import {dataFilterSelector} from "../../redux-tookit/selector";
import {dataFilterSlice} from "../../redux-tookit/reducer/dataFilterSlice";
import axios from "axios";
import { dataCategorySlice } from "../../redux-tookit/reducer/dataCategorySlice";

function Filter() {
  const navigate = useNavigate();
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
    {icon:<BeachAccessIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Biển"},
    {icon:<AcUnitIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Tuyết"},
    {icon:<CastleIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Lâu đài"},
    {icon:<FestivalIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Cắm trại"},
    {icon:<PoolIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Hồ bơi"},
    {icon:<LandscapeIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Núi"},
    {icon:<BalconyIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Trang trọng"},
    {icon:<ForestIcon style={{ fontSize: 30, color: '#717171' }}/>, categoryName:"Rừng"},
  ];

  const handleClick = (categoryId) => {
    dispatch(dataFilterSlice.actions.getdataFilterRequest());
    axios
      .get(
        `http://localhost:8080/api/v1/stayeasy/property/category/${categoryId}`
      )
      .then(function (response) {
        dispatch(dataFilterSlice.actions.getdataFilterSuccess(response.data));
        navigate(`/category`);
      })
      .catch(function (error) {
        dispatch(dataFilterSlice.actions.getdataFilterFailure());

        console.log(error);
      });
  };

  
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  autoplay: true,
  variableWidth: true
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        width: "40px",
        height: "40px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
    className={`${className}`}
      style={{
        ...style,
        display: "block",
        width: "40px",
        height: "40px",
      }}
      onClick={onClick}
    />
  );
}


  return (
    <>
    <div className="p-4 w-full flex justify-center div-filter">

          <Slider {...settings} className="w-[75%] pl-16 pr-20">
                  {dataCategory.map((item, index) => (
                    <div key={index} style={{width:"100px"}} onClick={() => handleClick(item.categoryId)}>
                      <div className="flex flex-col items-center">
                        {ItemCategories.map((icon) => {
                            if(icon.categoryName === item.categoryName){
                              return icon.icon
                            }
                        })}
                        <div>
                          <p className="text-xl text-[#717171] font-medium pb-1">{item.categoryName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
          </Slider>
    </div>
    </>
  );
}

export default Filter;
