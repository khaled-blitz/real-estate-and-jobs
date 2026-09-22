/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Props } from "./props";
import EditUiManagerInput from "@/components/common/GenericFormFields/EditUiManagerInput";
import { ENV } from "@/logic/utils/constants";
import styled from "styled-components";
import { Form } from "antd";

const CustomDiv = styled.div`
  .geocode-button {
    display: none;
  }
  .address-input {
    border-radius: 0 !important;
    box-shadow: none !important;
  }
`;

interface LocationProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Location: React.FC<LocationProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const form = Form.useFormInstance();
  const [location, setLocation] = React.useState<any>();

  useEffect(() => {
    const addressInput = document.getElementsByClassName(
      "address-input"
    )[0] as HTMLInputElement;
    if (addressInput) {
      addressInput.placeholder = "Adresse";
    }
    if (!location) return;
    const { zip, city, street, nation, address } = location;
    form.setFieldsValue({
      zipcode: zip,
      city,
      street,
      country: nation,
      address,
    });
    const newInput = {
      ...input,
      zipcode: zip,
      city,
      street,
      country: nation,
      address,
    };
    onChange(newInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (!isFieldVisible("address")) {
    return null;
  }

  return (
    <CustomDiv>
      <EditUiManagerInput
        inputType="location"
        item={{
          key: "address",
          label: "Adresse",
          required: isFieldRequired("address"),
        }}
        input={input}
        onChange={setLocation}
        config={{
          apiKey: ENV.GOOGLE_MAPS_API_KEY,
          initialAddress: {
            zip: input.zipcode,
            city: input.city,
            street: input.street,
            nation: input.country,
            title: input.address,
          },
          initialValue: "Gstaad",
          showMap: true,
        }}
      />
    </CustomDiv>
  );
};

export default Location;
