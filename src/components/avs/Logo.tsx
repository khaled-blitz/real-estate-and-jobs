/* eslint-disable @next/next/no-img-element */

const Logo = () => {
  return (
    <img
      src="/immo/avs/logo_immo_neg.svg"
      alt={"logo"}
      onClick={() => (window.location.href = "/immo/")}
      style={{
        cursor: "pointer",
        maxWidth: "300px",
        width: "100%",
        height: "auto",
        objectFit: "contain",
      }}
    />
  );
};

export default Logo;
