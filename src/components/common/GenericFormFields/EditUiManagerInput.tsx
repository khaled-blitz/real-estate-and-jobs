/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { Form } from "antd";
import { Props } from "@/logic/listControl/Attributes/props";
import { useLocalization } from "@/logic/localization";
import { BlitzData } from "blitzdata.ts";

/**
 * Props for the EditUiManagerInput component
 * Extends the base Props interface with additional properties
 */
interface EditUiManagerInputProps extends Props {
  /**
   * Type of input to mount (e.g., "location", "date", etc.)
   */
  inputType: "number" | "boolean" | "location" | "date" | "textarea" | "image" | "text" | "phone";
  
  /**
   * Optional custom element ID for the mounted input
   * If not provided, a unique ID will be generated based on item key and input type
   */
  elementId?: string;
  
  /**
   * Optional configuration to pass to BlitzData.ui.mountInput
   * This will be merged with default configuration
   */
  config?: Record<string, any>;
  
  /**
   * Optional additional props to pass to Form.Item
   */
  formItemProps?: Record<string, any>;
}

/**
 * A generic component for mounting BlitzData UI manager inputs within Ant Design forms
 * Handles mounting/unmounting of the input and integration with form validation
 */
const EditUiManagerInput: React.FC<EditUiManagerInputProps> = ({
  input,
  item,
  onChange,
  inputType,
  elementId,
  config = {},
  formItemProps = {},
}) => {
  const { translate } = useLocalization();
  const inputMounted = useRef(false);
  const uniqueId = elementId || `${item.key}_${inputType}_input`;

  useEffect(() => {
    // Only mount the input once
    if (!inputMounted.current) {
      // Prepare configuration with smart defaults and custom overrides
      const mergedConfig = {
        // Default onChange handler that updates the form
        onChange,
        // Override with custom config
        ...config,
      };

      // Mount the input
      if (!BlitzData.ui?.mountInput) {
        inputMounted.current = false;
        return;
      }
      BlitzData.ui.mountInput(inputType, uniqueId, mergedConfig);
      inputMounted.current = true;
    }

    // Clean up when component unmounts
    return () => {
      // Attempt to clean up the mounted input
      // Note: If unmountInput is not available, we'll just let it be garbage collected
      try {
        // @ts-expect-error unmountInput might not be explicitly defined in the interface
        if (BlitzData.ui.unmountInput) {
          // @ts-expect-error unmountInput might not be explicitly defined in the interface
          BlitzData.ui.unmountInput(uniqueId);
        }
      } catch (error) {
        console.warn('Error unmounting UI input:', error);
      }
    };
  }, [input, item.key, onChange, uniqueId, inputType, config]);

  return (
    <Form.Item
      label={item.label}
      name={item.key}
      initialValue={input[item.key]}
      className="mb-0 w-full"
      extra={item.description}
      validateTrigger="onBlur"
      rules={[
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          validator: (_, value) =>
          {
            console.log("validating", input[item.key]);
            if (!item.required || input[item.key]) {
              return Promise.resolve();
            }
            return Promise.reject(new Error(translate("Please fill this field")));
          }
        },
        ...(formItemProps?.rules || []),
      ]}
      {...formItemProps}
    >
      <div 
        id={uniqueId} 
        className="w-full rounded-xl" 
        onClick={(e) => e.stopPropagation()}
        data-input-type={inputType}
      />
    </Form.Item>
  );
};

export default EditUiManagerInput;
