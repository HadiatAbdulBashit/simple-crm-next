"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
const chartData = [
  { date: "2024-02-01", desktop: 222, mobile: 150 },
  { date: "2024-02-02", desktop: 97, mobile: 180 },
  { date: "2024-02-03", desktop: 167, mobile: 120 },
  { date: "2024-02-04", desktop: 242, mobile: 260 },
  { date: "2024-02-05", desktop: 373, mobile: 290 },
  { date: "2024-02-06", desktop: 301, mobile: 340 },
  { date: "2024-02-07", desktop: 245, mobile: 180 },
  { date: "2024-02-08", desktop: 409, mobile: 320 },
  { date: "2024-02-09", desktop: 59, mobile: 110 },
  { date: "2024-02-10", desktop: 261, mobile: 190 },
  { date: "2024-02-11", desktop: 327, mobile: 350 },
  { date: "2024-02-12", desktop: 292, mobile: 210 },
  { date: "2024-02-13", desktop: 342, mobile: 380 },
  { date: "2024-02-14", desktop: 137, mobile: 220 },
  { date: "2024-02-15", desktop: 120, mobile: 170 },
  { date: "2024-02-16", desktop: 138, mobile: 190 },
  { date: "2024-02-17", desktop: 446, mobile: 360 },
  { date: "2024-02-18", desktop: 364, mobile: 410 },
  { date: "2024-02-19", desktop: 243, mobile: 180 },
  { date: "2024-02-20", desktop: 89, mobile: 150 },
  { date: "2024-02-21", desktop: 137, mobile: 200 },
  { date: "2024-02-22", desktop: 224, mobile: 170 },
  { date: "2024-02-23", desktop: 138, mobile: 230 },
  { date: "2024-02-24", desktop: 387, mobile: 290 },
  { date: "2024-02-25", desktop: 215, mobile: 250 },
  { date: "2024-02-26", desktop: 75, mobile: 130 },
  { date: "2024-02-27", desktop: 383, mobile: 420 },
  { date: "2024-02-28", desktop: 122, mobile: 180 },
  { date: "2024-02-29", desktop: 315, mobile: 240 },
  { date: "2024-02-30", desktop: 454, mobile: 380 },
  { date: "2024-03-01", desktop: 165, mobile: 220 },
  { date: "2024-03-02", desktop: 293, mobile: 310 },
  { date: "2024-03-03", desktop: 247, mobile: 190 },
  { date: "2024-03-04", desktop: 385, mobile: 420 },
  { date: "2024-03-05", desktop: 481, mobile: 390 },
  { date: "2024-03-06", desktop: 498, mobile: 520 },
  { date: "2024-03-07", desktop: 388, mobile: 300 },
  { date: "2024-03-08", desktop: 149, mobile: 210 },
  { date: "2024-03-09", desktop: 227, mobile: 180 },
  { date: "2024-03-10", desktop: 293, mobile: 330 },
  { date: "2024-03-11", desktop: 335, mobile: 270 },
  { date: "2024-03-12", desktop: 197, mobile: 240 },
  { date: "2024-03-13", desktop: 197, mobile: 160 },
  { date: "2024-03-14", desktop: 448, mobile: 490 },
  { date: "2024-03-15", desktop: 473, mobile: 380 },
  { date: "2024-03-16", desktop: 338, mobile: 400 },
  { date: "2024-03-17", desktop: 499, mobile: 420 },
  { date: "2024-03-18", desktop: 315, mobile: 350 },
  { date: "2024-03-19", desktop: 235, mobile: 180 },
  { date: "2024-03-20", desktop: 177, mobile: 230 },
  { date: "2024-03-21", desktop: 82, mobile: 140 },
  { date: "2024-03-22", desktop: 81, mobile: 120 },
  { date: "2024-03-23", desktop: 252, mobile: 290 },
  { date: "2024-03-24", desktop: 294, mobile: 220 },
  { date: "2024-03-25", desktop: 201, mobile: 250 },
  { date: "2024-03-26", desktop: 213, mobile: 170 },
  { date: "2024-03-27", desktop: 420, mobile: 460 },
  { date: "2024-03-28", desktop: 233, mobile: 190 },
  { date: "2024-03-29", desktop: 78, mobile: 130 },
  { date: "2024-03-30", desktop: 340, mobile: 280 },
  { date: "2024-03-31", desktop: 178, mobile: 230 },
  { date: "2024-04-01", desktop: 178, mobile: 200 },
  { date: "2024-04-02", desktop: 470, mobile: 410 },
  { date: "2024-04-03", desktop: 103, mobile: 160 },
  { date: "2024-04-04", desktop: 439, mobile: 380 },
  { date: "2024-04-05", desktop: 88, mobile: 140 },
  { date: "2024-04-06", desktop: 294, mobile: 250 },
  { date: "2024-04-07", desktop: 323, mobile: 370 },
  { date: "2024-04-08", desktop: 385, mobile: 320 },
  { date: "2024-04-09", desktop: 438, mobile: 480 },
  { date: "2024-04-10", desktop: 155, mobile: 200 },
  { date: "2024-04-11", desktop: 92, mobile: 150 },
  { date: "2024-04-12", desktop: 492, mobile: 420 },
  { date: "2024-04-13", desktop: 81, mobile: 130 },
  { date: "2024-04-14", desktop: 426, mobile: 380 },
  { date: "2024-04-15", desktop: 307, mobile: 350 },
  { date: "2024-04-16", desktop: 371, mobile: 310 },
  { date: "2024-04-17", desktop: 475, mobile: 520 },
  { date: "2024-04-18", desktop: 107, mobile: 170 },
  { date: "2024-04-19", desktop: 341, mobile: 290 },
  { date: "2024-04-20", desktop: 408, mobile: 450 },
  { date: "2024-04-21", desktop: 169, mobile: 210 },
  { date: "2024-04-22", desktop: 317, mobile: 270 },
  { date: "2024-04-23", desktop: 480, mobile: 530 },
  { date: "2024-04-24", desktop: 132, mobile: 180 },
  { date: "2024-04-25", desktop: 141, mobile: 190 },
  { date: "2024-04-26", desktop: 434, mobile: 380 },
  { date: "2024-04-27", desktop: 448, mobile: 490 },
  { date: "2024-04-28", desktop: 149, mobile: 200 },
  { date: "2024-04-29", desktop: 103, mobile: 160 },
  { date: "2024-04-30", desktop: 446, mobile: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function LineChartComponent() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("desktop");

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Customer Platform</CardTitle>
          <CardDescription>Showing total visitors for the last 3 months</CardDescription>
        </div>
        <div className='flex'>
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>{chartConfig[chart].label}</span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>{total[key as keyof typeof total].toLocaleString()}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line dataKey={activeChart} type='monotone' stroke={`var(--color-${activeChart})`} strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
