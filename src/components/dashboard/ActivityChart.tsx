
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

interface ActivityData {
  date: string;
  completed: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

const ActivityChart = ({ data }: ActivityChartProps) => {
  // Chart config
  const chartConfig = {
    completed: {
      label: "Completed Exercises",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Platform Activity</CardTitle>
        <CardDescription>Exercise completion over the past 30 days</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ChartContainer 
          className="h-[300px]" 
          config={chartConfig}
        >
          <BarChart data={data}>
            <XAxis 
              dataKey="date" 
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickMargin={8}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickMargin={8}
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  labelFormatter={(value) => `Date: ${value}`}
                />
              } 
            />
            <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const generateActivityData = () => {
  const today = new Date();
  const data = [];
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: format(date, 'MMM dd'),
      completed: Math.floor(Math.random() * 50) + 10
    });
  }
  
  return data;
};

export default ActivityChart;
