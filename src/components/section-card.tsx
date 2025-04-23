"use client";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import NumberFlow from "@number-flow/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function SectionCards() {
  const [value, setValue] = useState({
    revenue: 0,
    revenuePercentage: 0,
    newCustomers: 0,
    newCustomersPercentage: 0,
    activeAcounts: 0,
    activeAcountsPercentage: 0,
  });

  useEffect(() => {
    setValue({
      revenue: 1250,
      revenuePercentage: 12.5,
      newCustomers: 1234,
      newCustomersPercentage: -25,
      activeAcounts: 45678,
      activeAcountsPercentage: 12.5,
    });
  }, []);
  return (
    <div className='*:data-[slot=card]:shadow-xs lg:grid-cols-3 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card'>
      <Card className='@container/card'>
        <CardHeader className='relative'>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
            <NumberFlow
              value={value.revenue}
              spinTiming={{ duration: 2000 }}
              willChange
              locales='en-US'
              format={{ style: "currency", currency: "USD" }}
            />
          </CardTitle>
          <div className='absolute right-4 top-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingUpIcon className='size-3' />
              <NumberFlow value={value.revenuePercentage} suffix='%' spinTiming={{ duration: 1000 }} willChange />
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Trending up this month <TrendingUpIcon className='size-4' />
          </div>
          <div className='text-muted-foreground'>Visitors for the last 6 months</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader className='relative'>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
            <NumberFlow value={value.newCustomers} spinTiming={{ duration: 2000 }} willChange format={{ style: "decimal" }} />
          </CardTitle>
          <div className='absolute right-4 top-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingDownIcon className='size-3' />
              <NumberFlow value={value.newCustomersPercentage} suffix='%' spinTiming={{ duration: 1000 }} willChange />
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Down 20% this period <TrendingDownIcon className='size-4' />
          </div>
          <div className='text-muted-foreground'>Acquisition needs attention</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader className='relative'>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
            <NumberFlow value={value.activeAcounts} spinTiming={{ duration: 2000 }} willChange format={{ style: "decimal" }} />
          </CardTitle>
          <div className='absolute right-4 top-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingUpIcon className='size-3' />
              <NumberFlow value={value.activeAcountsPercentage} suffix='%' spinTiming={{ duration: 1000 }} willChange />
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Strong user retention <TrendingUpIcon className='size-4' />
          </div>
          <div className='text-muted-foreground'>Engagement exceed targets</div>
        </CardFooter>
      </Card>
    </div>
  );
}
