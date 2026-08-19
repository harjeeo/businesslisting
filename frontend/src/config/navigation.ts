import {
  GridViewIcon,
  Building06Icon,
  UserMultipleIcon,
  Layers01Icon,
  Location01Icon,
  UserGroupIcon,
  Settings02Icon,
} from "hugeicons-react";
import type { NavItem } from "../types/nav";

export const navItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: GridViewIcon },
  { label: "Businesses", path: "/businesses", icon: Building06Icon },
  { label: "Users", path: "/users", icon: UserMultipleIcon },
  { label: "Categories", path: "/categories", icon: Layers01Icon },
  { label: "Locations", path: "/locations", icon: Location01Icon },
  { label: "Admin Users", path: "/admin-users", icon: UserGroupIcon },
  { label: "Settings", path: "/settings", icon: Settings02Icon },
];
