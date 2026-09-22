import React from "react";
import { Props } from "./props";
import EditRichText from "@/components/common/GenericFormFields/EditRichText";
import { useLocalization } from "@/logic/localization";

interface DescriptionProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Description: React.FC<DescriptionProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    <>
      {isFieldVisible("description") && (
        <EditRichText
          item={{
            key: "description",
            label: translate("Description"),
            required: isFieldRequired("description"),
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Description;
