import React from "react";
import { Props } from "./props";
import EditImage from "@/components/common/GenericFormFields/EditImage";

interface ThumbnailProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  return (
    <>
      {isFieldVisible("image_local") && (
        <EditImage
          item={{
            key: "image_local",
            label: "Titelbild (JPG, JPEG, PNG)",
            required: isFieldRequired("image_local"),
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Thumbnail;
