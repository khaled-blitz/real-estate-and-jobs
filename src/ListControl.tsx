/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BDModel, Condition } from "blitzdata.ts";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { ComparisonOperator, TCondition } from "./dto/condition-item";
import { getBDModel } from "./logic/utils/helpers";
import { AdFusionModelName } from "./logic/utils/constants";
import { TAdItem } from "./dto/ad-item";
import { RegionList } from "./logic/utils/regionList";

interface ListControlContextType {
  ads: TAdItem[];
  isLoading: boolean;
  conditions: TCondition[] | undefined;
  model: BDModel | null | undefined;
  limit: number;
  pendingInitialization: boolean;
  addFilter: (
    itemKey: string,
    operator: ComparisonOperator,
    value: string | undefined | number | null
  ) => void;
  setConditions: (conditions: TCondition[]) => void;
  setSortingKey: (key: keyof TAdItem) => void;
  showMore: (() => void) | undefined;
  onUpdate: (item: TAdItem) => void;
}

export const ListControlContext = createContext<
  ListControlContextType | undefined
>(undefined);

interface ListControlProviderProps {
  children: ReactNode | ReactNode[];
}

const ListControlProvider = ({ children }: ListControlProviderProps) => {
  const [ads, setAds] = useState<TAdItem[]>([]);
  const [pendingInitialization, setPendingInitialization] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [limit, setLimit] = useState(10);
  const [model, setModel] = useState<BDModel | null>();
  const [conditions, setConditions] = useState<TCondition[]>();
  const [sortingKey, setSorting] = useState<keyof TAdItem>("_blitzstamp");
  const [isDesc, setIsDesc] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const adFusionModel = await getBDModel(AdFusionModelName);
      setModel(adFusionModel);
      setPendingInitialization(false);
    })();
  }, []);

  useEffect(() => {
    // Filter out special values like "All" and region/sort conditions
    const conditionsWithoutSpecialValues = conditions?.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (c: any) => {
        // Skip region and sort conditions as they're handled separately
        if (c[0] === "region" || c[0] === "sort") return false;
        
        // Skip conditions with special values like "All" that should not apply filtering
        if (c[2] === "All") return false;
        
        return true;
      }
    );
    (async () => {
      if (pendingInitialization) return;

      const now = new Date();
      now.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds
      const formattedDate = now.toISOString().split("T")[0] + " 00:00:00";

      console.log("conditionsWithoutSpecialValues", conditionsWithoutSpecialValues);
      const fetchedData = (await model?.list({
        raw: true,
        limit: 1000,
        customSortDirection: "DESC",
        customSort: "expiration_date",
        conditions: [
          ["is_approved", "=", "1"],
          ["expiration_date", ">=", formattedDate],
          ...(conditionsWithoutSpecialValues ?? []),
        ] as Condition[],
      })) as unknown as TAdItem[];

      let regionsFilterValue: any = conditions?.find(
        (c: any) => c[0] === "region"
      )?.[2];
      const hasOtherFilter = regionsFilterValue?.includes("other");
      regionsFilterValue = regionsFilterValue?.filter(
        (r: string) => r !== "other"
      );

      flattenToRegionFilter(regionsFilterValue);

      const allRegions = Object.values(RegionList).flatMap((r) => r.children);
      const filtered = fetchedData.filter((ad) => {
        if (
          (!regionsFilterValue || regionsFilterValue.length === 0) &&
          !hasOtherFilter
        )
          return true;
        const region = ad.city?.includes(ad.zipcode as string)
          ? ad.city
          : `${ad.zipcode} ${ad.city}`;
        const regionExists = regionsFilterValue?.includes(region);
        const otherExists = hasOtherFilter && !allRegions.includes(region);
        return regionExists || otherExists;
      });

      const ordered = filtered.sort((a, b) => {
        if (
          sortingKey === "price" &&
          (!a.price || a.price === null || Number(a.price) === 0)
        )
          return 1;
        if (
          sortingKey === "price" &&
          (!b.price || b.price === null || Number(b.price) === 0)
        )
          return -1;
        return (
          (Number(b[sortingKey]) - Number(a[sortingKey])) * (isDesc ? 1 : -1)
        );
      });
      console.log("length", ordered.length);
      // ordered.forEach((ad) => {
      //   console.log(ad.property_type);
      // });
      setAds(ordered?.slice(0, limit));
      setIsLoading(false);
    })();
  }, [limit, pendingInitialization, model, conditions, sortingKey, isDesc]);

  const flattenToRegionFilter = (regionsFilter: string[]) => {
    if (!regionsFilter || regionsFilter.length === 0) return;
    const temp: string[] = [];
    for (const r of regionsFilter) {
      const splitted = r.split(" ", 2);
      // push splitted to regionsFilterValue
      if (splitted.length > 1) {
        temp.push(...splitted);
      } 
    }
    regionsFilter.push(...temp);
  }

  const setSortingKey = (key: keyof TAdItem) => {
    setSorting(key);
    setIsDesc(key === "_blitzstamp");
  };

  const showMore = () => {
    setIsLoading(true);
    setLimit((prevLimit) => prevLimit + 10);
  };

  const onUpdate = (item: TAdItem) => {
    if (!item.is_approved) return;
    const index = ads.findIndex((ad) => ad._blitzID === item._blitzID);
    if (index !== -1) {
      ads[index] = item;
      setAds([...ads]);
    } else {
      setAds([item, ...ads]);
    }
  };

  const addFilter = (
    itemKey: string,
    operator: ComparisonOperator,
    value: string | undefined | number | null
  ) => {
    const otherConditions: TCondition[] =
      conditions?.filter((c) => c[0] !== itemKey) ?? [];
    if (value) {
      otherConditions?.push([itemKey as keyof TAdItem, operator, value]);
    }
    setConditions(otherConditions);
  };

  return (
    <ListControlContext.Provider
      value={{
        ads,
        isLoading,
        model,
        pendingInitialization,
        conditions,
        limit,
        setSortingKey,
        addFilter,
        setConditions,
        showMore: ads.length >= limit ? showMore : undefined,
        onUpdate,
      }}
    >
      {children}
    </ListControlContext.Provider>
  );
};

export default ListControlProvider;
