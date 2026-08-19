import {
  GridViewIcon,
  Building06Icon,
  UserMultipleIcon,
  Layers01Icon,
  Location01Icon,
  UserGroupIcon,
  Settings02Icon,
  Package01Icon,
  ServiceIcon,
  Target01Icon,
  FileValidationIcon,
  StarIcon,
} from "hugeicons-react";
import type { NavItem } from "../types/nav";

export const navItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: GridViewIcon },
  { label: "Businesses", path: "/businesses", icon: Building06Icon },
  { label: "Users", path: "/users", icon: UserMultipleIcon },
  { label: "Categories", path: "/categories", icon: Layers01Icon },
  { label: "Products", path: "/products", icon: Package01Icon },
  { label: "Services", path: "/services", icon: ServiceIcon },
  { label: "Leads", path: "/leads", icon: Target01Icon },
  { label: "RFQs", path: "/rfqs", icon: FileValidationIcon },
  { label: "Reviews", path: "/reviews", icon: StarIcon },
  { label: "Locations", path: "/locations", icon: Location01Icon },
  { label: "Admin Users", path: "/admin-users", icon: UserGroupIcon },
  { label: "Settings", path: "/settings", icon: Settings02Icon },
];
