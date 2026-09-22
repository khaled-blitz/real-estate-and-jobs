import React from "react";
import { Props } from "./props";
import EditNumber from "@/components/common/GenericFormFields/EditNumber";
import { useLocalization } from "@/logic/localization";
import { Typography } from "antd";

interface ColdRentProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const ColdRent: React.FC<ColdRentProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  if (!isFieldVisible("price_cold_rent")) return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-end">
        {isFieldVisible("price_cold_rent") && (
          <EditNumber
            item={{
              key: "price_cold_rent",
              label: `${translate("Cold rent")} pro Monat`,
              required: isFieldRequired("price_cold_rent"),
            }}
            input={input}
            onChange={onChange}
          />
        )}
      </div>
      <Typography.Text
        className="ant-form-item-extra"
        style={{
          color: "rgba(0,0,0,0.45)",
        }}
      >
        {translate(
          "Leave this field blank if you do not want to display a price"
        )}
      </Typography.Text>
    </div>
  );
};

export default ColdRent;
