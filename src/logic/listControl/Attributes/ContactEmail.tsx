import React from "react";
import { Props } from "./props";
import EditEmail from "@/components/common/GenericFormFields/EditEmail";
import { useLocalization } from "@/logic/localization";

interface EmailProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const ContactEmail: React.FC<EmailProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    <>
      {isFieldVisible("email") && (
        <EditEmail
          item={{
            key: "email",
            label: translate("Contact Email"),
            required: isFieldRequired("email"),
            description: translate(
              "Über diese E-Mail Adresse erhalten Sie Benachrichtigung. Diese E-Mailadresse wird nicht publiziert."
            ),
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default ContactEmail;
