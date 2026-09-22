import React from "react";
import { Props } from "./props";
import EditNumber from "@/components/common/GenericFormFields/EditNumber";
import { useLocalization } from "@/logic/localization";

interface PropertyAreaProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const PropertyArea: React.FC<PropertyAreaProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    <>
      {isFieldVisible("property_area") && (
        <EditNumber
          item={{
            key: "property_area",
            label: translate("Property area"),
            required: isFieldRequired("property_area"),
          }}
          input={input}
          onChange={(value) => onChange(value)}
        />
      )}
    </>
  );
};

export default PropertyArea;
