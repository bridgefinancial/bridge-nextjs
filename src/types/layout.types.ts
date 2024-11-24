import { LogoImageProps } from '@/components/atoms/images/LogoImage/LogoImage.component';
import { MutationFunction } from '@tanstack/react-query';
import Link, { LinkProps } from 'next/link';
import { User } from './users.types';

export interface PortalTab {
  label?: string;
  icon?: string;
  active?: boolean;
  linkProps?: LinkProps;
}

export interface LayoutForPortalProps {
  window?: () => Window;
  logoProps?: LogoImageProps;
  LinkComponent?: typeof Link;
  tabs?: PortalTab[];
  children?: React.ReactNode;
  user?: User;
  pathname: string;
  logout: MutationFunction<void, void> | (() => void) | (() => Promise<void>);
}
