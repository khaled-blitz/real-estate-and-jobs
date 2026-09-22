import { TAdItem } from "@/dto/ad-item";
import Item from "../item";
import Image from "next/image";

interface Props {
  ad: TAdItem;
}

const Phone = ({ ad }: Props) => (
  <Item
    ad={ad}
    label="Phone"
    icon={<Image src="/immo/phone.svg" width={24} height={24} alt="phone" />}
    itemKey="phone_number"
    value={<a href={`tel:${ad.phone_number}`}>{ad.phone_number}</a>}
  />
);

export default Phone;
