import Pill from "@/components/common/Pill";
import { FeatureJson, TAdItem } from "@/dto/ad-item";
import { useLocalization } from "@/logic/localization";

interface Props {
  ad: TAdItem;
}
export default function Pills({ ad }: Props) {
  const { translate } = useLocalization();
  return (
    <div className="gap-2 flex self-center">
      {ad.features_list?.slice(0, 3).map((feature, index) => (
        <Pill
          key={index}
          label={translate(
            (feature as FeatureJson)._value ||
              (typeof feature === "string" ? feature : "")
          )}
        />
      ))}
    </div>
  );
}
