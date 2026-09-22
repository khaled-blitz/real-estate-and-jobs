import { TAdItem } from "@/dto/ad-item";
import { Typography } from "antd";
import Image from "next/image";
import Pills from "./Pills";
import classNames from "classnames";

interface Props {
  ad: TAdItem;
}

export default function Footer({ ad }: Props) {
  return (
    <div
      className={classNames(
        "flex flex-col md:flex-row p-4 gap-4 bg-[#F2F2F2] w-full justify-between",
        {
          hidden:
            (!ad.features_list || ad.features_list.length === 0) &&
            !ad.city &&
            (!ad.area || Number(ad.area) === 0),
        }
      )}
    >
      <div
        className={classNames(
          "flex gap-4 my-auto md:mt-unset items-center w-full flex-wrap",
          {
            "max-w-full md:max-w-[calc(100%-300px)]":
              ad.features_list && ad.features_list?.length > 0,
          }
        )}
      >
        {ad.city && (
          <Typography.Text className="text-[16px] text-[#444444] flex gap-2">
            <Image
              src="/immo/location.svg"
              width={22}
              height={22}
              alt="location"
            />
            {ad.city}
          </Typography.Text>
        )}
        {ad.area && Number(ad.area) > 0 && (
          <Typography.Text className="text-[16px] text-[#444444] flex gap-2 items-center">
            <Image
              src="/immo/surface.svg"
              width={22}
              height={22}
              alt="surface"
            />

            <div>
              {ad.area} m
              <sup className="text-[10px] leading-[10px] inline ml-[-2]">2</sup>
            </div>
          </Typography.Text>
        )}
      </div>
      <Pills ad={ad} />
    </div>
  );
}
