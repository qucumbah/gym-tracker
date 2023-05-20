import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

export default function ParamSelector<T extends string>({
  label,
  options,
  selected,
  setSelected,
}: {
  label: string;
  options: T[];
  selected: T;
  setSelected: (newCurrent: T) => void;
}) {
  return (
    <label className="py-1 flex items-center gap-2">
      <span className="w-20">{label}:</span>
      <div className="w-72">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md">
              <div>{selected}</div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <div className="relative aspect-square w-6">
                  <Image src="/expand_more.svg" fill sizes="100vw" alt="" />
                </div>
              </div>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="ease-out duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              enter="ease-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    value={option}
                    className={
                      "relative cursor-default select-none py-2 pl-10 pr-4"
                    }
                  >
                    {({ selected: isSelected }) => (
                      <>
                        <div
                          className={`block truncate ${
                            isSelected ? "font-bold" : "font-normal"
                          }`}
                        >
                          {option}
                        </div>
                        {isSelected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <div className="relative aspect-square w-4">
                              <Image
                                src="/heart.svg"
                                fill
                                sizes="100vw"
                                alt=""
                              />
                            </div>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </label>
  );
}
