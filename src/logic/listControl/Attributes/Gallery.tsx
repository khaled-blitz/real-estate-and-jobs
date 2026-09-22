import React from "react";
import { Props } from "./props";
import EditImage from "@/components/common/GenericFormFields/EditImage";

interface GalleryProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Gallery: React.FC<GalleryProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  return (
    <>
      {isFieldVisible("gallery") && (
        <EditImage
          item={{
            key: "gallery",
            label: "Weitere Bilder (JPG, JPEG, PNG)",
            required: isFieldRequired("gallery"),
            multiple: true,
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Gallery;
