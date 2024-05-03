import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useDispatch } from "react-redux";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";

import * as ProvinceService from "../../Services/ProvinceService";
import AddressSelection from "./AddressSelection";
import { updateInformation } from "../../redux-tookit/actions/userActions";

export const AddressUpdateForm = ({ title, description, isnull, setIsDisabled, isDisable }) => {
  const dispatch = useDispatch();
  const user = useContext(UserContext).user;

  const [isEditing, setIsEditing] = useState(false);
  const [streetErrorMessage, setStreetErrorMessage] = useState();
  const [countryErrorMessage, setCountryErrorMessage] = useState();

  const [street, setStreet] = useState();
  const [country, setCountry] = useState();
  
  
  // city - district - ward
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  const [cityId, setCityId] = useState();
  const [districtId, setdistrictId] = useState();
  
  // convert from object to array
  const ArrayProVince = Object.values(cities);
  const ArrayDistrict = Object.values(districts);
  const ArrayWard = Object.values(wards);

  useEffect(()=>{
    if(!user){
      return;
    }
    setStreet(user.address?.street);
    setWard(user.address?.ward);
    setDistrict(user.address?.district);
    setCity(user.address?.city);
    setCountry(user.address?.country);
  }, [user]);
  

  const raw = JSON.stringify({
    "id": user?.id,
    "address": {
        "street": street,
        "ward": ward,
        "district": district,
        "city": city,
        "country": "Việt Nam"
      }
  });

  const handleUpdateAddress = () => {
    console.log("street"+street);
    console.log("ward"+ward);
    console.log("district"+district);
    console.log("city"+city);
    if(!street||street===""){
      return setStreetErrorMessage("Không được bỏ trống");
    }else{
      dispatch(updateInformation('địa chỉ', raw, setIsDisabled, setIsEditing, isEditing));
    }
  };


  const setDefault = ()=>{
    setStreetErrorMessage();
    setCountryErrorMessage();
    setStreet(user.address?.street);
    setWard(user.address?.ward);
    setDistrict(user.address?.district);
    setCity(user.address?.city);
    setCountry(user.address?.country);
  };

  const handleEditToggle = () => {
      setIsEditing(!isEditing);
  };

  // get provinceName - districtName - wardName
  useEffect(() => {
    const selectCity = cities.find((p) => p.province_id === city);
    const selectDistrict = districts.find((d) => d.district_id === district);
    const selectWard = wards.find((w) => w.ward_id === ward);

    if (selectCity) {
      setCity(selectCity.province_name);
      setCityId(selectCity.province_id);
    }
    if (selectDistrict) {
      setDistrict(selectDistrict.district_name);
      setdistrictId(selectDistrict.district_id)
    }

    if (selectWard) {
      setWard(selectWard.ward_name);
    }
  }, [city, cities, districts, district, wards, ward]);


  // get province
  useEffect(() => {
    const resultCity = async () => {
      const result = await ProvinceService.resProvince();
      if (result.status === 200) {
        setCities(result?.data.results);
      }
    };
    resultCity();
  }, []);

  // get district
  useEffect(() => {
    const resultDistrict = async () => {
      const result = await ProvinceService.resDistrict(cityId);
      if (result.status === 200) {
        setDistricts(result.data?.results);
      }
    };
    resultDistrict();
  }, [city, district]);

  // get ward
  useEffect(() => {
    const resultWard = async () => {
      const result = await ProvinceService.resWard(districtId);
      if (result.status === 200) {
        setWards(result.data?.results);
      }
    };
    resultWard();
  }, [district, ward]);

  return (
    <>
        <div className={isDisable===0||isDisable===4?"mt-4 mb-10":"pointer-events-none opacity-50 mt-4 mb-10"}>
          {isEditing ? (
                <>
                  <div className="flex justify-between">
                    <p className="text-[1.7rem] p-0 m-0">{title}</p>
                    <button onClick={()=>{handleEditToggle();setDefault();setIsDisabled(0)}} className="underline font-medium text-2xl">Hủy</button>
                  </div>
                  <p className="text-gray-500 text-[1.5rem] p-0 m-0">{description}</p>

                  {/* address */}
                  {/* province / city */}
                  <AddressSelection
                    label="Tỉnh / Thành phố"
                    value={city}
                    setValue={setCity}
                    option={ArrayProVince}
                    type="province"
                  />

                  {/* District */}
                  <AddressSelection
                    label="Quận / Huyện"
                    value={district}
                    setValue={setDistrict}
                    option={ArrayDistrict}
                    type="district"
                  />

                  {/* wards */}
                  <AddressSelection
                    label="Xã / Phường / Thị Trấn"
                    value={ward}
                    setValue={setWard}
                    option={ArrayWard}
                    type="ward"
                  />

                  <InputForm 
                    lable="Số nhà" 
                    value={street} 
                    setValue={setStreet} 
                    errorMessage={streetErrorMessage} 
                    setErrorMessage={setStreetErrorMessage} 
                  />
                  <button onClick={()=>{handleUpdateAddress()}} className="px-5 py-3 bg-black rounded-2xl text-white font-medium">Lưu</button>
                </>
            ) : (
              <div className="flex justify-between">
                <div className="flex flex-col w-[80%]">
                  <p className="text-[1.7rem] p-0 m-0">{title}</p>
                  <p className="text-gray-500 text-[1.5rem]">{user?.address?
                  user?.address.street+", "+user?.address.ward+", "+user?.address.district+", "+user?.address.city:
                  "Chưa cung cấp"}</p>
                </div>
                <div className="justify-start">
                  <button onClick={()=>{handleEditToggle();setIsDisabled(4)}} className="underline font-medium text-2xl ml-16">
                    {isnull ? "Thêm" : "Sửa"}
                  </button>
                </div>
              </div>
            )}
        </div>
    </>
  )
}

const InputForm = ({ lable, value, setValue, errorMessage, setErrorMessage }) => {
  return(
    <>
      <label className={`text-2xl mt-10 font-medium ${errorMessage?"text-[#C13515] font-bold":"text-gray-900"}`}>{lable}</label>
      <div className="relative py-2 w-full">
        <input type="text"
          value={value}
          onChange={(e) => {
            setErrorMessage();
            setValue(e.target.value);
          }}
          className={`border ${errorMessage?"border-red-800 bg-[#fff8f6]":"mb-10"} rounded-2xl text-gray-700 px-[1.4rem] py-[1.2rem] w-full shadow-md`}
          required/>
      </div>
      {errorMessage &&
        <div className="flex items-center gap-2 mt-2 mb-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false" fill="#C13515" className="block h-[12px] w-[12px] mb-[0.7rem]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
            <p className="text-xl text-[#C13515]">{errorMessage}</p>
        </div>
      }
    </>
  );
};
