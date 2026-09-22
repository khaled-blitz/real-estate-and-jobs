import React from "react";
import { Props } from "./props";
import { useLocalization } from "@/logic/localization";
import EditVarchar from "@/components/common/GenericFormFields/EditVarchar";

interface LastRenovationProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const LastRenovation: React.FC<LastRenovationProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  if (!isFieldVisible("last_renovation")) return null;
  return (
    <EditVarchar
      item={{
        key: "last_renovation",
        label: translate("Last renovation"),
        required: isFieldRequired("last_renovation"),
      }}
      input={input}
      onChange={onChange}
    />
  );
};

export default LastRenovation;
