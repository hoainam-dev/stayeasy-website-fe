import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectAddress({
  label,
  option,
  value,
  setValue,
  type,
}) {
  const [selected, setSelected] = useState(value);

  return (
    <div className="col-span-full">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block font-medium leading-6 text-gray-900">
              {label}
            </Listbox.Label>
            <div className="relative mt-3">
              <Listbox.Button className="relative w-full h-16 border cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:leading-6">
                <span className="flex items-center">{selected}</span>
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
                  {option?.map((item) => (
                    <Listbox.Option
                      onClick={() =>
                        setValue(
                          type === "province"
                            ? item?.province_id
                            : type === "district"
                            ? item?.district_id
                            : item?.ward_id
                        )
                      }
                      key={
                        type === "province"
                          ? item?.province_name
                          : type === "district"
                          ? item?.district_name
                          : item?.ward_name
                      }
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative h-14 content-center cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={
                        type === "province"
                          ? item?.province_name
                          : type === "district"
                          ? item?.district_name
                          : item?.ward_name
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center ml-3 block h-10 pt-2 truncate">
                            {type === "province"
                              ? item?.province_name
                              : type === "district"
                              ? item?.district_name
                              : item?.ward_name}
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
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
    </div>
  );
}
