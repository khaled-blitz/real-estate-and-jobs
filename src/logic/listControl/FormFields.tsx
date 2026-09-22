/* eslint-disable @typescript-eslint/no-explicit-any */
import PropertyType from "./Attributes/PropertyType";
import Area from "./Attributes/Area";
import NumberOfRooms from "./Attributes/Rooms";
import Features from "./Attributes/Features";
import Category from "./Attributes/Category";
import Thumbnail from "./Attributes/Thumbnail";
import Gallery from "./Attributes/Gallery";
import Title from "./Attributes/Title";
import Price from "./Attributes/Price";
import Description from "./Attributes/Description";
import Email from "./Attributes/ContactEmail";
import Phone from "./Attributes/Phone";
import City from "./Attributes/City";
import Zipcode from "./Attributes/Zipcode";
import Street from "./Attributes/Street";
import ColdRent from "./Attributes/ColdRent";
import Charges from "./Attributes/Charges";
import { Form } from "antd";
import { useCallback } from "react";
import { AllowedFieldsWithLabels } from "./AllowedFields";
import EditOffer from "@/components/common/GenericFormFields/EditOffer";
import { InputType } from "./Attributes/props";
import MinTerm from "./Attributes/MinTerm";
import DisplayEmail from "./Attributes/DisplayEmail";
import AdditionalDetails from "./Attributes/AdditionalDetails";
import PropertyArea from "./Attributes/PropertyArea";
import YearOfConstruction from "./Attributes/YearOfConstruction";
import LastRenovation from "./Attributes/LastRenovation";
import Logo from "./Attributes/Logo";
import AvialableFrom from "./Attributes/AvailableFrom";

interface Props {
  input: Record<string, any>;
  list: InputType[];
  optionsList: Record<string, string[]>;
  setInput: (value: any) => void;
}

const FormFields = ({ input, list, optionsList, setInput }: Props) => {
  const form = Form.useFormInstance();
  const propertyType = Form.useWatch("property_type", form);
  const subcategory = Form.useWatch("subcategory", form);

  const isFieldVisible = useCallback(
    (field: string) => {
      const fieldData = AllowedFieldsWithLabels[field];

      const isRenting = ["TR", "STR"].includes(subcategory);
      if (!fieldData) return true;
      if (fieldData.availableForPropertyTypes) {
        const res = fieldData.availableForPropertyTypes.includes(propertyType);
        if (!res) return false;
      }
      if (fieldData.rentingOnly) {
        return isRenting;
      }
      if (fieldData.buyingOnly) {
        return !isRenting;
      }
      return true;
    },
    [propertyType, subcategory]
  );

  const isFieldRequired = useCallback(
    (field: string) => {
      const fieldData = AllowedFieldsWithLabels[field];
      if (!fieldData) return true;
      if (fieldData.requiredForPropertyTypes) {
        return fieldData.requiredForPropertyTypes.includes(propertyType);
      }
      // 2025-04-18 https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-04-18/Address%20Email%20Comments/28nxc6-9wote3?proj=1s4dec-3ibnqe
      if (fieldData.requiredForCategories) {
        return fieldData.requiredForCategories.includes(subcategory);
      }
      return fieldData.required;
    },
    [propertyType, subcategory]
  );

  return (
    <div
      className="modal-body flex flex-col gap-4 z-[12]"
      onClick={(e) => e.stopPropagation()}
    >
      <Category
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
        optionsList={optionsList}
      />
      <PropertyType
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
        optionsList={optionsList}
      />
      <Area
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <PropertyArea
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <NumberOfRooms
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
        optionsList={optionsList}
      />
      <Features
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <MinTerm
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Thumbnail
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Gallery
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Logo
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Title
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Price
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <ColdRent
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Charges
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Description
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <City
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Zipcode
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Street
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <YearOfConstruction
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <LastRenovation
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Email
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <DisplayEmail
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <Phone
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <AvialableFrom
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <AdditionalDetails
        input={input}
        onChange={setInput}
        isFieldVisible={isFieldVisible}
        isFieldRequired={isFieldRequired}
      />
      <EditOffer
        input={input}
        onChange={(value) => setInput(value)}
        list={list}
      />
    </div>
  );
};

export default FormFields;
