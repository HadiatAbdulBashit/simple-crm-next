import { AppSidebarHeader } from "@/components/app-sidebar-header";
import { BreadcrumbItem, Customer } from "@/types";
import { columns } from "./columns";
import customer from "@/constant/customers.constant.json";
import { DataTableServer } from "@/components/data-table";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Customer",
    href: "/customers",
  },
];

export default function CustomersPage() {
  return (
    <>
      <AppSidebarHeader breadcrumbs={breadcrumbs} />
      <div className='rounded-xl p-4 w-full'>
        <DataTableServer<Customer, unknown> columns={columns} endpoint='/customers' />
      </div>
    </>
  );
}
