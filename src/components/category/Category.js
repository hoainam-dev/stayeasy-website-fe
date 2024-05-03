import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Category({ valueOptions, value }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [count, setCount] = useState(0);


  useEffect(() => {
    setCount(value.length);
  }, [value]);

  const handleCategories = (index) => {
    valueOptions((prev) => {
      const isR = prev.includes(index.categoryId);
      if (isR) {
        return prev.filter((categoryId) => categoryId !== index.categoryId);
      } else {
        return [...prev, index.categoryId];
      }
    });
  };

  const loadData = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/stayeasy/category`
    );
    setData(result.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // CATEGORY
  // const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <div className="col-span-1">
      <div className="font-medium leading-6 text-gray-900">Danh mục</div>
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
          <div className="flex itemsl-center justify-between text-[1.6em]">
            <div className="font-medium">Danh mục</div>

            <div className="mb-3 flex justify-end" onClick={handleClose}>
              <button className="border-2 border p-2 border-red-800 rounded-lg">
                <XMarkIcon className="w-14" color="#FF385C" />
              </button>
            </div>
          </div>

          <div className="border-y py-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
            {data?.map((index) => (
              <div
                key={index.categoryId}
                onClick={() => handleCategories(index)}
                className={`${
                  value.includes(index.categoryId)
                    ? "bg-[#FF385C] text-white"
                    : ""
                } hover:cursor-pointer border flex items-center gap-3 p-3 rounded-lg text-[2em]`}
              >
                <span>
                  <XMarkIcon className="w-8" />
                </span>
                <span>{index.categoryName}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={handleClose}
              className="bg-indigo-600 text-white py-2 px-3 font-medium rounded-lg text-[2em]"
            >
              Lưu
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
