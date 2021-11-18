import { DatePicker } from "components/atoms/DatePicker";
import { Button } from "components/atoms/Button";

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
