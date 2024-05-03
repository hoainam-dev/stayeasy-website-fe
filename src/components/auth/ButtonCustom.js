import React from "react";

export default function ButtonCustom() {
  return (
    <>
      {/* Facebook */}
      <button type="submit" className="relative flex items-center justify-center font-medium h-[4rem] py-3 px-4 rounded-xl bg-white hover:bg-gray-200 w-full border border-black">
        <div className="min-[540px]:absolute min-[540px]:left-0 min-[540px]:top-0 min-[540px]:bottom-0 max-[540px]:flex justify-center flex items-center min-[540px]:pl-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#1877f2" viewBox="0 0 24 24" width="24" height="24">
            <path d="M20.667 0H3.333C1.493 0 0 1.493 0 3.333v17.334C0 22.507 1.493 24 3.333 24h9.062v-9.294H9.083v-3.612h3.312V8.844c0-3.287 2.007-5.083 4.945-5.083 1.405 0 2.615.105 2.97.152v3.438h-2.038c-1.595 0-1.905.758-1.905 1.872v2.448h3.818l-.498 3.612h-3.32V24h6.498c1.84 0 3.333-1.493 3.333-3.333V3.333C24 1.493 22.507 0 20.667 0z" />
          </svg>
        </div>
        <span className="max-[540px]:hidden">Tiếp tục với Facebook</span>
      </button>
      {/* Google */}
      <button type="submit" className="relative flex items-center justify-center font-medium mt-4 py-3 px-4 rounded-xl bg-white hover:bg-gray-200 w-full border border-black">
        <div className="min-[540px]:absolute min-[540px]:left-0 min-[540px]:top-0 min-[540px]:bottom-0 max-[540px]:flex justify-center flex items-center min-[540px]:pl-8">
          <svg viewBox="0 0 48 48" width="24" height="24">
            <clipPath id="g">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
            </clipPath>
            <g class="colors" clip-path="url(#g)">
              <path fill="#FBBC05" d="M0 37V11l17 13z" />
              <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
              <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
              <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
            </g>
          </svg>
        </div>
        <span className="max-[540px]:hidden">Tiếp tục với Google</span>
      </button>
      {/* Apple */}
      <button type="submit" className="relative flex items-center justify-center font-medium mt-4 py-3 px-4 rounded-xl bg-white hover:bg-gray-200 w-full border border-black">
        <div className="min-[540px]:absolute min-[540px]:left-0 min-[540px]:top-0 min-[540px]:bottom-0 max-[540px]:flex justify-center flex items-center min-[540px]:pl-8">
          <svg viewBox="0 0 170 170" fill="currentColor" width="24" height="24">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z" />
          </svg>
        </div>
        <span className="max-[540px]:hidden">Tiếp tục với Apple</span>
      </button>
      {/* Mail */}
      <button type="submit" className="relative flex items-center justify-center font-medium mt-4 py-3 px-4 rounded-xl bg-white hover:bg-gray-200 w-full border border-black">
        <div className="min-[540px]:absolute min-[540px]:left-0 min-[540px]:top-0 min-[540px]:bottom-0 max-[540px]:flex justify-center flex items-center min-[540px]:pl-8">
          <svg viewBox="0 0 8 6" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="m0 0h8v6h-8zm.75 .75v4.5h6.5v-4.5zM0 0l4 3 4-3v1l-4 3-4-3z" />
          </svg>
        </div>
        <span className="max-[540px]:hidden">Tiếp tục với Email</span>
      </button>
    </>
  );
}
