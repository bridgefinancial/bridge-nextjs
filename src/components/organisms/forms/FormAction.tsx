import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import { BaseButtonProps } from "@/types/base-button-props.interface";
import React from "react";

export type FormActionConfig = {
  hidden: boolean;
  onClick: BaseButtonProps['onClick']
  disabled: boolean;
  isLoading: boolean;
  text: string;
  type?: "button" | "submit";
};

const FormAction = ({
  hidden,
  onClick,
  disabled,
  isLoading,
  type,
  text,
}: FormActionConfig) => {
  if (hidden) {
    return <></>;
  }

  return (
    <ContainedButton
      disabled={disabled}
      onClick={onClick}
      isLoading={isLoading}
      type={type ?? "button"}
      text={text}
      backgroundColor="#6a5ace"
    />
  );
};

export default FormAction;
