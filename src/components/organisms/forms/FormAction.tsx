import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import React from "react";

export type FormActionConfig = {
  hidden: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
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
    />
  );
};

export default FormAction;
