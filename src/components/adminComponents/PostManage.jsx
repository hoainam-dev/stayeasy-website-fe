import axios from "axios";
import React from "react";
import "./common.scss";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Calendar from "./Calendar";
import PropertyStatistical from "./PropertyStatistical";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function PostManage() {
  const [data, setData] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const [active, setActive] = useState();
  const [isFixed, setIsFixed] = useState(false);
  // console.log("active: ", active);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/stayeasy/property`
      );

      if (response.status === 200) {
        setData(response.data.properties);
        // console.log(response.data);
        setActive(response?.data.properties[0]?.propertyId);
      }
    } catch (error) {
      console.error("da xay ra loi: ", error);
    }
  };

  // get data
  useEffect(() => {
    fetchData();
  }, []);

  // handle delete property
  const handleDelete = (propertyId) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");

    // If the user confirms, proceed with the deletion
    if (isConfirmed) {
      fetch(
        `http://localhost:8080/api/v1/stayeasy/property/delete/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            alert(`Xóa không thành công: ${propertyId}`);
            throw new Error(`Xóa không thành công: ${res.status}`);
          }
          // console.log(res.status);
          // Update the state with the new property list
          fetchData();
          // alert(`Xóa thành công: ${propertyId}`);
        })
        .catch((e) => console.error("Lỗi khi xóa: ", e));
    } else {
      // If the user cancels, show a message
      alert(`Đã hủy xóa: ${propertyId}`);
    }
  };

  const handleSearch = () => {
    // console.log("keySearch: ", keySearch);
    axios
      .get(
        `http://localhost:8080/api/v1/stayeasy/admin/property/search?keySearch=${keySearch}`
      )
      .then(function (response) {
        console.log("response: ", response.data);
        setData(response.data);
        setActive(response.data[0].propertyId);
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  };

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    // Kiểm tra xem vị trí cuộn có vượt qua một khoảng cách nhất định không
    if (scrollPosition > 500) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Row>
      <Col xs={6} style={{ height: "90vh", overflowY: "auto" }}>
        <h1 className="text-3xl pt-4">Danh sách phòng</h1>
        <div className="py-2 mb-2">
          <div className="flex justify-start border-2 border-black w-full rounded-full p-2 bg-white">
            <input
              type="text"
              className="search-text pl-4 rounded-lg w-full"
              value={keySearch}
              onChange={(e) => {
                setKeySearch(e.target.value);
              }}
              id="keySerch"
              name="keySearch"
              placeholder="Tìm kiếm"
            />
            <SearchIcon
              onClick={handleSearch}
              className="cursor-pointer p-2 bg-primary text-white rounded-full"
              style={{ width: "30px", height: "30px" }}
            ></SearchIcon>
          </div>
        </div>
        <table class="table table-hover p-10">
          <thead>
            <tr>
              <th style={{ paddingLeft: "4rem" }} scope="col">
                Thông tin tài sản
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Chủ sở hữu
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Địa chỉ
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Giá
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((index) => (
              <tr
                key={index.propertyId}
                className={active === index.propertyId ? "activePr" : ""}
                onClick={() => setActive(index.propertyId)}
              >
                <td scope="row" className="p-4">
                  <div className="flex flex-col pl-10 w-fit">
                    <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden">
                      <img
                        src={index.thumbnail}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                    <p className="text-2xl font-semibold">
                      {index.propertyName}
                    </p>
                  </div>
                </td>
                <td scope="row" className="align-middle">
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      {index.owner.avatar ? (
                        <img
                          className="object-cover rounded-full"
                          src={index.owner.avatar}
                          alt=""
                        />
                      ) : (
                        <div class="relative inline-flex items-center justify-center overflow-hidden bg-black rounded-full dark:bg-gray-600">
                          <span class="font-medium text-2xl text-white dark:text-gray-300">
                            {index.owner.lastName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="w-[100px] text-[13px] font-semibold mb-4">{`${index.owner.firstName} ${index.owner.lastName}`}</p>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex w-full h-full justify-center items-center">
                    <p className="text-[13px] m-0 p-4">{index.address}</p>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="flex w-full h-full justify-center items-center">
                    <p className="text-[13px] m-0">{index.price}</p>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="w-[100px] flex justify-center items-center">
                    <TrashIcon
                      onClick={() => handleDelete(index.propertyId)}
                      className="w-8 text-red-600"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>

      <Col xs={6} className="relative">
        <PropertyStatistical
          zoom={0.5}
          propertyId={active}
        ></PropertyStatistical>
        <div className={`${isFixed ? "fixed top-0" : ""}`}>
          <Calendar propertyId={active}></Calendar>
        </div>
      </Col>
    </Row>
  );
}
