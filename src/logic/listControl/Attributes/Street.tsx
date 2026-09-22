import React from "react";
import { Props } from "./props";
import EditVarchar from "@/components/common/GenericFormFields/EditVarchar";
import { useLocalization } from "@/logic/localization";

interface StreetProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Street: React.FC<StreetProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    <>
      {isFieldVisible("street") && (
        <EditVarchar
          item={{
            key: "street",
            label: translate("Street"),
            required: isFieldRequired("street"),
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Street;
