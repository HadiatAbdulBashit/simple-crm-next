export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}
