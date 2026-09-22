import React from "react";
import { Props } from "./props";
import { useLocalization } from "@/logic/localization";
import EditVarchar from "@/components/common/GenericFormFields/EditVarchar";

interface AdditionalDetailsProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    <>
      {isFieldVisible("insert_internet_link") && (
        <EditVarchar
          item={{
            key: "insert_internet_link",
            label: translate("Insert internet link"),
            required: isFieldRequired("insert_internet_link"),
          }}
          input={input}
          onChange={onChange}
        />
      )}
      {isFieldVisible("insert_link_name") && (
        <EditVarchar
          item={{
            key: "insert_link_name",
            label: translate("Insert link name"),
            required: isFieldRequired("insert_link_name"),
          }}
          input={input}
          onChange={onChange}
        />
      )}
      {isFieldVisible("company_published") && (
        <EditVarchar
          item={{
            key: "company_published",
            label: translate("Company published"),
            required: isFieldRequired("company_published"),
          }}
          input={input}
          onChange={onChange}
        />
      )}
      {isFieldVisible("name_published") && (
        <EditVarchar
          item={{
            key: "name_published",
            label: translate("Name published"),
            required: isFieldRequired("name_published"),
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default AdditionalDetails;
