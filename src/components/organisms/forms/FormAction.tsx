import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import TextButton from '@/components/atoms/buttons/TextButton/TextButton.component';
import { colors } from '@/theme/theme';
import { BaseButtonProps } from '@/types/base-button-props.interface';
import { ReactNode } from 'react';

export interface FormActionConfig extends Partial<BaseButtonProps> {
  hidden: boolean;
  onClick: BaseButtonProps['onClick'];
  disabled: boolean;
  isLoading: boolean;
  text: string;
  sx?: BaseButtonProps['sx'];
  type?: 'button' | 'submit';
  variant?: 'contained' | 'text';
  textProps?: BaseButtonProps['textProps'];
  endIcon?: ReactNode;
}

const FormAction = ({
  hidden,
  onClick,
  disabled,
  isLoading,
  type,
  sx = {},
  text,
  variant,
  textProps,
  endIcon,
}: FormActionConfig) => {
  if (hidden) {
    return <></>;
  }

  if (variant === 'text') {
    return (
      <TextButton
        disabled={disabled}
        onClick={onClick}
        textProps={textProps}
        isLoading={isLoading}
        type={type ?? 'button'}
        sx={sx}
        text={text}
        textColor={colors.bridgeDarkPurple}
      />
    );
  }
  return (
    <ContainedButton
      disabled={disabled}
      onClick={onClick}
      isLoading={isLoading}
      sx={sx}
      type={type ?? 'button'}
      text={text}
      backgroundColor="#6a5ace"
      endIcon={endIcon}
      textProps={textProps}
    />
  );
};

export default FormAction;
