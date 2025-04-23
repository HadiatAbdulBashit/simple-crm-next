"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
const chartData = [
  { month: "January", inactive: 186, active: 280 },
  { month: "February", inactive: 305, active: 400 },
  { month: "March", inactive: 237, active: 320 },
  { month: "April", inactive: 73, active: 490 },
  { month: "May", inactive: 209, active: 330 },
  { month: "June", inactive: 214, active: 440 },
];

const chartConfig = {
  inactive: {
    label: "Inactive",
    color: "hsl(var(--chart-1))",
  },
  active: {
    label: "Active",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function AreaChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Status</CardTitle>
        <CardDescription>January - April 2025</CardDescription>
      </CardHeader>
      <CardContent className='grow'>
        <ChartContainer config={chartConfig} className='h-full w-full'>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
            <Area dataKey='active' type='natural' fill='var(--color-active)' fillOpacity={0.4} stroke='var(--color-active)' stackId='a' />
            <Area
              dataKey='inactive'
              type='natural'
              fill='var(--color-inactive)'
              fillOpacity={0.4}
              stroke='var(--color-inactive)'
              stackId='a'
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
