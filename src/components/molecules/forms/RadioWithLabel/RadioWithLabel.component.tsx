import CustomFormControlLabel from '@/components/molecules/forms/CustomFormControlLabel';
import { Radio, useMediaQuery, useTheme } from '@mui/material';
import { CustomFormControlLabelProps } from '../CustomFormControlLabel/CustomFormControlLabel.component';

interface RadioWithLabelProps extends CustomFormControlLabelProps {}

export default function RadioWithLabel(props: RadioWithLabelProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    checked,
    name,
    value,
    label,
    onChange = () => {}, // No-op default if onChange is not provided
    control = <Radio />, // Default to Checkbox if no control is passed
    className,
    labelPlacement,
    ...rest
  } = props;
  return (
    <CustomFormControlLabel
      checked={checked}
      name={name}
      labelPlacement={
        labelPlacement ? labelPlacement : isMobile ? 'start' : 'top'
      }
      value={value}
      label={label}
      onChange={onChange}
      control={control}
      classes={{
        label: isMobile ? 'initial' : 'text-center h-12 flex items-center',
      }}
      className={`${className ? className : ''} cursor-pointer ${isMobile ? 'inline-block' : ''}`}
      {...rest}
    />
  );
}
