import React from "react";
import { Props } from "./props";
import EditVarchar from "@/components/common/GenericFormFields/EditVarchar";
import { useLocalization } from "@/logic/localization";

interface TitleProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Title: React.FC<TitleProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    <>
      {isFieldVisible("title") && (
        <EditVarchar
          item={{
            key: "title",
            label: translate("Title"),
            required: isFieldRequired("title"),
            maxLength: 46,
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Title;
