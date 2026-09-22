import { useTranslation } from "next-i18next";

export const useLocalization = () => {
  const props = useTranslation();

  const translate = (text: string) => props.t(text).toString();
  return { ...props, translate };
};
