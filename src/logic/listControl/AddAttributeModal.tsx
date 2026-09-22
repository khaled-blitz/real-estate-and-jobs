/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdFusionModelName } from "@/logic/utils/constants";
import { Button, Form, Modal, notification, Typography } from "antd";
import type { LocationType } from "blitzdata.ts";

// Loaded on demand: blitzdata.ts touches `self` at module scope and must not be
// evaluated during Next's server-side page-data collection.
const loadBlitzData = async () => (await import("blitzdata.ts")).BlitzData;
import { useCallback, useContext, useEffect, useState } from "react";
import { AllowedTypes } from "./Attributes/props";
import { TAdItem } from "@/dto/ad-item";
import { useLocalization } from "../localization";
import { ListControlContext } from "@/ListControl";
import { AllowedFieldsWithLabels } from "./AllowedFields";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { ENV } from "../utils/constants";
import FormFields from "./FormFields";
import { getAddressText } from "../utils/helpers";

const DEBUG = false;

type allowedType = keyof typeof AllowedTypes;

interface InputType {
  key: string;
  type: allowedType;
  label: string | React.ReactNode;
  options?: any[];
  required?: boolean;
  multiple?: boolean;
  custom?: boolean;
}

interface Props {
  type?: "ADD" | "EDIT";
  defaultValues?: Record<string, any>;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const AddEditItemForm = ({
  type = "ADD",
  defaultValues,
  isModalOpen,
  setIsModalOpen,
}: Props) => {
  const { translate } = useLocalization();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const context = useContext(ListControlContext);
  const [form] = Form.useForm();
  const [input, setInput] = useState<Record<string, any>>({});
  const [list, setList] = useState<InputType[]>([]);
  const [loading, setLoading] = useState(false);
  const [optionsList, setOptionsList] = useState<Record<string, string[]>>({});
  const model = context?.model;

  const getLabel = (key: string) => {
    const label = AllowedFieldsWithLabels[key].label;
    return typeof label === "string" ? translate(label) : label;
  };

  const fetchOptionsForKey = async (type: string) => {
    const bdModel = await (await loadBlitzData())._Model.get(type);
    const results = await bdModel?.list();
    return results?.map((item: any) => item.toObject());
  };

  const constructList = useCallback(async () => {
    const attributes = model?.getAttributesDetails();
    if (!attributes) {
      setList([]);
      return;
    }

    const list: InputType[] = [];
    const allowedTypes = new Set(Object.keys(AllowedTypes));
    const tempOptionsList: Record<string, string[]> = {};

    for (const key in attributes) {
      if (!AllowedFieldsWithLabels[key]) continue;

      const { type: rawType, options } = attributes[key];
      // Schema types may be declared as a union (string[]); this form only
      // handles single-typed attributes.
      if (Array.isArray(rawType)) continue;
      const type = rawType;
      const { required } = AllowedFieldsWithLabels[key];
      const labelElement = getLabel(key);

      if (allowedTypes.has(type) && type === "enum") {
        if (options) tempOptionsList[key] = options;
      } else if (key.endsWith("_fk")) {
        const items = await fetchOptionsForKey(type);
        if (items) tempOptionsList[key] = items;
        list.push({
          key,
          type: "object",
          label: labelElement,
          options: items,
          required,
          custom: AllowedFieldsWithLabels[key].custom,
        });
      }
    }
    setOptionsList(tempOptionsList);
    setList(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);

  const initializeForm = useCallback(() => {
    if (!isModalOpen) return;
    const attributes = model?.getAttributesDetails();
    if (!attributes) return;

    const initialInput: Record<string, any> = Object.keys(attributes).reduce(
      (acc: Record<string, any>, key) => {
        if (AllowedFieldsWithLabels[key]) {
          acc[key] = defaultValues?.[key] || "";
        }
        return acc;
      },
      {}
    );

    initialInput["features_list"] = [];

    if (Object.keys(initialInput).includes("minimum_term")) {
      initialInput["term"] = "Month";
    }
    if (Object.keys(initialInput).includes("billing_cycle")) {
      initialInput["billing_cycle"] = "Month";
    }

    setInput(initialInput);
    form.setFieldsValue(initialInput);

    constructList();
  }, [defaultValues, model, isModalOpen, constructList, form]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  // The backend processes an uploaded image asynchronously, so poll until the
  // derived `image_local.base` shows up. Bounded and spaced out: an unbounded
  // tight loop hammers the API forever when no image is ever attached.
  const onUpdateItem = (blitzID: string) => {
    if (!blitzID) return;

    const POLL_INTERVAL = 2000;
    const POLL_TIMEOUT = 60000;

    setTimeout(async () => {
      const bdModel = await (await loadBlitzData())._Model.get(
        AdFusionModelName
      );
      const deadline = Date.now() + POLL_TIMEOUT;

      while (Date.now() < deadline) {
        const item = await bdModel?.get(blitzID);
        const object = item?.toObject();

        if (object?.image_local?.base) {
          context?.onUpdate?.(object as TAdItem);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
      }

      // Timed out waiting for the image; surface the item as it stands so the
      // list still reflects the new ad.
      const item = await bdModel?.get(blitzID);
      if (item) context?.onUpdate?.(item.toObject() as TAdItem);
    }, 4000);
  };

  // 2025-05-20 KH: https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-05-20/Locatio.%20/2ab806--8qesbg?proj=1s4dec-3ibnqe
  const checkAndAddLocation = async () => {
    try {
      const element = await model?.list({ limit: 1 });
      if (element && element.length > 0) {
        const location: LocationType = element[0].address;
        const coordinates = await Promise.race([
          location.geocodeAddress(
            getAddressText(input),
            ENV.GOOGLE_MAPS_API_KEY
          ),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Geocoding timeout")), 5000)
          ),
        ]);

        console.log("coordinates", coordinates);

        if (coordinates) {
          // Now you can set the address with coordinates
          input["address"] = {
            ...coordinates,
            street: input.street,
            city: input.city,
            zip: input.zipcode,
            nation: input.country,
          };
        }
      }
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const submit = async () => {
    input["minimum_term"] = `${input["minimum_term"]} ${input["term"]}`;
    input["source"] = "manual";
    delete input["term"];
    console.log("input", input);

    if (!executeRecaptcha) {
      console.error("reCAPTCHA not yet initialized");
      // return;
    }

    if (!input.gallery) {
      input["gallery"] = [];
    }
    setLoading(true);
    if (executeRecaptcha) {
      const token = await executeRecaptcha("add_item");
      const response = await fetch(`${ENV.API_URL}/realestateadmin/recaptcha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ token }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("reCAPTCHA verified successfully!");
      } else {
        notification.error({
          message: translate("Add Failed"),
          description: translate(
            "reCAPTCHA verification failed. Please try again."
          ),
          duration: 5,
        });
        setLoading(false);
        return;
      }
    }

    input["fusion_record_fk"] = "";
    if (input.image_local?.base !== undefined && type === "EDIT") {
      delete input.image_local;
    }

    if (input["available_from"] && input["available_from"] !== "") {
      input["available_from"] = `${input["available_from"]} 00:00:00`;
    }

    const offerObj = list.filter((item) => item.key === "offer_fk");

    const offerEntry = offerObj[0].options?.filter(
      (item) => item._blitzID === input.offer_fk
    );

    const isPaid = Number(offerEntry?.[0].price) > 0;

    (async () => {
      const bdModel = await (await loadBlitzData())._Model.get(AdFusionModelName);
      await checkAndAddLocation();
      const isRenting = ["TR", "STR"].includes(input.subcategory);
      input["country"] = "CH";
      if (isRenting) {
        input["price"] = (
          Number(input["price_cold_rent"]) + Number(input["price_charges"])
        ).toString();
      }
      if (type === "EDIT" && defaultValues) {
        const different: Record<string, any> = {};
        for (const key in input) {
          if (input[key] !== defaultValues[key]) {
            different[key] = input[key];
          }
        }
        const item = await bdModel?.get(defaultValues._blitzID);
        for (const key in different) {
          await item?.edit(key, input[key]);
        }
        if (different.image_local) {
          onUpdateItem(defaultValues._blitzID);
        } else {
          context?.onUpdate?.(item?.toObject() as TAdItem);
        }
      } else {
        const res = await bdModel?.add(input);
        const added = res?.toObject();
        // Only wait for image processing when an image was actually submitted.
        if (input.image_local) {
          onUpdateItem(added?._blitzID);
        } else if (added) {
          context?.onUpdate?.(added as TAdItem);
        }
      }
      form.resetFields();

      notification.success({
        message: translate("Thank you"),
        description: translate(
          isPaid ? "Paid Ad added successfully" : "Ad added successfully"
        ),
        duration: 5,
      });
      setLoading(false);
      setIsModalOpen(false);
    })();
  };

  const hardCode = () => {
    form.setFieldsValue({
      title: "Test location",
      description: "<ul><li>first</li><li>second</li><li>third</li></ul>",
      email: "blitzkhaled@gmail.com",
      display_email: "blitzkhaled@gmail.com",
      phone_number: "",
      zipcode: "8001",
      street: "Walchebrücke",
      city: "Zürich",
      subcategory: "TS",
      number_of_rooms: "3.0",
      property_type: "Apartment",
      minimum_term: " Month",
      price: "100000",
      area: "120",
      furnished: "",
      pets_allowed: "",
      features_list: ["cable_tv", "cellar"],
      price_cold_rent: "",
      price_charges: "",
      offer_fk: "22wpeu-15kiaps7",
      billing_cycle: "Month",
      year_of_construction: "2025",
      last_renovation: "",
      insert_internet_link: "",
      insert_link_name: "",
      company_published: "",
      property_area: "",
      name_published: "",
      available_from: "",
      country: "Switzerland",
      address: "Walchebrücke, Walchebrücke, 8001 Zürich, Switzerland",
      source: "manual",
    });
    setInput({
      title: "Test location",
      description: "<ul><li>first</li><li>second</li><li>third</li></ul>",
      email: "blitzkhaled@gmail.com",
      display_email: "blitzkhaled@gmail.com",
      phone_number: "",
      zipcode: "8001",
      street: "Walchebrücke",
      city: "Zürich",
      subcategory: "TS",
      number_of_rooms: "3.0",
      property_type: "Apartment",
      minimum_term: " Month",
      price: "100000",
      area: "120",
      furnished: "",
      pets_allowed: "",
      features_list: ["cable_tv", "cellar"],
      price_cold_rent: "",
      price_charges: "",
      offer_fk: "22wpeu-15kiaps7",
      billing_cycle: "Month",
      year_of_construction: "2025",
      last_renovation: "",
      insert_internet_link: "",
      insert_link_name: "",
      company_published: "",
      property_area: "",
      name_published: "",
      available_from: "",
      country: "Switzerland",
      address: "Walchebrücke, Walchebrücke, 8001 Zürich, Switzerland",
      source: "manual",
    });
  };

  if (!context) {
    return null;
  }

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false}
      onCancel={() => setIsModalOpen(false)}
      centered
      zIndex={3}
      style={{
        padding: "40px 10px",
        position: "absolute",
        left: 0,
        right: 0,
        maxWidth: "524px",
      }}
      width="100%"
    >
      {DEBUG && <div onClick={hardCode}>fill</div>}
      <div>
        <Typography.Title level={3}>
          {translate(type === "ADD" ? "Add item" : "Edit item")}
          {defaultValues?._blitzID}
        </Typography.Title>
      </div>
      {input && (
        <Form
          form={form}
          layout="vertical"
          initialValues={input}
          onFinish={submit}
          scrollToFirstError
        >
          <FormFields
            input={input}
            setInput={setInput}
            list={list}
            optionsList={optionsList}
          />
        </Form>
      )}
      <div
        className="flex w-full gap-4 px-4"
        style={{ justifyContent: "center", marginTop: "24px" }}
      >
        <Button
          size="large"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          {translate("Cancel")}
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.submit();
          }}
          loading={loading}
        >
          {translate(type === "ADD" ? "Add" : "Update")}
        </Button>
      </div>
    </Modal>
  );
};

export default AddEditItemForm;
