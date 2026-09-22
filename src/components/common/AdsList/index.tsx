import AdCard from "../AdCard";
import Link from "next/link";
import { useContext } from "react";
import { ListControlContext } from "@/ListControl";
import { Card } from "antd";

const AdsList = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const context = useContext(ListControlContext);
  if (!context) {
    return null;
  }
  return (
    <div className="w-full">
      {context.ads.map((ad) => (
        <Link
          href={`/home/${ad._blitzID}`}
          key={ad._blitzID}
          className="flex w-full"
        >
          <AdCard ad={ad} isAdmin={isAdmin} />
        </Link>
      ))}
      {context.ads.length === 0 && (
        <Card className="w-full flex flex-grow justify-center mt-4 shadow-lg self-center">
          No properties found
        </Card>
      )}
    </div>
  );
};

export default AdsList;
