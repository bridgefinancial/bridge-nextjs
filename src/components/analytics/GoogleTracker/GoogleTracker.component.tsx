import { GoogleAnalytics } from '@next/third-parties/google';

interface GoogleTrackerProps {
  gaId: string;
  dataLayerName?: string;
  debugMode?: boolean;
  nonce?: string;
}

function GoogleTracker(props: GoogleTrackerProps) {
  const { gaId, ...rest } = props;
  return <GoogleAnalytics gaId={gaId} {...rest} />;
}

export default GoogleTracker;
