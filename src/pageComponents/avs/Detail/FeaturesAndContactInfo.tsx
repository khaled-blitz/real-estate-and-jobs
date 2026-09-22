import { FeatureJson, TAdItem, TFeaturesList } from "@/dto/ad-item";
import { useLocalization } from "@/logic/localization";
import { Button, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Logo from "@/components/avs/AdCard/fields/Logo";
import Link from "next/link";
import { getFormattedPhoneNumber } from "@/logic/utils/format";

interface Props {
  ad: TAdItem;
}

const FeaturesAndContactInfo = ({ ad }: Props) => {
  const { translate } = useLocalization();

  const minTermValue = Number(ad.minimum_term?.trim().split(" ")[0]);
  const minTermDuration = ad.minimum_term?.trim().split(" ")[1];
  const isValidMinimumTerm =
    ["TR", "STR", "TS"].includes(ad.subcategory || "") &&
    ad.minimum_term &&
    minTermValue > 0;

  // 2025-04-23 KH https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-04-23/Fix%20Ad%20Detail%20Bug/28xtpt-4vyzw7?proj=1s4dec-3ibnqe
  const hasFeatures =
    Array.isArray(ad.features_list) && ad.features_list?.length > 0;

  return (
    <div className="flex flex-col bg-[#e3c29c] mb-8 p-6">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Features */}
        <div className="flex flex-col gap-4">
          <Typography.Text className="text-[22px] leading-[32px] md:text-[26px] font-bold flex items-center gap-2">
            Merkmale & Ausstattung
          </Typography.Text>
          {hasFeatures && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[64px]">
              {ad.features_list?.map((feature, index) => (
                <Typography.Text
                  className="text-[18px] leading-[26px]"
                  key={index}
                >
                  <CheckOutlined className="mr-2 text-[14px]" />
                  {(feature as FeatureJson)._value
                    ? translate((feature as FeatureJson)._value)
                    : translate(feature as TFeaturesList)}
                </Typography.Text>
              ))}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4 items-start md:items-end">
          <Typography.Text className="text-[22px] leading-[32px] md:text-[26px] font-bold flex items-center gap-2 text-left md:text-right">
            Anbieter kontaktieren
          </Typography.Text>
          <div className="flex flex-col text-left md:text-right">
            {ad.company_published && (
              <Typography.Text className="text-[18px] leading-[26px]">
                {ad.company_published}
              </Typography.Text>
            )}
            {ad.name_published && (
              <Typography.Text className="text-[18px] leading-[26px]">
                {ad.name_published}
              </Typography.Text>
            )}
            {ad.display_email && (
              <Link href={`mailto:${ad.display_email}`}>
                <Typography.Text className="text-blue-600 text-[18px] leading-[26px]">
                  {ad.display_email}
                </Typography.Text>
              </Link>
            )}
            {ad.phone_number && <Typography.Text className="text-[18px] leading-[26px]">
              {getFormattedPhoneNumber(ad.phone_number || "")}
            </Typography.Text>}
            {ad.insert_internet_link && (
              <Button
                className="flex justify-start md:justify-end items-end !p-0 text-[18px] leading-[26px] "
                type="link"
                target="_blank"
                href={ad.insert_internet_link}
              >
                <div className="max-w-[300px] truncate">
                  {ad.insert_link_name || ad.insert_internet_link}
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Baujahr 2010 letzte Renovation 2024 Grundstückfläche 290 m² */}
      {(ad.year_of_construction || ad.last_renovation || ad.property_area) && (
        <div className="mt-8 md:mt-[44px]">
          {ad.year_of_construction && (
            <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] flex items-center gap-2">
              Baujahr: {ad.year_of_construction}
            </Typography.Text>
          )}
          {ad.last_renovation && (
            <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] flex items-center gap-2">
              Letzte Renovation: {ad.last_renovation}
            </Typography.Text>
          )}
          {ad.property_area && (
            <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] flex items-center gap-2">
              Grundstückfläche: {ad.property_area} m²
            </Typography.Text>
          )}
        </div>
      )}
      {(isValidMinimumTerm || ad.logo) && (
        <div className="mt-8 md:mt-[44px] flex justify-between items-end">
          <div>
            {isValidMinimumTerm && (
              <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] font-bold flex items-center gap-2">
                Mindestmietzeit: {minTermValue}{" "}
                {translate(minTermDuration || "")}
                {minTermValue > 1 ? "e" : ""}
              </Typography.Text>
            )}
          </div>
          <Logo ad={ad} />
        </div>
      )}
    </div>
  );
};

export default FeaturesAndContactInfo;
