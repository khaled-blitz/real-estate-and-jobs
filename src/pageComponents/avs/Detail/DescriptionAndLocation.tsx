import { TAdItem } from "@/dto/ad-item";
import { useLocalization } from "@/logic/localization";
import { Typography } from "antd";
import Map from "@/components/avs/Map";
import { useEffect, useState } from "react";
import { isValidPrice } from "@/logic/utils/helpers";

interface Props {
  ad: TAdItem;
}
const isHTML = (str: string) => {
  const doc = new DOMParser().parseFromString(str, "text/html");
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

const RenderContent = ({ content }: { content: string }) => {
  return isHTML(content) ? (
    <div className="text-[18px]">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  ) : (
    <Typography.Text className="text-[18px]">{content}</Typography.Text>
  );
};

// 2025-06-24 KH: Task: https://alpha.blitzdata.com/blitzpm/task/2bxky1--7pzg6l
const isValidCoordinates = (
  lat: string | undefined,
  long: string | undefined
) => {
  return lat && long && Number(lat) && Number(long);
};

const DescriptionAndLocation = ({ ad }: Props) => {
  const isRenting = ["TR", "STR"].includes(ad.subcategory ?? "");
  const { translate } = useLocalization();
  const [country, setCountry] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: 41.63345,
    longitude: -74.33165,
  });
  useEffect(() => {
    (async () => {
      if (!ad || !ad.country || !ad.zipcode) return;
      // 2025-05-20 KH: https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-05-20/Locatio.%20/2ab806--8qesbg?proj=1s4dec-3ibnqe
      if (isValidCoordinates(ad.address?.lat, ad.address?.long)) {
        setCoordinates({
          latitude: Number(ad.address!.lat),
          longitude: Number(ad.address!.long),
        });
        setCountry(ad.country);
        return;
      }
    })();
  }, [ad]);

  return (
    <div className="flex bg-[#e3c29c] flex-col gap-12 p-6">
      <div className="flex flex-col gap-4 w-full md:w-[60%]">
        {/* Header */}
        {ad.description && (
          <div className="flex flex-col gap-4">
            <Typography.Text className="text-[22px] leading-[32px] md:text-[26px] font-bold flex items-center gap-2">
              {translate("Description")}
            </Typography.Text>
            <RenderContent content={ad.description} />
          </div>
        )}

        {/* Price */}
        {isRenting && (
          <div className="flex flex-col mt-6 gap-1">
            <div className="flex justify-between">
              <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] font-bold items-center gap-2 flex md:hidden">
                Nettomietpreis/Monat
              </Typography.Text>
              <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] font-bold items-center gap-2 hidden md:flex">
                Nettomietpreis pro Monat
              </Typography.Text>
              <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] font-bold flex items-center gap-2">
                {isValidPrice(ad.price_cold_rent)
                  ? `CHF ${Number(ad.price_cold_rent).toLocaleString("de-CH")}`
                  : "Auf Anfrage"}
              </Typography.Text>
            </div>
            <div className="flex justify-between">
              <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] font-bold items-center gap-2 flex md:hidden">
                Nebenkosten/Monat
              </Typography.Text>
              <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] font-bold items-center gap-2 hidden md:flex">
                Nebenkosten pro Monat
              </Typography.Text>
              <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] font-bold flex items-center gap-2">
                {isValidPrice(ad.price_charges)
                  ? `CHF ${Number(ad.price_charges).toLocaleString("de-CH")}`
                  : "Auf Anfrage"}
              </Typography.Text>
            </div>
            {isValidPrice(ad.price_charges) && (
              <div className="flex justify-between">
                <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] font-bold items-center gap-2 flex md:hidden">
                  Bruttomietpreis/Monat
                </Typography.Text>
                <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] font-bold items-center gap-2 hidden md:flex">
                  Bruttomietpreis pro Monat
                </Typography.Text>
                <Typography.Text className="text-[16px] leading-[22px] md:text-[18px] font-bold flex items-center gap-2">
                  {isValidPrice(ad.price)
                    ? `CHF ${Number(ad.price).toLocaleString("de-CH")}`
                    : "Auf Anfrage"}
                </Typography.Text>
              </div>
            )}
          </div>
        )}

        {/* Map  */}
        {country && (
          <div className="block relative w-full mt-2">
            <Typography.Text className="text-[22px] leading-[32px] md:text-[26px] font-bold flex items-center gap-2 mb-1">
              Lage
            </Typography.Text>
            <Map coordinates={coordinates} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionAndLocation;
