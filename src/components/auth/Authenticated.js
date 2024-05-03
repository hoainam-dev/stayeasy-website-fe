import React, { useContext, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../../redux-tookit/actions/authActions";
import { UserContext } from "../UserContext";

// Component show menu when authenticated
export default function Authenticated() {
  const navigate = useNavigate();

  // method logout
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const roleUser = useContext(UserContext).user?.roles;
  useEffect(()=>{
    if(!roleUser){
      return;
    }
  },[roleUser])

  return (
    <>
      <Dropdown.Menu className="w-[23rem] h-[fit] border-white rounded-full shadow-lg">
        <Dropdown.Item>
          <Link to={"/inbox"} className="w-full">
            <p className="text-2xl font-medium px-2 mt-2">Tin nhắn</p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="/trips" className="w-full">
            <p className="text-2xl font-medium px-2 mt-2">Chuyến đi</p>
          </Link>
        </Dropdown.Item>
        {roleUser.includes("ROLE_HOST")&&(
          <Dropdown.Item>
            <Link className="w-full" to="/host/property/statistic">
              <p className="text-2xl font-medium px-2 mt-2">
                Quản lý tài sản
              </p>
            </Link>
        </Dropdown.Item>
        )}

        {roleUser.includes("ROLE_ADMIN")&&(
          <Dropdown.Item>
            <Link className="w-full" to="/admin-dashboard">
              <p className="text-2xl font-medium px-2 mt-2">
                Trang quản trị
              </p>
            </Link>
        </Dropdown.Item>
        )}
        <Dropdown.Item>
          <Link className="w-full">
            <p className="text-2xl font-medium px-2 mt-2">
              Danh sách yêu thích
            </p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link className="w-full">
            <p className="text-2xl font-medium px-2 mt-2">Thông báo</p>
          </Link>
        </Dropdown.Item>
        <hr />
        <Dropdown.Item>
          <Link to="/" className="w-full">
            <p className="text-2xl px-2 mt-2">Cho thuê chỗ ở qua Stayeasy</p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="/account-settings" className="w-full">
            <p className="text-2xl px-2 mt-2">Tài khoản</p>
          </Link>
        </Dropdown.Item>
        <hr />
        <Dropdown.Item>
          <div className="w-full">
            <p className="text-2xl mt-2 px-2">Trung tâm trợ giúp</p>
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div
            onClick={() => {
              handleLogout();
            }}
            className="w-full"
          >
            <p className="text-2xl mt-2 px-2">Đăng xuất</p>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
}
