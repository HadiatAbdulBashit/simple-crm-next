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

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "Active" | "Inactive" | "Prospect";
  tags: string[];
  lastContact: string;
  createdAt: string;
  assignedTo: string;
};
