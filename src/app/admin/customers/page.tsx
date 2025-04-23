import { AppSidebarHeader } from "@/components/app-sidebar-header";
import { BreadcrumbItem, Customer } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import customer from "@/constant/customers.constant.json";

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
        <DataTable columns={columns} data={customer as Customer[]} />
      </div>
    </>
  );
}
