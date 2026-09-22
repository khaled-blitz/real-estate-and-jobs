import classNames from "classnames";
import TabBar from "./TabBar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children }: Props) => {
  return (
    <div
      className={classNames(
        "flex flex-col w-[100vw] h-[100vh] text-black justify-start items-center gap-2 overflow-y-auto"
      )}
    >
      <div
        className={classNames(
          "relative flex flex-col w-full justify-center items-center gap-2 max-w-[1200px] p-4"
        )}
      >
        <TabBar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
