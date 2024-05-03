import React, { useEffect, useState } from "react";
import "./admin.scss";
import Footer from "../../components/footer/Footer";
import Statistical from "../../components/adminComponents/Statistical";
import PostManage from "../../components/adminComponents/PostManage";
import AccountManage from "../../components/adminComponents/AccountManage";
import Seting from "../../components/adminComponents/Seting";
import { Link, useNavigate } from "react-router-dom";

import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import CommonHeader from "../../components/header/CommonHeader";
import { Alert } from "../../components/Alert/Alert";

function AdminDarhBoard({ role }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (role && !role.includes("ROLE_ADMIN")) {
      Alert(
        3000,
        "Thông báo",
        "Bạn không có quyền truy cập. Hãy thử đăng nhập tài khoản khác",
        "error",
        "OK"
      );
      navigate("/");
    }
  }, [role]);

  const sidebar = [
    {
      cate: "Thống kê",
      icon: (
        <PresentationChartBarIcon className="h-7 w-7 max-[1200px]:h-12 max-[1200px]:w-12" />
      ),
      component: <Statistical></Statistical>,
    },
    {
      cate: "Bài đăng",
      icon: (
        <ArchiveBoxIcon className="h-7 w-7 max-[1200px]:h-12 max-[1200px]:w-12" />
      ),
      component: <PostManage></PostManage>,
    },
    // { cate: "Đặt phòng", icon:<ClipboardDocumentListIcon className="h-7 w-7 max-[1200px]:h-12 max-[1200px]:w-12" />, component: <BookingManage></BookingManage> },
    {
      cate: "Tài khoản",
      icon: (
        <UserCircleIcon className="h-7 w-7 max-[1200px]:h-12 max-[1200px]:w-12" />
      ),
      component: <AccountManage></AccountManage>,
    },
    {
      cate: "Cài đặt",
      icon: (
        <Cog6ToothIcon className="h-7 w-7 max-[1200px]:h-12 max-[1200px]:w-12" />
      ),
      component: <Seting></Seting>,
    },
  ];
  // const user = useContext(UserContext).user;

  const [isActive, setActive] = useState(sidebar[0]);
  return role && role.includes("ROLE_ADMIN") ? (
    <>
      <CommonHeader padding={24}></CommonHeader>
      <div className="flex h-full w-full mt-32">
        {/* left menu */}
        <Card className="h-[calc(100vh-0)] w-[20rem] max-w-[24rem] py-4 px-2 shadow-xl shadow-blue-gray-900/5">
          <List>
            {sidebar.map((e, i) => {
              return (
                <Link to={e.link} onClick={() => setActive(e)}>
                  <ListItem>
                    <ListItemPrefix>{e.icon}</ListItemPrefix>
                    <h4 className="max-[1200px]:hidden w-full text-3xl">
                      {e.cate}
                    </h4>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Card>
        <div className="w-full p-10 bg-gray-100">{isActive.component}</div>
      </div>
      <Footer></Footer>
    </>
  ) : (
    <></>
  );
}

export default AdminDarhBoard;
