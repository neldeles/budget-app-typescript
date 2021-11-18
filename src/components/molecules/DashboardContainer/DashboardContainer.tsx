/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, MenuIcon } from "@heroicons/react/outline";

// Components
import { Sidebar, TSidebarProps } from "../Sidebar/Sidebar";
import { TUser } from "types/global";

export type TDashboardContainerProps = {
  pageContent: React.ReactNode;
  /** Optional header of the Dashboard */
  header?: React.ReactNode;
  user: TUser;
};

export function DashboardContainer({
  header,
  user,
  pageContent,
}: TDashboardContainerProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebar = (
    <Sidebar title="Budget App" footer={<Sidebar.Footer user={user} />} />
  );

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="flex overflow-hidden h-screen bg-gray-100">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="flex md:hidden fixed inset-0 z-40"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="flex relative flex-col flex-1 w-full max-w-xs bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 pt-2 -mr-12">
                    <button
                      type="button"
                      className="flex justify-center items-center ml-1 w-10 h-10 rounded-full focus:ring-2 focus:ring-inset focus:ring-white focus:outline-none"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {sidebar}
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:fixed md:inset-y-0 md:flex-col md:w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
            {sidebar}
          </div>
        </div>
        <div className="flex flex-col flex-1 md:pl-64">
          <div className="md:hidden sticky top-0 z-10 pt-1 sm:pt-3 pl-1 sm:pl-3 bg-gray-100">
            <button
              type="button"
              className="inline-flex justify-center items-center -mt-0.5 -ml-0.5 w-12 h-12 text-gray-500 hover:text-gray-900 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              {header}
              <div className="px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
                {/* Replace with your content */}
                {pageContent}
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
