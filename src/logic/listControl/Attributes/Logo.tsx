import React from "react";
import { Props } from "./props";
import EditImage from "@/components/common/GenericFormFields/EditImage";

interface LogoProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Logo: React.FC<LogoProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  return (
    <>
      {isFieldVisible("logo") && (
        <EditImage
          item={{
            key: "logo",
            label: "Logo (JPG, JPEG, PNG)",
            required: isFieldRequired("logo"),
            maxSize: 512,
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Logo;
