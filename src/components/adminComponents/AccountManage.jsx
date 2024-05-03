import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInformation,
  updateRole,
} from "../../redux-tookit/actions/userActions";
import { counterSelector } from "../../redux-tookit/selector";
import { Alert } from "../Alert/Alert";

function AccountManage() {
  const dispatch = useDispatch();

  const counter = useSelector(counterSelector);

  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/admin/user/all`)
      .then(function (response) {
        // console.log("data: ", response.data);
        setDataUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [counter]);

  const options = [
    { label: "HOST", value: "HOST" },
    { label: "USER", value: "USER" },
  ];

  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
  const [isEditingIndex, setIsEditingIndex] = useState(null); // Trạng thái để theo dõi hàng nào đang được chỉnh sửa

  // Hàm mở chế độ chỉnh sửa cho hàng được chọn
  const openEditing = (index) => {
    setIsEditingIndex(index);
    setIsMultiSelectOpen(true); // Mở MultiSelect khi nhấp vào nút "Edit"
  };

  // Hàm đóng MultiSelect
  const closeMultiSelect = () => {
    setIsMultiSelectOpen(false);
    setSelected([]);
  };

  const handleUpdateRole = (id) => {
    if (selected.length !== 0) {
      const roles = selected.map((select) => select.value);
      dispatch(updateRole(id, roles, setIsMultiSelectOpen));
    }
    Alert(2000, "Thông báo", "Không được bỏ trống", "error", "OK");
  };

  const [selected, setSelected] = useState([]);
  return (
    <div className="shadow-lg bg-white p-8 rounded-lg h-[calc(100vh-0px)]">
      <h1>Bảng thống kê account</h1>
      <Table striped bordered hover className="text-3xl">
        <thead>
          <tr>
            <th>stt</th>
            <th>họ</th>
            <th>tên</th>
            <th>email</th>
            <th>địa chỉ</th>
            <th>quyền</th>
          </tr>
        </thead>
        <tbody>
          {dataUser.map((e, i) => {
            if (!e.roles.includes("ROLE_ADMIN")) {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.lastName}</td>
                  <td>{e.firstName}</td>
                  <td>{e.email}</td>
                  <td>{e.address ? e.address.city : ""}</td>
                  <td className=" pr-10">
                    <div className="flex justify-between">
                      <p>
                        {e.roles
                          .map((role) => role.replace("ROLE_", ""))
                          .join(", ")}
                      </p>
                      {isEditingIndex === i && isMultiSelectOpen ? (
                        <button
                          className="w-[10rem] py-2 bg-red-500 rounded-md"
                          onClick={() => closeMultiSelect(i)}
                        >
                          Hủy
                        </button>
                      ) : (
                        <button
                          className="w-[10rem] py-2 bg-gray-300 rounded-md"
                          onClick={() => openEditing(i)}
                        >
                          Chỉnh sửa
                        </button>
                      )}
                    </div>
                    {isEditingIndex === i &&
                      isMultiSelectOpen && ( // Kiểm tra nếu hàng này đang được chỉnh sửa và MultiSelect đang mở
                        <>
                          <hr />
                          <div className="flex gap-4 mt-3">
                            <MultiSelect
                              className="w-full"
                              options={options}
                              value={selected}
                              onChange={(value) => {
                                setSelected(value);
                              }}
                              labelledBy="Select"
                            />
                            <button
                              className="w-[14rem] bg-gray-300 rounded-md"
                              onClick={() => {
                                handleUpdateRole(e.id);
                              }}
                            >
                              Lưu
                            </button>{" "}
                            {/* Nút để đóng MultiSelect */}
                          </div>
                        </>
                      )}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default AccountManage;
