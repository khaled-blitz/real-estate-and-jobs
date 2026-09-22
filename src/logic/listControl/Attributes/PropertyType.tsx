import React from "react";
import { Props } from "./props";
import { useLocalization } from "../../localization";
import EditEnum from "@/components/common/GenericFormFields/EditEnum";

interface PropertyTypeProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
  optionsList: { [key: string]: string[] };
}

const PropertyType: React.FC<PropertyTypeProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  optionsList,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    <>
      {isFieldVisible("property_type") && (
        <EditEnum
          item={{
            key: "property_type",
            label: translate("Property type"),
            options: optionsList["property_type"] || [],
            required: isFieldRequired("property_type"),
          }}
          input={input}
          onChange={(value) => onChange(value)}
        />
      )}
    </>
  );
};

export default PropertyType;
