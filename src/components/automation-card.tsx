import React from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Clock } from "lucide-react";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

const AutomationCard = ({
  title = "Email",
  description = "Reaching out",
  active = false,
  schedule = "Day 1",
}: {
  title: string;
  description: string;
  active?: boolean;
  schedule: string;
}) => {
  return (
    <Card className=''>
      <CardHeader className='relative'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-2xl font-semibold tabular-nums'>{title}</CardTitle>
          <div className='flex items-center gap-4'>
            <div className='flex gap-2 items-center'>
              <Clock className='size-4 text-secondary-foreground/50' />
              <p className='text-secondary-foreground/50 text-sm'>{schedule}</p>
            </div>
            <Switch defaultChecked={active} />
          </div>
        </div>
        <CardDescription>
          Subject: <span className='font-semibold'>{description}</span>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardFooter className='flex-col items-start gap-1 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'></div>
        <div className='text-muted-foreground'>
          Hi [First Name]. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, deleniti?
        </div>
      </CardFooter>
    </Card>
  );
};

export default AutomationCard;
