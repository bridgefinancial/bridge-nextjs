import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextButton from "@/components/atoms/buttons/TextButton/TextButton.component";
import { colors } from "@/theme/theme";
import { BaseButtonProps } from "@/types/base-button-props.interface";
import { Button } from "@mui/material";
import React, { ReactNode } from "react";

export type FormActionConfig = {
  hidden: boolean;
  onClick: BaseButtonProps["onClick"];
  disabled: boolean;
  isLoading: boolean;
  text: string;
  type?: "button" | "submit";
  variant?: "contained" | "text";
  endIcon?: ReactNode;
};

const FormAction = ({
  hidden,
  onClick,
  disabled,
  isLoading,
  type,
  text,
  variant,
  endIcon,
}: FormActionConfig) => {
  if (hidden) {
    return <></>;
  }

  if (variant === "text") {
    return (
      <TextButton
        disabled={disabled}
        onClick={onClick}
        isLoading={isLoading}
        type={type ?? "button"}
        text={text}
        textColor={colors.bridgeDarkPurple}
      ></TextButton>
    );
  }
  return (
    <ContainedButton
      disabled={disabled}
      onClick={onClick}
      isLoading={isLoading}
      type={type ?? "button"}
      text={text}
      backgroundColor="#6a5ace"
      endIcon={endIcon}
    />
  );
};

export default FormAction;
