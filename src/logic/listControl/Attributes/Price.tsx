import React from "react";
import { Props } from "./props";
import EditNumber from "@/components/common/GenericFormFields/EditNumber";
import { useLocalization } from "@/logic/localization";

interface PriceProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Price: React.FC<PriceProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    <>
      {isFieldVisible("price") && (
        <EditNumber
          item={{
            key: "price",
            label: translate("Price"),
            required: isFieldRequired("price"),
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

export default Price;
