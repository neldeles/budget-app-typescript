import { useModal } from "components/Modal/Modal";
import { useField } from "hooks";
import { Button } from "components/Button";
import { useMutation, useQueryClient } from "react-query";
import * as walletService from "services/wallet-service";

export function CreateWalletForm() {
  const { setIsOpen, initialFocusRef } = useModal();
  const { clearState, ...walletProps } = useField("wallet", "text");

  const queryClient = useQueryClient();

  const createWalletMutation = useMutation(
    (wallet: walletService.TCreateWalletPayload) =>
      walletService.create(wallet),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("wallets");
      },
    }
  );

  const createWallet = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: walletProps.value,
    };

    createWalletMutation.mutate(payload);
  };

  return (
    <div className="mx-auto max-w-7xl ">
      <div className="sm:p-6 py-5 px-4">
        {/* possible candidate for atomic component */}
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create Wallet
        </h3>
        <form onSubmit={createWallet} className="sm:flex sm:items-center mt-5">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="email" className="sr-only">
              Wallet Name
            </label>
            <input
              {...walletProps}
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
          <div className="inline-flex items-center mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto">
            <Button
              variant="primary"
              width="default"
              type="submit"
              onClick={() => setIsOpen(false)}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
