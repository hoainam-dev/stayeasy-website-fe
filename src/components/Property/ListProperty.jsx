import axios from "axios";
import React, { useEffect, useState, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import {
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/solid";
import { Listbox, Transition } from "@headlessui/react";
import { DeleteAlert } from "../Alert/Alert";
import { UserContext } from "../UserContext";
import image from "../../assets/image/notfound.png";

export default function ListProperty() {
  // get user
  const isAuthenticated = useContext(UserContext).isAuthenticated;
  const user = useContext(UserContext).user;
 
  const userId = user?.id;

  const [data, setData] = useState([]);


  // get data

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/stayeasy/property`
      );

      if (response.status === 200) {
        setData(response.data.properties);
      }
    } catch (error) {
      console.error("da xay ra loi: ", error);
    }
  };

  // get data
  useEffect(() => {
    fetchData();
  }, []);

  console.log("data: ", data);

  // handle delete property
  const handleDelete = async (propertyId) => {
    try {
      await DeleteAlert(async () => {
        const res = await axios.delete(
          `http://localhost:8080/api/v1/stayeasy/property/delete/${propertyId}`
        );
        if (res.status === 200) {
          fetchData();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [status, setStatus] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <div className="mx-4 my-4 min-h-[70vh] min-w-[82vw]">
          <div className="flex mb-4 justify-content-between">
            <h2>Danh sách tài sản</h2>
            <div className="flex">
              <div className="me-4">
                <Status status={status} setStatus={setStatus} />
              </div>

              <Link to="/host/property/add">
                <button
                  type="button"
                  className="bg-[#ff385c] h-full border rounded-lg text-[1.6em] flex items-center text-white py-2 px-3 rounded-lg"
                >
                  <span>Thêm</span>
                  <span>
                    <PlusIcon className="w-8 ml-2" color="white" />
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {data?.filter((item) => item.owner.id === userId)?.length > 0 ? (
            <table class="w-full text-left text-gray-700 table-hover">
              <thead className="bg-gray-200">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    Hình ảnh
                  </th>
                  <th scope="col" className="py-3">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Địa chỉ
                  </th>
                  <th scope="col" className="py-3">
                    Giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                  <th scope="col" className="py-3">
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody>
                {data
                  ?.filter((item) => item.owner.id === userId)
                  ?.map((index) => (
                    <tr
                      key={index.propertyId}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="pr-6 pl-2 py-4">
                        <img
                          className="w-40 h-20 object-cover rounded-lg"
                          src={index.thumbnail}
                          alt=""
                        />
                      </td>
                      <td className="py-4">{index.propertyName}</td>
                      <td className="px-6 py-4">{index.address}</td>
                      <td className="py-4">$ {index.price}</td>
                      <td className="px-6 py-4">
                        {index.null === false ? "trống" : "Đang diễn ra"}
                      </td>
                      <td className="">
                        {/* <Link to={`/property/list-property/delete/${index.propertyId}`}> */}
                        <button
                          onClick={() => handleDelete(index.propertyId)}
                          className="p-2"
                        >
                          <TrashIcon className="w-7" color="#ff385c" />
                        </button>
                        {/* </Link> */}
                        <Link to={`/host/property/update/${index.propertyId}`}>
                          <button className="mx-2 p-2">
                            <PencilSquareIcon color="#eab308" className="w-7" />
                          </button>
                        </Link>

                        <Link to={`/explore/detail/${index.propertyId}`}>
                          <button className="p-2">
                            <EyeIcon className="w-7" color="gray" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center">
              <span>
                <img
                  src={image}
                  alt="not found"
                />
              </span>
              <span className="block font-medium">Chưa có tài sản.</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex  flex-col justify-center items-center mt-4 text-[1.2em] gap-4">
          <span>Bạn chưa đăng nhập!</span>
          <Link to="/login">
            <button className="bg-[#FF385C] text-white py-2 px-4 rounded-lg text-[1.3em]">
              Đăng nhập
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

const people = [
  {
    id: 1,
    name: "Trống",
  },
  {
    id: 2,
    name: "Đang diễn ra",
  },
  {
    id: 3,
    name: "Tất cả",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Status = ({ status, setStatus }) => {
  const [selected, setSelected] = useState(people[2]);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative w-56">
            <Listbox.Button className="relative h-16 border w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:leading-6">
              <span className="flex items-center">
                <span className="flex items-center block">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {people.map((person) => (
                  <Listbox.Option
                    key={person?.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 me-3 block truncate h-10 items-center flex"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};