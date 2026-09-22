import { TAdItem } from "@/dto/ad-item";
import Item from "../item";
import Image from "next/image";

interface Props {
  ad: TAdItem;
}

const Area = ({ ad }: Props) =>
  ad.area &&
  Number(ad.area) > 0 && (
    <Item
      ad={ad}
      label="Area"
      icon={
        <Image src="/immo/surface.svg" width={24} height={24} alt="surface" />
      }
      itemKey="area"
      value={
        <div>
          {ad.area} m
          <sup className="text-[10px] leading-[10px] inline ml-[-2]">2</sup>
        </div>
      }
    />
  );

export default Area;
