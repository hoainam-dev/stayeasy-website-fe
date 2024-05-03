import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Utilies({ Utils, value }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(value.length);
  }, [value]);

  const handleFree = (index) => {
    Utils((prev) => {
      const isU = prev.includes(index.utilitiId);

      if (isU) {
        return prev.filter((utilId) => utilId !== index.utilitiId);
      } else {
        return [...prev, index.utilitiId];
      }
    });
  };

  const loadData = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/stayeasy/util`
    );
    setData(result.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="col-span-1">
      <div className="font-medium leading-6 text-gray-900">Tiện ích</div>
      <div
        className="hover:cursor-pointer flex mt-3 items-center justify-center h-16 rounded-md p-2 px-4 ring-1 ring-gray-300 bg-white"
        onClick={handleOpen}
      >
        {value.length > 0 ? `Đã chọn ${count}` : "--- Chọn ---"}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box className="rounded-lg bg-white absolute w-[40%] p-4">
          <div className="mb-3 items-center text-[1.6em] flex justify-between">
            <span className="font-medium">Miễn phí</span>
            <button
              onClick={handleClose}
              className="border-2 p-2 border border-red-800 rounded-lg"
            >
              <XMarkIcon className="w-14" color="#FF385C" />
            </button>
          </div>

          <div className="border-y py-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4 text-[2em]">
            {data?.map((index) => (
              <div
                onClick={() => {
                  handleFree(index);
                }}
                className={`${
                  value.includes(index.utilitiId)
                    ? "bg-[#FF385C] text-white"
                    : ""
                } hover:cursor-pointer border flex items-center gap-3 p-3 rounded-lg`}
              >
                <span>
                  <XMarkIcon className="w-8" />
                </span>
                <span>{index.utilitiesName}</span>
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
