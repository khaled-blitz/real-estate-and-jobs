import { TAdItem } from "@/dto/ad-item";
import Item from "../item";
import Image from "next/image";

interface Props {
  ad: TAdItem;
  showIcon?: boolean;
}

const ColdRent = ({ ad, showIcon }: Props) => (
  <Item
    ad={ad}
    label="Cold rent"
    itemKey="price_cold_rent"
    showLabel
    icon={
      showIcon ? (
        <Image src="/immo/price.svg" width={24} height={24} alt="charges" />
      ) : (
        <div className="w-[20px] h-[20px]" />
      )
    }
    value={`Fr. ${Number(ad.price_cold_rent).toLocaleString("de-CH")} `}
  />
);

export default ColdRent;
