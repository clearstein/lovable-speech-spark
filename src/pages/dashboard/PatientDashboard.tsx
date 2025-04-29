
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, Calendar, Trophy, Star, Award, ArrowUpRight, Mic, BookOpen } from "lucide-react";

const PatientDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hello, Alex!</h1>
          <p className="text-muted-foreground">Ready for today's speech adventures?</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white ring-2 ring-background">
              <Star className="h-4 w-4" />
            </div>
            <div className="w-8 h-8 rounded-full bg-therapy-orange flex items-center justify-center text-white ring-2 ring-background">
              <Award className="h-4 w-4" />
            </div>
            <div className="w-8 h-8 rounded-full bg-therapy-purple flex items-center justify-center text-white ring-2 ring-background">
              <Trophy className="h-4 w-4" />
            </div>
          </div>
          <span className="text-sm font-medium">12 Badges Earned</span>
        </div>
      </div>

      {/* Daily Progress Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Daily Progress</CardTitle>
            <Badge variant="secondary">3/5 Completed</Badge>
          </div>
          <CardDescription>Complete your daily exercises to earn rewards!</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={60} className="h-2" />
          <div className="mt-2 text-sm text-right text-muted-foreground">
            60% Complete
          </div>
        </CardContent>
      </Card>

      {/* Daily Missions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Today's Missions
          </h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-2 border-therapy-purple bg-therapy-purple/5">
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2" variant="outline">Mirror Practice</Badge>
              <CardTitle className="text-lg">Oral Praxies</CardTitle>
              <CardDescription>Practice mouth movements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4" />
                </div>
                <span className="ml-auto text-muted-foreground">~5 min</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Mic className="mr-2 h-4 w-4" /> Start Exercise
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2" variant="outline">Oral Exercise</Badge>
              <CardTitle className="text-lg">Picture Naming</CardTitle>
              <CardDescription>Name what you see</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                </div>
                <span className="ml-auto text-muted-foreground">~7 min</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                <Mic className="mr-2 h-4 w-4" /> Start Exercise
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2" variant="outline">Written Exercise</Badge>
              <CardTitle className="text-lg">Syllable Assembly</CardTitle>
              <CardDescription>Build words from syllables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                </div>
                <span className="ml-auto text-muted-foreground">~6 min</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" /> Start Exercise
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Game Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" /> Game Categories
          </h2>
          <Button variant="ghost" size="sm" className="gap-1">
            Explore All <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card className="group hover:border-therapy-purple transition-all cursor-pointer">
            <CardHeader className="pb-2">
              <div className="h-12 w-12 bg-therapy-purple/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-therapy-purple/20">
                <Mic className="h-6 w-6 text-therapy-purple" />
              </div>
              <CardTitle className="text-base">Articulation</CardTitle>
              <CardDescription className="text-xs">6 games</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="group hover:border-therapy-blue transition-all cursor-pointer">
            <CardHeader className="pb-2">
              <div className="h-12 w-12 bg-therapy-blue/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-therapy-blue/20">
                <BookOpen className="h-6 w-6 text-therapy-blue" />
              </div>
              <CardTitle className="text-base">Reading Skills</CardTitle>
              <CardDescription className="text-xs">8 games</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="group hover:border-therapy-orange transition-all cursor-pointer">
            <CardHeader className="pb-2">
              <div className="h-12 w-12 bg-therapy-orange/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-therapy-orange/20">
                <Calendar className="h-6 w-6 text-therapy-orange" />
              </div>
              <CardTitle className="text-base">Memory</CardTitle>
              <CardDescription className="text-xs">5 games</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="group hover:border-primary transition-all cursor-pointer">
            <CardHeader className="pb-2">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary/20">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-base">Language</CardTitle>
              <CardDescription className="text-xs">5 games</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      
      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-therapy-orange" /> Recent Achievements
          </CardTitle>
          <CardDescription>Your latest milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-therapy-orange/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-therapy-orange" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Perfect Pronunciation</p>
                <p className="text-xs text-muted-foreground">Completed 5 articulation exercises with 100% accuracy</p>
              </div>
              <Badge variant="outline">Today</Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-therapy-purple/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-therapy-purple" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Syllable Master</p>
                <p className="text-xs text-muted-foreground">Successfully completed all levels of syllable assembly</p>
              </div>
              <Badge variant="outline">Yesterday</Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-therapy-blue/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-therapy-blue" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Consistency Champion</p>
                <p className="text-xs text-muted-foreground">Completed exercises for 7 days in a row</p>
              </div>
              <Badge variant="outline">3 days ago</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Achievements
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PatientDashboard;
