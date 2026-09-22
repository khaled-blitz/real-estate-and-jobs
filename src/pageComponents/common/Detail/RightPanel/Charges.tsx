import { TAdItem } from "@/dto/ad-item";
import Item from "../item";
import Image from "next/image";

interface Props {
  ad: TAdItem;
}

const Charges = ({ ad }: Props) => (
  <Item
    ad={ad}
    label="Charges"
    itemKey="price_charges"
    icon={<Image src="/immo/price.svg" width={24} height={24} alt="charges" />}
    showLabel
    value={`Fr. ${Number(ad.price_charges).toLocaleString("de-CH")} `}
  />
);

export default Charges;
