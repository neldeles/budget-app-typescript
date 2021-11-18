import React from "react";
import { DatePicker } from "components/atoms/DatePicker";
import { Button } from "components/atoms/Button";
import { Modal } from "components/atoms/Modal";
import { useModal } from "components/atoms/Modal/Modal";
import { useField } from "hooks";

const CategoryGroupForm = () => {
  const { setIsOpen, initialFocusRef } = useModal();
  const { clearState, ...categoryGroupProps } = useField(
    "categoryGroup",
    "text"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(categoryGroupProps.value);
  };

  return (
    <div className="mx-auto max-w-7xl ">
      <div className="sm:p-6 py-5 px-4">
        {/* possible candidate for atomic component */}
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create Category Group
        </h3>
        <form onSubmit={handleSubmit} className="sm:flex sm:items-center mt-5">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="email" className="sr-only">
              Category Group
            </label>
            <input
              {...categoryGroupProps}
              ref={initialFocusRef}
              className="block w-full sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
              placeholder=""
              required
              autoFocus
              type="text"
            />
          </div>
          <div className="inline-flex items-center mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              width="default"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Cancel
            </Button>
          </div>
          {/* <button
          type="cancel"
          className="inline-flex justify-center items-center py-2 px-4 mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
          onClick={handleCancel}
        >
          Cancel
        </button> */}
          <div className="inline-flex items-center mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto">
            <Button variant="primary" width="default" type="submit">
              Save
            </Button>
          </div>
          {/* <button
          type="submit"
          className="inline-flex justify-center items-center py-2 px-4 mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
        >
          Save
        </button> */}
        </form>
      </div>
    </div>
  );
};

export function Header() {
  const setModal = () => {
    console.log("button clicked");
  };
  return (
    <>
      <div className="py-5 px-4 sm:px-6 mx-auto max-w-7xl bg-gray-100">
        <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center -mt-4 -ml-4">
          <div className="flex mt-4 md:mt-0 ml-4">
            <div className="mr-4">
              <DatePicker />
            </div>
            <Modal>
              <Modal.OpenButton>
                <Button
                  variant="primary"
                  width="default"
                  hasIcon={true}
                  onClick={setModal}
                >
                  Create Category Group
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Button>
              </Modal.OpenButton>
              <Modal.Content>
                <CategoryGroupForm />
              </Modal.Content>
            </Modal>
          </div>
          <div className="flex flex-col justify-end mt-6 sm:mt-2 mr-4">
            <h2 className="text-2xl sm:text-3xl font-bold leading-7 text-green-600 sm:truncate">
              Php 1000.00
            </h2>
            <p className="text-sm italic font-medium text-center text-gray-500">
              to be budgeted
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
