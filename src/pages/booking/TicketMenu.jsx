import React from 'react';
import { CheckCircle, Schedule, Pending, Cancel, DoneAll } from '@mui/icons-material'; // Import các icon từ Material Icons
const TicketMenu = ({ activeMenu, setActiveMenu }) => {
    const menuItems = [
        { label: 'Đang diễn ra', value: 'IN_PROGRESS', icon: <Schedule className="" /> },
        { label: 'Đã xác nhận', value: 'CONFIRMED', icon: <CheckCircle /> },
        { label: 'Chờ xác nhận', value: 'PENDING', icon: <Pending /> },
        { label: 'Đã hoàn thành', value: 'COMPLETED', icon: <DoneAll /> },
        { label: 'Đã hủy', value: 'REJECTED', icon: <Cancel /> },
      ];

      return (
        <div className="flex flex-wrap gap-10">
          {menuItems.map((item) => (
            <div
              key={item.value}
              className={`cursor-pointer flex items-center p-2 rounded-md ${
                activeMenu === item.value
                  ? 'bg-violet-500  active:bg-violet-700 focus:outline-none text-white bg-zinc-950 focus:ring focus:ring-violet-300'
                  : 'hover:bg-pink-600'
              }`}
              onClick={() => setActiveMenu(item.value)}
            >
               <span className="inline-block stroke-2 ">{item.icon}</span>
              <span className="ml-2">{item.label}</span> {/* Hiển thị label */}
            </div>
          ))}
        </div>
      );
};

export default TicketMenu;