"use client";

import type { BlitzData as BlitzDataType } from "blitzdata.ts";

// blitzdata.ts touches `self` at module scope, so importing it eagerly breaks
// Next's server-side page-data collection. It is only ever used in the browser,
// so load it on demand instead.
const loadBlitzData = async (): Promise<typeof BlitzDataType> =>
  (await import("blitzdata.ts")).BlitzData;
import { ENV } from "./constants";
import { ImageType, TOffer } from "@/dto/ad-item";

/**
 * Returns true if the given URL is valid, false otherwise
 * @param {string} [url] The URL to check, or undefined to return false
 * @returns {boolean}
 */
export function isValidUrl(url?: string) {
  try {
    new URL(url ?? "");
    return true;
  } catch {
    return false;
  }
}

/**
 * Initializes a connection to the BlitzData service.
 *
 * This function sets the global headers for HTTP requests to the BlitzData
 * service using the BD_USER and BD_KEY environment variables. Then, it
 * initializes the BlitzData service using the API_URL environment variable.
 *
 * The pingInterval is set to 5 seconds.
 */
export const initializeConnection = async () => {
  console.log("Initializing BlitzData connection...");
  const [BlitzData, { default: BlitzUIManager }] = await Promise.all([
    loadBlitzData(),
    import("blitzdata-ui-manager"),
  ]);
  await BlitzData.initialize({
    clusters: {
      khaled: {
        readURL: ENV.API_URL,
        addURL: ENV.API_URL,
      },
    },
    uiManager: BlitzUIManager,
    assetsPath: "/immo",
    sync: {
      level: "none",
      ttl: 60000,
      interval: 5000,
      models: ["bdt24qme4c3_real_estate_v4", "bdt24qme4c3_real_estate_offer"],
    },
    // Cast at the package boundary: blitzdata-ui-manager is built against
    // @blitzdata.ts/core, a separate copy of BlitzData than the one imported
    // here, so `uiManager` is structurally incompatible despite being the same
    // class at runtime. `assetsPath` is likewise read by the UI manager at
    // runtime but missing from this copy's options type.
  } as unknown as Parameters<typeof BlitzData.initialize>[0]);
  console.log("BlitzData initialized");
};

/**
 * Retrieves a BDModel by the specified model name.
 *
 * This function initializes a connection to the BlitzData service and
 * attempts to fetch a model using the provided modelName.
 *
 * @param modelName - The name of the model to retrieve.
 * @returns A promise that resolves to the BDModel.
 */
export const getBDModel = async (modelName: string) => {
  await initializeConnection();
  const BlitzData = await loadBlitzData();
  return await BlitzData._Model.get(modelName);
};

export const getImageURL = (image: ImageType | undefined) => {
  return `${image?.base}${image?.oq}`;
};

/**
 * A Top placement is something the advertiser paid for: an offer marked top
 * but given away for free buys no position.
 *
 * This is the whole definition of Top for real estate — there is no Top flag
 * on the ad. It decides the badge in the offer picker, the badge on an ad card
 * and the order of the list, so it lives in one place rather than three.
 *
 * A boolean arrives as "1", 1 or true depending on the read path.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPaidTopOffer = (offer: TOffer | Record<string, any> | undefined | null) => {
  if (!offer) return false;
  const top = offer.top;
  return (
    (top === "1" || top === 1 || top === true) && Number(offer.price) > 0
  );
};

export const isValidPrice = (price: string | undefined) => {
  return price && Number(price) > 0;
};

export const clearObjectStore = (dbName: string, storeName: string) => {
  const request = indexedDB.open(dbName);

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);

    const clearRequest = objectStore.clear();

    clearRequest.onsuccess = () => {
      console.log(`${storeName} cleared successfully.`);
    };

    clearRequest.onerror = () => {
      console.error(`Error clearing ${storeName}:`, clearRequest.error);
    };
  };

  request.onerror = () => {
    console.error("Error opening database:", request.error);
  };
};

export const countItems = (dbName: string, storeName: string) => {
  return new Promise<number>((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, "readonly");
      const objectStore = transaction.objectStore(storeName);

      const countRequest = objectStore.count();

      countRequest.onsuccess = () => {
        resolve(countRequest.result);
      };

      countRequest.onerror = () => {
        reject(`Error counting items in ${storeName}: ${countRequest.error}`);
      };
    };

    request.onerror = () => {
      reject(`Error opening database: ${request.error}`);
    };
  });
};

export const ClientName = ENV.CLIENT || "common";

// 2025-05-07 KH: https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-05-07/Fix%20ad%20category%20in%20search%20and%20list%20pages/29n515--g4jn22?proj=1s4dec-3ibnqe
export const CategorySearchingMap = {
  TS: "Zu verkaufen",
  TR: "Zu vermieten",
  STS: "Zu kaufen gesucht",
  STR: "Zu mieten gesucht",
};

export const getAddressText = (input: Record<string, string>) => {
  const { city, country, street, zipcode } = input;
  return `${street}, ${zipcode}, ${city}, ${country}`;
};
