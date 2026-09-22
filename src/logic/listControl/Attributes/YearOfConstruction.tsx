import React from "react";
import { Props } from "./props";
import { useLocalization } from "@/logic/localization";
import EditVarchar from "@/components/common/GenericFormFields/EditVarchar";

interface YearOfConstructionProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const YearOfConstruction: React.FC<YearOfConstructionProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  if (!isFieldVisible("year_of_construction")) return null;
  return (
    <EditVarchar
      item={{
        key: "year_of_construction",
        label: translate("Year of construction"),
        required: isFieldRequired("year_of_construction"),
      }}
      input={input}
      onChange={onChange}
    />
  );
};

export default YearOfConstruction;
