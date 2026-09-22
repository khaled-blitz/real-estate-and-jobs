import React from "react";

export interface AllowedFieldsT {
  [key: string]: {
    label: string | React.ReactNode;
    required: boolean;
    availableForPropertyTypes?: string[];
    requiredForPropertyTypes?: string[];
    requiredForCategories?: string[];
    multiple?: boolean;
    onlyAllow?: string[];
    rentingOnly?: boolean;
    buyingOnly?: boolean;
    custom?: boolean;
  };
}

//Land/Plot and Garage/Parking

export const AllowedFieldsWithLabels: AllowedFieldsT = {
  property_type: { label: "Property type", required: true },
  area: {
    label: (
      <div>
        Wohnfläche (m<sup>2</sup>)
      </div>
    ),
    required: false,
    availableForPropertyTypes: [
      "Apartment",
      "House",
      "Chalet",
      "Storage",
      "Commercial",
      "Agriculture",
      "Other Property Type",
    ],
  },
  number_of_rooms: {
    label: "Rooms",
    required: true,
    availableForPropertyTypes: ["Apartment", "House", "Chalet"],
    requiredForCategories: ["TS", "TR"],
  },
  furnished: {
    label: "Furnished",
    required: true,
    rentingOnly: true,
    availableForPropertyTypes: ["Apartment", "House", "Chalet"],
  },
  pets_allowed: {
    label: "Pets allowed",
    required: true,
    rentingOnly: true,
    availableForPropertyTypes: ["Apartment", "House", "Chalet"],
  },
  alpine_and_forecourt_hut: {
    label: "alpine_and_forecourt_hut",
    required: true,
    rentingOnly: true,
    availableForPropertyTypes: ["Apartment", "House", "Chalet"],
  },
  second_home: {
    label: "second_home",
    required: true,
    buyingOnly: true,
    availableForPropertyTypes: ["Apartment", "House", "Chalet"],
  },
  features_list: {
    label: "Features",
    required: true,
    availableForPropertyTypes: ["Apartment", "House", "Chalet"],
  },
  subcategory: {
    label: "Category",
    required: true,
    onlyAllow: ["TS", "TR", "STS", "STR"],
  },
  image_local: { label: "Thumbnail", required: false },
  logo: { label: "Logo", required: false },
  available_from: { label: "Available From", required: true },
  gallery: { label: "Gallery", required: false, multiple: true },
  title: { label: "Title", required: true },
  price: {
    label: "Price",
    required: false,
    buyingOnly: true,
  },
  price_cold_rent: {
    label: "Cold rent",
    required: false,
    rentingOnly: true,
  },
  price_charges: {
    label: "Charges",
    required: false,
    rentingOnly: true,
  },
  minimum_term: { label: "Minimum term", required: false, rentingOnly: true },
  billing_cycle: { label: "Billing cycle", required: true, rentingOnly: true },
  description: { label: "Description", required: false },
  email: { label: "Contact Email", required: true },
  display_email: { label: "Display Email", required: false },
  phone_number: { label: "Phone number", required: false },
  location: { label: "Location", required: false },
  city: { label: "City", required: true, requiredForCategories: ["TS", "TR"] },
  zipcode: {
    label: "Zip code",
    required: true,
    requiredForCategories: ["TS", "TR"],
  },
  street: { label: "Street", required: false },
  offer_fk: {
    label: "Offer",
    required: true,
    multiple: false,
    custom: true,
  },
  property_area: {
    label: "property_area",
    required: false,
    availableForPropertyTypes: [
      "House",
      "Chalet",
      "Commercial",
      "Agriculture",
      "Other Property Type",
      "Garage/Parking",
      "Land/Plot",
    ],
  },
  year_of_construction: { label: "year_of_construction", required: false },
  last_renovation: { label: "last_renovation", required: false },
  insert_internet_link: { label: "insert_internet_link", required: false },
  insert_link_name: { label: "insert_link_name", required: false },
  company_published: { label: "company_published", required: false },
  name_published: { label: "name_published", required: false },
};
