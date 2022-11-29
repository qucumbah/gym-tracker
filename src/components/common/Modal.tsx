import React from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactElement;
}> = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog open={isOpen} onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 grid place-items-center">
            <Dialog.Panel className="rounded bg-white p-6 shadow-xl">
              <Dialog.Title className="font-bold text-lg mb-4">{title}</Dialog.Title>
              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
