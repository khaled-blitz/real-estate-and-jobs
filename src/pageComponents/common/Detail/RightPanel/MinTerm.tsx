import { TAdItem } from "@/dto/ad-item";
import Item from "../item";
import Image from "next/image";
import { useLocalization } from "@/logic/localization";

interface Props {
  ad: TAdItem;
}

const MinTerm = ({ ad }: Props) => {
  const { translate } = useLocalization();
  return (
    <Item
      ad={ad}
      label="Type"
      itemKey="minimum_term"
      value={
        <div>
          {translate("Minimum Term")}: {ad.minimum_term}
        </div>
      }
      icon={
        <Image src="/immo/category.svg" width={24} height={24} alt="category" />
      }
    />
  );
};

export default MinTerm;
