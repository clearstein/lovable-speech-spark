
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Calendar } from "lucide-react";

interface Achievement {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  timeframe: string;
}

const RecentAchievements = () => {
  const achievements: Achievement[] = [
    {
      icon: <Award className="h-5 w-5 text-therapy-orange" />,
      iconBg: "therapy-orange/10",
      title: "Perfect Pronunciation",
      description: "Completed 5 articulation exercises with 100% accuracy",
      timeframe: "Today"
    },
    {
      icon: <Star className="h-5 w-5 text-therapy-purple" />,
      iconBg: "therapy-purple/10",
      title: "Syllable Master",
      description: "Successfully completed all levels of syllable assembly",
      timeframe: "Yesterday"
    },
    {
      icon: <Calendar className="h-5 w-5 text-therapy-blue" />,
      iconBg: "therapy-blue/10",
      title: "Consistency Champion",
      description: "Completed exercises for 7 days in a row",
      timeframe: "3 days ago"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-therapy-orange" /> Recent Achievements
        </CardTitle>
        <CardDescription>Your latest milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full bg-${achievement.iconBg} flex items-center justify-center`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
              <Badge variant="outline">{achievement.timeframe}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Achievements
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentAchievements;
