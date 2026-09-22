import React from "react";
import { Props } from "./props";
import EditEmail from "@/components/common/GenericFormFields/EditEmail";
import { useLocalization } from "@/logic/localization";

interface EmailProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const DisplayEmail: React.FC<EmailProps> = ({
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
            key: "display_email",
            label: translate("Display Email"),
            required: isFieldRequired("display_email"),
            description: translate(
              "Diese E-Mailadresse wird in der Anzeige publiziert."
            ),
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default DisplayEmail;
