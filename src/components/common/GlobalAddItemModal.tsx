import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ENV } from "@/logic/utils/constants";
import AddEditItemForm from "@/logic/listControl/AddAttributeModal";
import { useModal } from "../providers/ModalContext";

const GlobalAddItemModal = () => {
  const { isModalOpen, closeModal } = useModal();

  return (
    <GoogleReCaptchaProvider reCaptchaKey={ENV.CAPTCHA_KEY}>
      <AddEditItemForm
        type="ADD"
        isModalOpen={isModalOpen}
        setIsModalOpen={(open) => (open ? undefined : closeModal())}
      />
    </GoogleReCaptchaProvider>
  );
};

export default GlobalAddItemModal;
