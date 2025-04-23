import { AppSidebarHeader } from "@/components/app-sidebar-header";
import AreaChartComponent from "@/components/area-chart";
import BarChartComponent from "@/components/bar-chart";
import LineChartComponent from "@/components/line-chart";
import { PieChartComponent } from "@/components/pie-chart";
import { SectionCards } from "@/components/section-card";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
  },
];

export default function Dashboard() {
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
