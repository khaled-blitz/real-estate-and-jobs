import React from "react";
import { Props } from "./props";
import EditPhone from "@/components/common/GenericFormFields/EditPhone";
import { useLocalization } from "@/logic/localization";

interface PhoneProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Phone: React.FC<PhoneProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    <>
      {isFieldVisible("phone") && (
        <EditPhone
          item={{
            key: "phone_number",
            label: "Publizierte Telefonnummer",
            required: isFieldRequired("phone_number"),
            description: translate(
              "Diese Telefonnummer wird in der Anzeige publiziert. Bitte geben Sie mindestens eine E-Mailadresse oder Telefonnummer ein, damit Sie von  den Interessenten kontaktiert werden können."
            ),
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Phone;
