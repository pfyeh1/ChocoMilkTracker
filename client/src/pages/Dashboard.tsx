import { StatCard } from "@/components/StatCard";
import { QuickAddWidget } from "@/components/QuickAddWidget";
import { RecentActivity } from "@/components/RecentActivity";
import { ConsumptionChart } from "@/components/ConsumptionChart";
import { GlassWater, TrendingUp, Flame, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Drink, InsertDrink } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();

  const { data: drinks = [], isLoading, isError, error } = useQuery<Drink[]>({
    queryKey: ["/api/drinks"],
  });

  const addDrinkMutation = useMutation({
    mutationFn: async (newDrink: InsertDrink) => {
      return await apiRequest("POST", "/api/drinks", newDrink);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/drinks"] });
      toast({
        title: "Drink logged!",
        description: "Your chocolate milk has been added.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to log drink. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeDrinkMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/drinks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/drinks"] });
      toast({
        title: "Drink removed",
        description: "The drink has been removed from your log.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove drink. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddDrink = (sizeOz: number, timestamp: Date) => {
    addDrinkMutation.mutate({
      sizeOz,
      timestamp,
      note: null,
    });
  };

  const handleRemoveDrink = (id: string) => {
    removeDrinkMutation.mutate(id);
  };

  // Calculate statistics
  const totalDrinks = drinks.length;
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thisWeekDrinks = drinks.filter(
    (d) => new Date(d.timestamp) > oneWeekAgo
  ).length;
  
  const totalOz = drinks.reduce((sum, d) => sum + d.sizeOz, 0);
  const avgPerDay = totalDrinks > 0 ? Math.round(totalOz / Math.max(1, Math.ceil((now.getTime() - new Date(drinks[drinks.length - 1]?.timestamp || now).getTime()) / (24 * 60 * 60 * 1000)))) : 0;

  // Calculate current streak
  const calculateStreak = () => {
    if (drinks.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const drinkDates = new Set(
      drinks.map(d => {
        const date = new Date(d.timestamp);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
    );

    while (drinkDates.has(currentDate.getTime())) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  };

  const currentStreak = calculateStreak();

  // Generate chart data for last 30 days
  const generateChartData = () => {
    const days = [];
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const dayDrinks = drinks.filter(d => {
        const drinkDate = new Date(d.timestamp);
        return drinkDate >= date && drinkDate < nextDay;
      });
      
      const totalOz = dayDrinks.reduce((sum, d) => sum + d.sizeOz, 0);
      
      // For 7-day view, use day labels. For 30-day, use M/D format
      const label = i < 7 ? dayLabels[date.getDay()] : `${date.getMonth() + 1}/${date.getDate()}`;
      
      days.push({
        date: label,
        oz: totalOz,
      });
    }
    
    return days;
  };

  const chartData = generateChartData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <GlassWater className="h-12 w-12 mx-auto mb-4 animate-pulse text-primary" />
          <p className="text-muted-foreground">Loading your drinks...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <GlassWater className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold font-display mb-2">Unable to Load Drinks</h2>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error ? error.message : "Failed to fetch your drinks. Please try again later."}
          </p>
          <Button
            onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/drinks"] })}
            data-testid="button-retry"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-display">Chocolate Milk Tracker</h1>
          <p className="text-muted-foreground">
            Track your daily chocolate milk consumption and monitor your habits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Drinks"
            value={totalDrinks}
            icon={GlassWater}
            subtitle="All time"
          />
          <StatCard
            title="This Week"
            value={thisWeekDrinks}
            icon={TrendingUp}
            subtitle={`${thisWeekDrinks >= 7 ? '+' : ''}${thisWeekDrinks - 7} from last week`}
          />
          <StatCard
            title="Current Streak"
            value={`${currentStreak} day${currentStreak !== 1 ? 's' : ''}`}
            icon={Flame}
            subtitle={currentStreak > 0 ? "Keep it up!" : "Start today!"}
          />
          <StatCard
            title="Avg per Day"
            value={avgPerDay > 0 ? `${avgPerDay}oz` : "0oz"}
            icon={BarChart3}
            subtitle="Average daily"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={addDrinkMutation.isPending ? "opacity-50 pointer-events-none" : ""}>
            <QuickAddWidget onAddDrink={handleAddDrink} />
          </div>
          <div className={removeDrinkMutation.isPending ? "opacity-50 pointer-events-none" : ""}>
            <RecentActivity drinks={drinks.slice(0, 7)} onRemoveDrink={handleRemoveDrink} />
          </div>
        </div>

        <ConsumptionChart data={chartData} />
      </div>
    </div>
  );
}
