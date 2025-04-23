"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
const chartData = [
  { browser: "asia", visitors: 275, fill: "var(--color-asia)" },
  { browser: "oceanian", visitors: 200, fill: "var(--color-oceanian)" },
  { browser: "europe", visitors: 287, fill: "var(--color-europe)" },
  { browser: "america", visitors: 173, fill: "var(--color-america)" },
  { browser: "africa", visitors: 190, fill: "var(--color-africa)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  asia: {
    label: "Asia",
    color: "hsl(var(--chart-1))",
  },
  oceanian: {
    label: "Oceanian",
    color: "hsl(var(--chart-2))",
  },
  europe: {
    label: "Europe",
    color: "hsl(var(--chart-3))",
  },
  america: {
    label: "America",
    color: "hsl(var(--chart-4))",
  },
  africa: {
    label: "Africa",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PieChartComponent() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Customer Demografy</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto w-full h-full'>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey='visitors'
              nameKey='browser'
              innerRadius={45}
              strokeWidth={5}
              labelLine={false}
              label={({ payload, ...props }) => (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill='hsla(var(--foreground))'
                  className='fill-foreground'
                >
                  {payload.visitors}
                </text>
              )}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 5} />
                  <Sector {...props} outerRadius={outerRadius + 12} innerRadius={outerRadius + 7} />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                          Customer
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey='browser' />}
              className='flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center min-w-fit'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
