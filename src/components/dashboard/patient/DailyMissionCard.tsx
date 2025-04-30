
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface DailyMissionCardProps {
  type: string;
  title: string;
  description: string;
  duration: string;
  stars: number;
  totalStars: number;
  actionIcon: LucideIcon;
  actionText: string;
  isPrimary?: boolean;
  onStart: () => void;
}

const DailyMissionCard = ({
  type,
  title,
  description,
  duration,
  stars,
  totalStars,
  actionIcon: ActionIcon,
  actionText,
  isPrimary = false,
  onStart
}: DailyMissionCardProps) => {
  return (
    <Card className={isPrimary ? "border-2 border-therapy-purple bg-therapy-purple/5" : ""}>
      <CardHeader className="pb-2">
        <Badge className="w-fit mb-2" variant="outline">{type}</Badge>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: totalStars }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < stars ? "fill-current" : ""}`} 
              />
            ))}
          </div>
          <span className="ml-auto text-muted-foreground">{duration}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={isPrimary ? "default" : "secondary"}
          onClick={onStart}
        >
          <ActionIcon className="mr-2 h-4 w-4" /> {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyMissionCard;
