
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, PlusCircle, Activity, BookOpen, Brain, Mic, Headphones } from "lucide-react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { getExercises, getExerciseCategories } from "@/services/exercise-service";

const ExercisesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['exerciseCategories'],
    queryFn: getExerciseCategories
  });

  const { data: exercises, isLoading: exercisesLoading } = useQuery({
    queryKey: ['exercises'],
    queryFn: getExercises
  });

  const filteredExercises = exercises?.filter(exercise => 
    (activeCategory === "all" || exercise.category_id === activeCategory) &&
    exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLoading = categoriesLoading || exercisesLoading;

  const getCategoryIcon = (name: string) => {
    switch(name.toLowerCase()) {
      case 'langage oral': return <Mic className="h-4 w-4" />;
      case 'compréhension orale': return <Headphones className="h-4 w-4" />;
      case 'mémoire': return <Brain className="h-4 w-4" />;
      case 'langage écrit': return <BookOpen className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Speech Therapy Exercises</h1>
          <p className="text-muted-foreground">Manage and assign speech therapy exercises</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Exercise
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Exercise Library</CardTitle>
          <CardDescription>
            Browse and search all available speech therapy exercises
          </CardDescription>
          <div className="mt-2 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search exercises..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveCategory}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories?.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  <span className="flex items-center gap-2">
                    {getCategoryIcon(category.name)}
                    {category.name}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredExercises && filteredExercises.length > 0 ? (
                  filteredExercises.map((exercise) => {
                    const category = categories?.find(c => c.id === exercise.category_id);
                    
                    return (
                      <Card key={exercise.id} className="cursor-pointer hover:border-primary transition-all">
                        <CardHeader className="pb-2">
                          <Badge className="w-max mb-1">{category?.name || 'Uncategorized'}</Badge>
                          <CardTitle className="text-xl">{exercise.title}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {exercise.description || "No description provided"}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm">
                            <Badge variant="outline">
                              {exercise.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              {exercise.type}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-10">
                    <p className="text-muted-foreground">No exercises found</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add your first exercise
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExercisesPage;
