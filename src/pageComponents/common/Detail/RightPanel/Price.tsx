import { TAdItem } from "@/dto/ad-item";
import Item from "../item";
import Image from "next/image";

interface Props {
  ad: TAdItem;
  showIcon?: boolean;
}

const Price = ({ ad, showIcon }: Props) => {
  const isRenting = ["TR", "STR"].includes(ad.subcategory ?? "");
  if (!ad.price || Number(ad.price) === 0) return null;
  return (
    <Item
      ad={ad}
      label={isRenting ? "Rent price" : "Price"}
      itemKey="price"
      icon={
        isRenting && !showIcon ? (
          <div className="w-[20px] h-[20px]" />
        ) : (
          <Image src="/immo/price.svg" width={24} height={24} alt="price" />
        )
      }
      value={`Fr. ${Number(ad.price).toLocaleString("de-CH")} `}
      showLabel={isRenting}
    />
  );
};

export default Price;
