import AdCard from "../AdCard";
import Link from "next/link";
import { useContext } from "react";
import { ListControlContext } from "@/ListControl";
import { Card } from "antd";
import Meta from "../FilterMeta";

const AdsList = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const context = useContext(ListControlContext);
  if (!context) {
    return null;
  }
  return (
    <div className="w-full">
      <div className="flex w-full mb-4">
        <Meta />
      </div>
      {context.ads.map((ad, index) => (
        <Link
          href={`/home/${ad._blitzID}`}
          key={`${ad._blitzID}_${index}`}
          className="flex w-full"
        >
          <AdCard ad={ad} isAdmin={isAdmin} key={`${ad._blitzID}_${index}`} />
        </Link>
      ))}
      {context.ads.length === 0 && (
        <Card className="w-full flex flex-grow justify-center mt-4 shadow-lg self-center">
          Keine Objekte gefunden
        </Card>
      )}
    </div>
  );
};

export default AdsList;
