import type { ComponentType } from "react";

export type IconComponent = ComponentType<{
  className?: string;
  size?: number;
  color?: string;
}>;

export interface NavItem {
  label: string;
  path: string;
  icon: IconComponent;
}
