import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import TitleText from '@/components/atoms/typography/TitleText';
import useMergeProps from '@/hooks/useMergeProps.hook';
import { colors } from '@/theme/theme';
import { BaseButtonProps } from '@/types/base-button-props.interface';
import { BaseTypographyProps } from '@/types/base-typography-props.interface';
import { SxProps } from '@mui/material';
import CheckoutForm, { ProductKey } from '../Checkout/CheckoutForm';
import {
  MessageWithCTAButtonWrap,
  MessageWithCTAIconWrap,
  MessageWithCTAParagraphWrap,
  MessageWithCTATitleWrap,
  MessageWithCTAWrap,
} from './MessageWithCTA.styles';

export interface MessageWithCTAProps {
  titleProps: {
    titleText: string;
    titleStyles?: BaseTypographyProps;
  };
  paragraphProps: {
    paragraphText: string;
    paragraphStyles?: BaseTypographyProps;
  };
  buttonProps?: CTAButtonProps | null; // Allow buttonProps to be null
  icon?: React.ReactNode;
  containerStyles?: SxProps;
}

export interface CTAButtonProps extends BaseButtonProps {
  onClick?: BaseButtonProps['onClick'];
  text: BaseButtonProps['text'];
  href?: BaseButtonProps['href'];
  endIcon?: React.ReactNode;
  checkoutProductKey?: ProductKey;
}

// Default props for fallback values
const defaultButtonProps: Partial<CTAButtonProps> = {
  fullWidth: false,
  textColor: colors.bridgeDarkPurple,
  backgroundColor: 'white',
  text: 'Click Me',
  textProps: {
    fontWeight: '700',
  },
};

const defaultTitleProps: Partial<MessageWithCTAProps['titleProps']> = {
  titleText: '',
  titleStyles: {
    fontSize: 32,
    fontWeight: 700,
    textAlign: 'center',
    color: 'white',
  },
};

const defaultParagraphProps: Partial<MessageWithCTAProps['paragraphProps']> = {
  paragraphText: '',
  paragraphStyles: {
    color: 'white',
    fontSize: 16,
    fontWeight: 700,
    textAlign: 'center',
  },
};

function MessageWithCTA(props: MessageWithCTAProps) {
  const {
    titleProps = defaultTitleProps,
    paragraphProps = defaultParagraphProps,
    buttonProps = defaultButtonProps,
    containerStyles = {},
    icon = null,
  } = props;

  // Merge default and user-provided props using useMergeProps
  const mergeButtonProps = useMergeProps(defaultButtonProps, buttonProps || {});

  const mergeParagraphProps = useMergeProps(
    defaultParagraphProps,
    paragraphProps
  );

  const mergeTitleProps = useMergeProps(defaultTitleProps, titleProps);
  return (
    <MessageWithCTAWrap sx={containerStyles}>
      {icon ? <MessageWithCTAIconWrap>{icon}</MessageWithCTAIconWrap> : null}

      <MessageWithCTATitleWrap>
        <TitleText sx={{ ...(mergeTitleProps.titleStyles as any) }}>
          {mergeTitleProps.titleText}
        </TitleText>
      </MessageWithCTATitleWrap>

      <MessageWithCTAParagraphWrap>
        <ParagraphText
          fontWeight={'600'}
          sx={{ ...(mergeParagraphProps.paragraphStyles as any) }}
        >
          {mergeParagraphProps.paragraphText}
        </ParagraphText>
      </MessageWithCTAParagraphWrap>

      {mergeButtonProps && ( // Render the button only if mergeButtonProps is not null
        <MessageWithCTAButtonWrap>
          {mergeButtonProps.checkoutProductKey ? (
            <CheckoutForm productKey={mergeButtonProps.checkoutProductKey}>
              <ContainedButton type="submit" {...mergeButtonProps} />
            </CheckoutForm>
          ) : (
            <ContainedButton {...mergeButtonProps} />
          )}
        </MessageWithCTAButtonWrap>
      )}
    </MessageWithCTAWrap>
  );
}

export default MessageWithCTA;
