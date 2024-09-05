import { CircularProgress, CircularProgressProps } from '@mui/material';
import React, { CSSProperties, useMemo } from 'react';

export interface LoadingSpinnerProps extends CircularProgressProps {
  centered?: boolean;
  testId?: string;
  containerStyle?: CSSProperties; 
  spinnerProps?: CircularProgressProps;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { centered = true, testId = 'loading-spinner', containerStyle, spinnerProps = {
    size: 40, color: 'primary'
  } } = props;
  const { size, color, ...restSpinnerProps } = spinnerProps;

  const spinnerStyle: CSSProperties = useMemo(() => {
    return centered
      ? { 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'column',
          alignContent: 'center'
        }
      : {};
  }, [centered]);

  const memoizedContainerStyle: CSSProperties = useMemo(() => {
    return containerStyle || {};
  }, [containerStyle]);

  return (
    <div style={memoizedContainerStyle} data-testid={`${testId}-container`}>
      <div style={spinnerStyle} data-testid={testId}>
        <CircularProgress size={size} color={color} {...restSpinnerProps} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
