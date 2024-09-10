import { User } from "@/types/users.types";
import { ListItemProps } from "@mui/material";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import { CSSProperties } from "react";

export interface PortalTab {
  label?: string;
  icon?: string;
  active?: boolean;
  linkProps?: LinkProps;
}

export interface PortalLayoutProps {
  window?: () => Window;
  logoProps?: ImageProps;
  LinkComponent?: typeof Link;
  tabs?: PortalTab[];
  children?: React.ReactNode;
}

export interface PortalListItemProps {
  text: string;
  href: string | any;
  active?: boolean;
  icon?: string;
  LinkComponent: typeof Link;
  linkProps?: LinkProps;
  listItemProps?: ListItemProps;
}

export interface LogoProps extends Omit<ImageProps, "src"> {
  src: string | StaticImport;
}

export interface BarProps {
  logoProps?: LogoProps;
  title?: string;
  handleDrawerToggle?: () => void;
  logout?: () => void;
  user?: User;
}

export interface PortalLogoProps extends Partial<LogoProps> {
  width?: number;
  height?: number;
  containerStyle?: CSSProperties;
}
