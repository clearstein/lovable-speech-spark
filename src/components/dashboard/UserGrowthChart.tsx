
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

interface UserGrowthData {
  month: string;
  therapists: number;
  patients: number;
}

interface UserGrowthChartProps {
  data: UserGrowthData[];
}

const UserGrowthChart = ({ data }: UserGrowthChartProps) => {
  // Chart config
  const chartConfig = {
    therapists: {
      label: "Therapists",
      color: "hsl(var(--primary))",
    },
    patients: {
      label: "Patients",
      color: "hsl(var(--therapy-purple))",
    },
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>New users by month</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ChartContainer 
          className="h-[300px]" 
          config={chartConfig}
        >
          <BarChart data={data}>
            <XAxis 
              dataKey="month" 
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
                  labelFormatter={(value) => `Month: ${value}`}
                />
              } 
            />
            <Bar dataKey="therapists" fill="var(--color-therapists)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="patients" fill="var(--color-patients)" radius={[4, 4, 0, 0]} />
            <ChartLegend
              content={<ChartLegendContent />}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const generateUserGrowthData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [];
  
  for (let i = 0; i < 12; i++) {
    data.push({
      month: months[i],
      therapists: Math.floor(Math.random() * 5) + 1,
      patients: Math.floor(Math.random() * 15) + 5
    });
  }
  
  return data;
};

export default UserGrowthChart;
