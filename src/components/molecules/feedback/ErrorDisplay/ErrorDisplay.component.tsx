import ParagraphText from '@/components/atoms/typography/ParagraphText';
import { styled } from '@mui/material/styles';

const ErrorStyled = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
}));

type ErrorDisplayProps = {
  error?: string;
  helpText?: string;
};

const ErrorDisplay = ({ error, helpText }: ErrorDisplayProps) => (
  <ErrorStyled>
    {helpText && <div>{helpText}</div>}
    {!!error && <ParagraphText>{error}</ParagraphText>}
  </ErrorStyled>
);

export default ErrorDisplay;
