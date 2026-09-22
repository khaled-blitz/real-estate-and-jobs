import React from "react";
import { Props } from "./props";
import { useLocalization } from "../../localization";
import EditBoolean from "@/components/common/GenericFormFields/EditBoolean";
import { TFeaturesList } from "@/dto/ad-item";

interface FeaturesProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Features: React.FC<FeaturesProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,

  input,
}) => {
  const { translate } = useLocalization();
  const FEATURES_LIST: TFeaturesList[] = [
    "garage",
    "cable_tv",
    "outdoor_parking",
    "electric_car_charging_station",
    "balcony",
    "wheelchair_accessible",
    "seating_area",
    "child_friendly",
    "garden",
    "minergie_standard",
    "elevator",
    "new_construction",
    "cellar",
    "second_home",
    "attic",
    "pets_allowed",
    "furnished",
    "alpine_and_forecourt_hut",
  ];
  if (!isFieldVisible("features_list")) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4">
      {FEATURES_LIST.map(
        (feature) =>
          isFieldVisible(feature) && (
            <EditBoolean
              item={{
                key: feature,
                label: translate(feature),
                required: isFieldRequired(feature),
              }}
              listName="features_list"
              input={input}
              onChange={onChange}
              justifyBetween
              key={feature}
            />
          )
      )}
    </div>
  );
};

export default Features;
