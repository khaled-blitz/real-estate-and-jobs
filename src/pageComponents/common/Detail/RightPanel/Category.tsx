import { TAdItem } from "@/dto/ad-item";
import Item from "../item";
import Image from "next/image";
import { SubcategoryEnum } from "@/logic/utils/subcategory-enum";

interface Props {
  ad: TAdItem;
}

const Category = ({ ad }: Props) => (
  <Item
    ad={ad}
    label="Type"
    itemKey="subcategory"
    icon={
      <Image src="/immo/category.svg" width={24} height={24} alt="category" />
    }
    value={SubcategoryEnum[ad.subcategory as keyof typeof SubcategoryEnum]}
  />
);

export default Category;
