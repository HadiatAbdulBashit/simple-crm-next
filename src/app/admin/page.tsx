import { AppSidebarHeader } from "@/components/app-sidebar-header";
import AreaChartComponent from "@/components/area-chart";
import BarChartComponent from "@/components/bar-chart";
import LineChartComponent from "@/components/line-chart";
import { PieChartComponent } from "@/components/pie-chart";
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
        <div className='grid auto-rows-min gap-4 lg:grid-cols-3'>
          <BarChartComponent />
          <PieChartComponent />
          <AreaChartComponent />
        </div>
        <LineChartComponent />
      </div>
    </>
  );
}
