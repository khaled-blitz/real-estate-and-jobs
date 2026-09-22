import { useLocalization } from "@/logic/localization";
import { CaretLeftFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";

export const NavBackButton = () => {
  const { translate } = useLocalization();
  const router = useRouter();

  return (
    <Button
      className="max-w-[200px] self-start font-bold"
      type="primary"
      size="large"
      icon={<CaretLeftFilled />}
      iconPosition="start"
      onClick={() => {
        router.push("/immobilien"); // Navigate to the home page
      }}
    >
      {translate("Back")}
    </Button>
  );
};

export default NavBackButton;
