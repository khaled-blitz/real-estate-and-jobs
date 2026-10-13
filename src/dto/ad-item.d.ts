/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ImageType {
  base: string;
  oq: string;
}

export interface TOffer {
  _blitzID?: string;
  _localID?: string;
  name: string;
  price: string;
  auto_renew: boolean;
  duration: string;
  /** A paid offer with top set is what makes an approved ad a Top ad. */
  top?: string;
}

export type TFeaturesList =
  | "garden"
  | "balcony"
  | "furnished"
  | "garage"
  | "outdoor_parking"
  | "pets_allowed"
  | "seating_area"
  | "elevator"
  | "cellar"
  | "attic"
  | "cable_tv"
  | "wheelchair_accessible"
  | "child_friendly"
  | "electric_car_charging_station"
  | "new_construction"
  | "alpine_and_forecourt_hut"
  | "second_home"
  | "minergie_standard";

type FeatureJson = {
  _name: string;
  type: "enum";
  _value: TFeaturesList;
};

type FeatureItem = FeatureJson | TFeaturesList;

export interface TAdItem {
  _blitzID?: string;
  _modified?: string;
  _blitzstamp?: string;
  title?: string;
  property_type?: string;
  price?: string;
  price_cold_rent?: string;
  price_charges?: string;
  area?: string;
  address?: {
    lat: string;
    long: string;
    city: string;
    street: string;
    zip: string;
  };
  number_of_rooms?: string;
  email?: string;
  display_email?: string;
  url?: string;
  phone_number?: string;
  description?: string;
  country?: string;
  city?: string;
  image_local?: ImageType;
  gallery?: ImageType[];
  address?: string;
  street?: string;
  zipcode?: string;
  subcategory?: string;
  expiration_date?: string;
  minimum_term?: string;
  billing_cycle?: string;
  features_list?: FeatureItem[];
  source?: string;
  is_approved?: boolean;
  /** A raw read hands back the offer's id; a resolved one, the offer itself. */
  offer_fk?: TOffer | string;
  property_area?: string;
  year_of_construction?: string;
  last_renovation?: string;
  insert_internet_link?: string;
  insert_link_name?: string;
  company_published?: string;
  name_published?: string;
  logo?: ImageType;
  available_from?: string;
}
