import "@/styles/globals.css";
import "@/styles/carousel.css";
import { Button, ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import "../i18n";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { useEffect, useState } from "react";
import ListControlProvider from "@/ListControl";
import { ENV } from "@/logic/utils/constants";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { ModalProvider } from "@/components/providers/ModalContext";
import GlobalAddItemModal from "@/components/common/GlobalAddItemModal";
import Head from "next/head";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const isCommon =
    router.query.client === "common" || ENV.CLIENT === "common" || !ENV.CLIENT;
  const isAVS = router.query.client === "avs" || ENV.CLIENT === "avs";
  const isDebug = router.query.debug === "true";

  const changeLanguage = (lng: "de" | "en") => {
    i18n.changeLanguage(lng); // Change the current language
  };
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    i18n.changeLanguage("de");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!language) return null; // Prevent mismatches during hydration
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: isCommon ? 8 : 0,
          lineWidth: 1,
          fontFamily: isCommon
            ? "Helvetica, Arial, sans-serif"
            : inter.style.fontFamily,
          colorPrimary: isCommon ? "#FFBE06" : "#3a3944",
          colorPrimaryHover: isCommon ? "#FFBE06" : "#3a3944",
          colorText: isCommon ? "#000" : "#3a3944",
        },
      }}
    >
      <Head>
        <link rel="icon" type="image/png" href="/immo/favicon.png" />
        <link rel="apple-touch-icon" href="/immo/favicon.png" />
      </Head>
      {/* 2025-05-07: */}
      {/* https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-05-07/Fix%20ad%20category%20in%20search%20and%20list%20pages/29n515--g4jn22?proj=1s4dec-3ibnqe */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-9KT83DQ2Y8"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-9KT83DQ2Y8');
  `}
      </Script>
      <div className="absolute top-12 right-0 p-4 bg-transparent z-10 hidden">
        <Button
          onClick={() => changeLanguage("en")}
          style={{ marginRight: "12px" }}
          className={classNames({
            "active-button": i18n.language === "en",
          })}
          type={i18n.language === "en" ? "primary" : "default"}
        >
          English
        </Button>
        <Button
          onClick={() => changeLanguage("de")}
          className={classNames({
            "active-button": i18n.language === "de",
          })}
          type={i18n.language === "de" ? "primary" : "default"}
        >
          Deutsch
        </Button>
      </div>
      <div
        className={classNames({
          "bg-[url('/background2.png')] bg-cover bg-center": isCommon,
          "bg-[#d6a975]": isAVS,
        })}
      >
        {isDebug && (
          <div className="flex w-full justify-end">
            <Button
              onClick={() =>
                router.push({
                  pathname: "/",
                  query: { client: isCommon ? "avs" : "common", debug: "true" },
                })
              }
              className="self-end"
              type="primary"
            >
              Switch to {isCommon ? "AVS" : "Default"}
            </Button>
          </div>
        )}
        <ModalProvider>
          <ListControlProvider>
            <GlobalAddItemModal />
            <Component {...pageProps} />
          </ListControlProvider>
        </ModalProvider>
      </div>
    </ConfigProvider>
  );
}
