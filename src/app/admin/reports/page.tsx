import { AppSidebarHeader } from "@/components/app-sidebar-header";
import LineChartComponent from "@/components/line-chart";
import { SectionCards } from "@/components/section-card";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Report",
    href: "/reports",
  },
];

export default function Reports() {
  return (
    <>
      <AppSidebarHeader breadcrumbs={breadcrumbs} />
      <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4 @container/main'>
        <SectionCards />
        <LineChartComponent />
      </div>
    </>
  );
}
