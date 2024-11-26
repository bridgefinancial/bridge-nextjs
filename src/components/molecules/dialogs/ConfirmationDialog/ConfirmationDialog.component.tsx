import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import TitleText from '@/components/atoms/typography/TitleText';
import { BaseButtonProps } from '@/types/base-button-props.interface';
import React from 'react';
import BaseDialog, {
  BaseDialogProps,
} from '../BaseDialog/BaseDialog.component';

export interface ConfirmationDialog {
  open: BaseDialogProps['open'];
  onClose: () => void;
  onCancelButtonProps: BaseButtonProps;
  onConfirmButtonProps: BaseButtonProps;
  messageText: string;
  ariaDescribedBy?: BaseDialogProps['ariaDescribedBy'];
  maxWidth?: BaseDialogProps['maxWidth'];
  fullWidth?: BaseDialogProps['fullWidth'];
  titleProps: BaseDialogProps['titleProps'];
}

const ConfirmationDialog: React.FC<ConfirmationDialog> = (
  props: ConfirmationDialog,
) => {
  const {
    titleProps = {
      titleText: '',
      titleStyles: {
        fontWeight: 400,
      },
    },
    ariaDescribedBy = 'cd',
    onConfirmButtonProps = {
      text: 'Save',
    },
    messageText = 'Are you sure?',
    maxWidth = 'sm',
    fullWidth = true,
    onCancelButtonProps = {
      text: 'Cancel',
    },
    onClose,
    open = true,
  } = props;

  return (
    <BaseDialog
      ariaDescribedBy={`confirmation-${ariaDescribedBy}`}
      open={open}
      fullWidth={fullWidth}
      onClose={onClose}
      maxWidth={maxWidth}
      actions={[
        <ContainedButton key={1} {...onConfirmButtonProps} />,
        <ContainedButton key={2} {...onCancelButtonProps} />,
      ]}
      titleProps={titleProps}
    >
      <TitleText
        component={'h1'}
        sx={{
          fontSize: 20,
          textAlign: 'center',
        }}
      >
        {messageText}
      </TitleText>
    </BaseDialog>
  );
};

export default ConfirmationDialog;
