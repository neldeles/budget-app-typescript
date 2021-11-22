import {
  Fragment,
  useState,
  useRef,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  cloneElement,
} from "react";
import { Dialog as UiDialog, Transition } from "@headlessui/react";
import { callAll } from "utils/callAll";
import { XIcon } from "@heroicons/react/solid";

type TModalContext = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialFocusRef: React.RefObject<HTMLInputElement>;
};

export type TModalProps = {
  children: React.ReactNode;
};

// Keep context within same file as hook and Modal
//  so that we don't need to export ModalContext. We want
//  to be able to access the context only vie the useModal hook.
const ModalContext = createContext<TModalContext | undefined>(undefined);
ModalContext.displayName = "ModalContext";

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("🚨 useModal must be used within a <Modal /> component");
  }
  return context;
}

export function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const initialFocusRef = useRef<HTMLInputElement>(null);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, initialFocusRef }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.ContentBase = ContentBase;
Modal.Content = Content;
Modal.DismissButton = DismissButton;
Modal.OpenButton = OpenButton;

function ContentBase({ children }: { children: React.ReactNode }) {
  return <Dialog>{children}</Dialog>;
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <ContentBase>
      <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
        <DismissButton>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 bg-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <XIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </DismissButton>
      </div>
      {children}
    </ContentBase>
  );
}

function Dialog({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen, initialFocusRef } = useModal();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <UiDialog
        as="div"
        static
        initialFocus={initialFocusRef}
        className="overflow-y-auto fixed inset-0 z-10"
        open={isOpen}
        onClose={setIsOpen}
      >
        <div className="flex sm:block justify-center items-end sm:p-0 px-4 pt-4 pb-20 min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <UiDialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block sm:p-6 px-4 pt-5 pb-4 sm:my-8 sm:w-full sm:max-w-lg text-left align-bottom sm:align-middle bg-white rounded-lg shadow-xl transition-all transform">
              {/* this is where the closed button used to be */}
              {/* this is where the title and input fields used to be */}
              {children}
            </div>
          </Transition.Child>
        </div>
      </UiDialog>
    </Transition.Root>
  );
}

function DismissButton({ children: child }: { children: React.ReactElement }) {
  const { setIsOpen } = useModal();

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function OpenButton({ children: child }: { children: React.ReactElement }) {
  const { setIsOpen } = useModal();

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}
