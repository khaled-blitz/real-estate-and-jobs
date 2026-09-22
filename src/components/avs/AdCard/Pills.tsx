import { FeatureJson, TAdItem } from "@/dto/ad-item";
import { useLocalization } from "@/logic/localization";
import { Typography } from "antd";

interface Props {
  ad: TAdItem;
}

function Pill({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#fff] rounded-full py-[2px] px-2 max-h-[30px]">
      <Typography.Text className="text-[16px] flex items-center text-[#444444]">
        {label}
      </Typography.Text>
    </div>
  );
}

export default function Pills({ ad }: Props) {
  const { translate } = useLocalization();
  const countList = ad.features_list?.length || 0;
  if (countList === 0) return null;
  return (
    <div className="gap-2 flex ml-0 md:ml-auto flex-wrap justify-start md:justify-end max-w-full md:max-w-[300px]">
      {ad.features_list &&
        ad.features_list
          .slice(0, 3)
          .map((feature, index) => (
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
