/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const Banner = () => {
  return (
    <Link href="https://lehrebeo.ch/" target="_blank">
      <img
        src="/immo/avs/banner.jpg"
        alt={"logo"}
        style={{
          maxWidth: "680px",
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </Link>
  );
};

export default Banner;
