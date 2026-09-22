import { TAdItem } from "@/dto/ad-item";
import Item from "../item";
import Image from "next/image";

interface Props {
  ad: TAdItem;
}

const Email = ({ ad }: Props) => (
  <Item
    ad={ad}
    label="Email"
    itemKey="display_email"
    icon={<Image src="/immo/email.svg" width={24} height={24} alt="email" />}
    value={<a href={`mailto:${ad.email}`}>{ad.email}</a>}
  />
);

export default Email;
