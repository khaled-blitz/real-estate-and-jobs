import React from "react";
import { Props } from "./props";
import EditNumber from "@/components/common/GenericFormFields/EditNumber";
import { useLocalization } from "@/logic/localization";

interface ChargesProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Charges: React.FC<ChargesProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    <>
      {isFieldVisible("price_charges") && (
        <EditNumber
          item={{
            key: "price_charges",
            label: `${translate("Charges")} pro Monat`,
            required: isFieldRequired("price_charges"),
            description: translate(
              "Leave this field blank if you do not want to display a price"
            ),
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Charges;
