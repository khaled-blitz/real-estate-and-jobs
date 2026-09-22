import { TAdItem } from "@/dto/ad-item";
import Item from "../item";
import Image from "next/image";

interface Props {
  ad: TAdItem;
}

const Country = ({ ad }: Props) => (
  <Item
    ad={ad}
    label="Country"
    itemKey="country"
    icon={
      <Image src="/immo/location.svg" width={24} height={24} alt="location" />
    }
    value={`${ad.city} ${ad.zipcode} ${ad.country}`}
  />
);

export default Country;
