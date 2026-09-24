/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BDModel, Condition } from "blitzdata.ts";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { ComparisonOperator, TCondition } from "./dto/condition-item";
import { getBDModel, isPaidTopOffer } from "./logic/utils/helpers";
import { AdFusionModelName, OfferModelName } from "./logic/utils/constants";
import { TAdItem, TOffer } from "./dto/ad-item";
import { RegionList } from "./logic/utils/regionList";

/*
 * Top placement.
 *
 * An ad carries no Top flag of its own: it is Top when it is approved and the
 * offer it runs on is a paid offer with top set. The listing query already
 * filters is_approved, so the offer is the whole test here.
 *
 * This is the only place Top ordering happens for real estate. The immo4west
 * list never orders by _sort — it fetches the ads and sorts them in the
 * browser (below) — so, unlike job4west, there is no server-side sort to
 * boost. Owner's decision, stated 2026-09-24.
 *
 * The offers are a handful of rows that change rarely, so they are read once
 * at start-up and matched by id.
 */

/**
 * Every id a paid Top offer answers to. An ad's offer_fk stores the offer's
 * _localID — the same join apps/realestateadmin/mylistings.controller.php
 * makes — but it is written from a _blitzID, so both go in the set.
 *
 * Ordering is a nicety; the listing is not. An unreadable offer model returns
 * an empty set and the ads still list, just without Top first.
 */
const fetchTopOfferIDs = async (): Promise<Set<string>> => {
  const ids = new Set<string>();

  try {
    const offerModel = await getBDModel(OfferModelName);
    const offers = ((await offerModel?.list({ raw: true, limit: 1000 })) ??
      []) as unknown as TOffer[];

    for (const offer of offers) {
      if (!isPaidTopOffer(offer)) continue;
      for (const id of [offer._localID, offer._blitzID]) {
        if (id !== undefined && id !== null && id !== "") ids.add(String(id));
      }
    }
  } catch (error) {
    console.error("Top offers unreadable — listing without Top first", error);
  }

  return ids;
};

const offerIDOf = (ad: TAdItem): string => {
  const offer = ad.offer_fk;
  if (offer === undefined || offer === null) return "";
  if (typeof offer === "object") {
    return String(offer._localID ?? offer._blitzID ?? "");
  }
  return String(offer);
};

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
  /** Whether the ad runs on a paid Top offer. Owns the rule; cards only render it. */
  isTopAd: (ad: TAdItem) => boolean;
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
  const [topOfferIDs, setTopOfferIDs] = useState<Set<string>>(new Set());

  const isTopAd = (ad: TAdItem) => topOfferIDs.has(offerIDOf(ad));

  useEffect(() => {
    (async () => {
      const adFusionModel = await getBDModel(AdFusionModelName);
      setModel(adFusionModel);
      // Before pendingInitialization drops, so the first ordering already has it.
      setTopOfferIDs(await fetchTopOfferIDs());
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
        // Top ads lead "Neueste zuerst", newest first among themselves. Picking
        // "Günstigste zuerst" is the user asking for price order and nothing else.
        if (sortingKey === "_blitzstamp") {
          const byTop = Number(isTopAd(b)) - Number(isTopAd(a));
          if (byTop !== 0) return byTop;
        }
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
  }, [
    limit,
    pendingInitialization,
    model,
    conditions,
    sortingKey,
    isDesc,
    topOfferIDs,
  ]);

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
        isTopAd,
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
