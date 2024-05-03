import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Rule({ Rules, value }) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(value.length);
  }, [value]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRules = (index) => {
    Rules((prev) => {
      const isR = prev.includes(index.rulesId);
      if (isR) {
        return prev.filter((rulesId) => rulesId !== index.rulesId);
      } else {
        return [...prev, index.rulesId];
      }
    });
  };

  const loadData = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/stayeasy/rules`
    );
    setData(result.data);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="col-span-1">
      <div className="font-medium leading-6 text-gray-900">Quy tắc</div>
      <div
        className="hover:cursor-pointer flex mt-3 items-center justify-center h-16 rounded-md p-2 px-4 ring-1 ring-gray-300 bg-white"
        onClick={handleOpen}
      >
        {value?.length > 0 ? `Đã chọn ${count}` : "--- Chọn ---"}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box className="rounded-lg bg-white absolute w-[40%] p-4">
          <div className="flex items-center justify-between text-[1.6em] mb-2">
            <div className="font-medium">Nội quy thuê tài sản</div>

            <div className=" flex justify-end" onClick={handleClose}>
              <button className="border-2 border border-red-800 rounded-lg p-2">
                <XMarkIcon className="w-14" color="#FF385C" />
              </button>
            </div>
          </div>

          <div className="border-y py-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4 text-[2em]">
            {data?.map((index) => (
              <div
                key={index.rulesId}
                onClick={() => handleRules(index)}
                className={`${
                  value?.includes(index.rulesId) ? "bg-[#FF385C] text-white" : ""
                } hover:cursor-pointer border flex items-center gap-3 p-3 rounded-lg`}
              >
                <span>
                  <XMarkIcon className="w-14" />
                </span>
                <span>{index.rulesName}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={handleClose}
              className="bg-indigo-600 text-[2em] text-white py-2 px-3 font-medium rounded-lg"
            >
              Lưu
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
