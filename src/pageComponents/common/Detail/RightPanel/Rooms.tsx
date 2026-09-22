import { TAdItem } from "@/dto/ad-item";
import Item from "../item";
import Image from "next/image";

interface Props {
  ad: TAdItem;
}

const Rooms = ({ ad }: Props) => (
  <Item
    ad={ad}
    label="Rooms"
    icon={<Image src="/immo/Rooms.svg" width={24} height={24} alt={"rooms"} />}
    itemKey="number_of_rooms"
  />
);

export default Rooms;
