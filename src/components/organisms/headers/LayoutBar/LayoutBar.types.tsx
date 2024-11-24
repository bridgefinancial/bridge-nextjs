import { LogoImageProps } from '@/components/atoms/images/LogoImage/LogoImage.component';
import { User } from '@/types/users.types';
import { MutationFunction } from '@tanstack/react-query';

export interface LayoutBarProps {
  logoProps?: LogoImageProps;
  title?: string;
  handleDrawerToggle?: () => void;
  logout?: (() => void) | (() => Promise<void>) | MutationFunction<void, void>; // Simplified type union
  user?: User;
}
