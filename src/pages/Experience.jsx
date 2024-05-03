import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonHeader from "../components/header/CommonHeader";
import Footer from "../components/footer/Footer";
import {
  cardData1s,
  cardData2s,
  cardData3s,
  cardData4s,
  cardData5s,
  slideImages,
  experienceCate,
} from "../components/Experience/Constants";
import {
  CardVertical,
  CardHorizontal,
} from "../components/Experience/Cardlist";
import Header from "../components/header/Header";

function Experience() {
  // slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= slideImages.length - 2;
  const itemsPerSlide = 3;
  const totalItems = slideImages.length;
  const itemsToMove = 1;

  // nav index
  const [currentNavIndex, setCurrentNavIndex] = useState(0);
  const isAtStartNav = currentNavIndex === 0;
  const isAtEndNav = currentNavIndex === 2;

  const itemsPerVerSes = 6;
  const itemsToMoveVerSes = 6;

  const itemsPerHorSes = 3;
  const itemsToMoveHorSes = 3;

  // session1 index
  const [currentSes1Index, setCurrentSes1Index] = useState(0);
  const isAtStartSes1 = currentSes1Index === 0;
  const isAtEndSes1 = currentSes1Index >= cardData1s.length - itemsPerVerSes;

  // session2 index
  const [currentSes2Index, setCurrentSes2Index] = useState(0);
  const isAtStartSes2 = currentSes2Index === 0;
  const isAtEndSes2 = currentSes2Index >= cardData2s.length - itemsPerVerSes;

  // session3 index
  const [currentSes3Index, setCurrentSes3Index] = useState(0);
  const isAtStartSes3 = currentSes3Index === 0;
  const isAtEndSes3 = currentSes3Index >= cardData3s.length - itemsPerHorSes;

  // session4 index
  const [currentSes4Index, setCurrentSes4Index] = useState(0);
  const isAtStartSes4 = currentSes4Index === 0;
  const isAtEndSes4 = currentSes4Index >= cardData4s.length - itemsPerVerSes;

  // session5 index
  const [currentSes5Index, setCurrentSes5Index] = useState(0);
  const isAtStartSes5 = currentSes5Index === 0;
  const isAtEndSes5 = currentSes5Index >= cardData5s.length - itemsPerVerSes;

  const goToPrevious = (index) => {
    index === 0
      ? setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsToMove, 0))
      : setCurrentNavIndex((prevIndex) => Math.max(prevIndex - itemsToMove, 0));
  };

  const goToNext = (index) => {
    index === 0
      ? setCurrentIndex((prevIndex) =>
          Math.min(prevIndex + itemsToMove, totalItems - itemsPerSlide + 1)
        )
      : setCurrentNavIndex((prevIndex) =>
          Math.min(prevIndex + itemsToMove, totalItems - itemsPerSlide + 1)
        );
  };

  const goToPreviousSes = (index) => {
    index === 0
      ? setCurrentSes1Index((prevIndex) =>
          Math.max(prevIndex - itemsToMoveVerSes, 0)
        )
      : index === 1
      ? setCurrentSes2Index((prevIndex) =>
          Math.max(prevIndex - itemsToMoveVerSes, 0)
        )
      : index === 2
      ? setCurrentSes3Index((prevIndex) =>
          Math.max(prevIndex - itemsToMoveHorSes, 0)
        )
      : index === 3
      ? setCurrentSes4Index((prevIndex) =>
          Math.max(prevIndex - itemsToMoveVerSes, 0)
        )
      : setCurrentSes5Index((prevIndex) =>
          Math.max(prevIndex - itemsToMoveVerSes, 0)
        );
  };

  const goToNextSes = (index) => {
    index === 0
      ? setCurrentSes1Index((prevIndex) =>
          Math.min(
            prevIndex + itemsToMoveVerSes,
            cardData1s.length - itemsPerVerSes + 1
          )
        )
      : index === 1
      ? setCurrentSes2Index((prevIndex) =>
          Math.min(
            prevIndex + itemsToMoveVerSes,
            cardData2s.length - itemsPerVerSes + 1
          )
        )
      : index === 2
      ? setCurrentSes3Index((prevIndex) =>
          Math.min(
            prevIndex + itemsToMoveHorSes,
            cardData3s.length - itemsToMoveHorSes + 1
          )
        )
      : index === 3
      ? setCurrentSes4Index((prevIndex) =>
          Math.min(
            prevIndex + itemsToMoveVerSes,
            cardData4s.length - itemsPerVerSes + 1
          )
        )
      : setCurrentSes5Index((prevIndex) =>
          Math.min(
            prevIndex + itemsToMoveVerSes,
            cardData5s.length - itemsPerVerSes + 1
          )
        );
  };

  return (
    <>
      {/* <CommonHeader padding="32" /> */}
      <Header></Header>
      <div className="mt-[10.6rem] pb-10">
        <div className="flex justify-between items-center px-32">
          <h1 className="text-[3.2rem] font-bold">Trải nghiệm mới trong tuần này</h1>
          {/* Nút điều hướng */}
          <div className="flex items-center justify-center gap-2 mr-5 mt-2">
            <button
              onClick={() => {
                goToPrevious(0);
              }}
              className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-gray-500 rounded-full text-black cursor-pointer ${
                isAtStart ? "opacity-30 cursor-not-allowed" : ""
              }`}
              disabled={isAtStart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="8.75"
                viewBox="0 0 320 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
            </button>
            <button
              onClick={() => {
                goToNext(0);
              }}
              className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-gray-500 rounded-full text-black cursor-pointer ${
                isAtEnd ? "opacity-30 cursor-not-allowed" : ""
              }`}
              disabled={isAtEnd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="8.75"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
          </div>
        </div>
        {/* code slide */}
        <div
          className={
            isAtStart
              ? "overflow-hidden mt-12 pl-32 "
              : isAtEnd
              ? "overflow-hidden mt-12 pr-32"
              : "overflow-hidden mt-12"
          }
        >
          <div
            className="flex gap-4 transition-transform duration-700 ease-in-out"
            style={{
              width: `${100 * (totalItems / itemsPerSlide)}%`,
              transform: `translateX(-${(100 / totalItems) * currentIndex}%)`,
            }}
          >
            {slideImages.map((slide, index) => (
              <div className="w-full">
                <img
                  key={index}
                  src={slide.url}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-3xl "
                />
                <div className="relative w-[59.18rem]">
                  <p className="absolute text-white text-[1.3rem] bottom-[28rem] left-9">
                    Collection
                  </p>
                  <h1 className="absolute text-start w-[26rem] text-white text-[2.7rem] -top-[29rem] left-9">
                    {slide.title}
                  </h1>
                  <button className="absolute text-black text-[1.4rem] font-medium bottom-10 left-9 bg-white py-[0.7rem] px-4 rounded-xl hover:bg-black">
                    Show all
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* navbar */}
        <div className="py-8 mb-7 px-32">
          <div className="flex">
            <div
              className="flex gap-2 pr-6 border-r-2"
              style={{ maxWidth: "fit-content", whiteSpace: "nowrap" }}
            >
              <button className="text-2xl py-2 px-3 border border-gray-500 rounded-full">
                Dates
              </button>
              <button className="text-2xl py-2 px-3 border border-gray-500 rounded-full">
                Group size
              </button>
              <button className="text-2xl py-2 px-3 border border-gray-500 rounded-full">
                More filters
              </button>
            </div>
            <div className="flex overflow-hidden pl-6">
              <button
                onClick={() => {
                  goToPrevious(1);
                }}
                className={`flex items-center justify-center px-3 border border-gray-500 rounded-full text-black cursor-pointer ${
                  isAtStartNav ? "hidden" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14"
                  width="8.75"
                  viewBox="0 0 320 512"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
              </button>
              <div className="overflow-hidden">
                <div
                  className="flex gap-4 transition-transform duration-700 ease-in-out"
                  style={{
                    maxWidth: "fit-content",
                    whiteSpace: "nowrap",
                    width: `${100 * (totalItems / itemsPerSlide)}%`,
                    transform: `translateX(-${
                      (155 / totalItems) * currentNavIndex
                    }%)`,
                  }}
                >
                  {experienceCate.map((item, index) => (
                    <button className="text-2xl text-black py-2 px-4 bg-[#f2f2f2] rounded-full">
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  goToNext(1);
                }}
                className={`flex items-center justify-center px-3 border border-gray-500 rounded-full text-black cursor-pointer ${
                  isAtEndNav ? " hidden" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14"
                  width="8.75"
                  viewBox="0 0 320 512"
                >
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* content */}
      <ContentArea
        title="Plan a trip with help from local Hosts around the world"
        navlink="/"
        isStart={isAtStartSes1}
        isEnd={isAtEndSes1}
        togglePrevious={() => {
          goToPreviousSes(0);
        }}
        toggleNext={() => {
          goToNextSes(0);
        }}
        listCard={
          <CardVertical
            data={cardData1s}
            totalItems={cardData1s.length}
            itemsPerSlide={itemsPerVerSes}
            currentIndex={currentSes1Index}
          />
        }
        totalItem={cardData1s.length}
      />

      <ContentArea
        title="Best sellers"
        navlink="/"
        isStart={isAtStartSes2}
        isEnd={isAtEndSes2}
        togglePrevious={() => {
          goToPreviousSes(1);
        }}
        toggleNext={() => {
          goToNextSes(1);
        }}
        listCard={
          <CardVertical
            data={cardData2s}
            totalItems={cardData2s.length}
            itemsPerSlide={itemsPerVerSes}
            currentIndex={currentSes2Index}
          />
        }
        totalItem={cardData2s.length}
      />

      <ContentArea
        title="Starting in the next 6 hours"
        navlink="/"
        isStart={isAtStartSes3}
        isEnd={isAtEndSes3}
        togglePrevious={() => {
          goToPreviousSes(2);
        }}
        toggleNext={() => {
          goToNextSes(2);
        }}
        listCard={
          <CardHorizontal
            data={cardData3s}
            totalItems={cardData3s.length}
            itemsPerSlide={itemsPerHorSes}
            currentIndex={currentSes3Index}
          />
        }
        totalItem={cardData3s.length}
      />

      <ContentArea
        title="Make plans this weekend"
        navlink="/"
        isStart={isAtStartSes4}
        isEnd={isAtEndSes4}
        togglePrevious={() => {
          goToPreviousSes(3);
        }}
        toggleNext={() => {
          goToNextSes(3);
        }}
        listCard={
          <CardVertical
            data={cardData4s}
            totalItems={cardData4s.length}
            itemsPerSlide={itemsPerVerSes}
            currentIndex={currentSes4Index}
          />
        }
        totalItem={cardData4s.length}
      />

      <ContentArea
        title="Great for groups"
        navlink="/"
        isStart={isAtStartSes5}
        isEnd={isAtEndSes5}
        togglePrevious={() => {
          goToPreviousSes(4);
        }}
        toggleNext={() => {
          goToNextSes(4);
        }}
        listCard={
          <CardVertical
            data={cardData5s}
            totalItems={cardData5s.length}
            itemsPerSlide={itemsPerVerSes}
            currentIndex={currentSes5Index}
          />
        }
        totalItem={cardData5s.length}
      />

      <div className="text-center p-16">
        <button className="px-5 py-4 bg-black rounded-xl text-white text-2xl font-medium">
          Load more
        </button>
      </div>
      <Footer />
    </>
  );
}

const ContentArea = ({
  title,
  navlink,
  isStart,
  isEnd,
  togglePrevious,
  toggleNext,
  listCard,
  totalItem,
}) => {
  return (
    <>
      <div className="py-8 px-32">
        <div className="flex justify-between">
          <h2 className="text-4xl">{title}</h2>
          <div className="flex gap-3">
            <Link to={navlink} className="underline font-medium">
              Show ({totalItem})
            </Link>
            <button
              onClick={togglePrevious}
              className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-gray-500 rounded-full text-black cursor-pointer ${
                isStart ? "opacity-30 cursor-not-allowed" : ""
              }`}
              disabled={isStart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="8.75"
                viewBox="0 0 320 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
            </button>
            <button
              onClick={toggleNext}
              className={`flex items-center justify-center w-[3.1rem] h-[3.1rem] border border-gray-500 rounded-full text-black cursor-pointer ${
                isEnd ? "opacity-30 cursor-not-allowed" : ""
              }`}
              disabled={isEnd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="8.75"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="py-8 overflow-hidden">{listCard}</div>
      </div>
    </>
  );
};

export default Experience;
