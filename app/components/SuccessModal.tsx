import { LuCheck } from "react-icons/lu";
import Button from "~/components/ui/button";
import { usePricingStore } from "~/stores/employerPricingStore";
import Modal from "./dashboard/modal";


export default function SuccessModal({onClose}: {onClose: VoidFunction}) {
  const {
    isSuccess,
    openSuccessModal,
    current,
  } = usePricingStore();
  const handleClose = () => { 
    openSuccessModal(false)
    onClose()
   }
  return (
    <Modal
      isOpen={isSuccess}
      onClose={handleClose}
      title={"Subscription Successful"}
    >
      <div className="w-full text-center space-y-4">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
          <LuCheck className="size-12 text-green-600" aria-hidden="true" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {/* You can now enjoy all the features of the {current?.name} plan. */}
         Your subscription to the {current?.name} plan was successful!
        </p>
        <div className="w-full flex justify-center">
          <Button onClick={handleClose}>Done</Button>
        </div>
      </div>
    </Modal>
  );
}