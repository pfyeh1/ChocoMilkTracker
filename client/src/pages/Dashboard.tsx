import { useState } from "react";
import { StatCard } from "@/components/StatCard";
import { QuickAddWidget } from "@/components/QuickAddWidget";
import { RecentActivity } from "@/components/RecentActivity";
import { ConsumptionChart } from "@/components/ConsumptionChart";
import { GlassWater, TrendingUp, Flame, BarChart3 } from "lucide-react";

//todo: remove mock functionality
const generateMockDrinks = () => {
  const drinks = [];
  const now = new Date();
  
  for (let i = 0; i < 10; i++) {
    drinks.push({
      id: `drink-${i}`,
      sizeOz: [8, 12, 16][Math.floor(Math.random() * 3)],
      timestamp: new Date(now.getTime() - i * 3 * 60 * 60 * 1000),
    });
  }
  
  return drinks;
};

const generateMockChartData = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days.map((day) => ({
    date: day,
    oz: Math.floor(Math.random() * 40) + 8,
  })).reverse();
};

export default function Dashboard() {
  const [drinks, setDrinks] = useState(generateMockDrinks());
  const [chartData] = useState(generateMockChartData());

  const totalDrinks = drinks.length;
  const thisWeekDrinks = drinks.filter(
    (d) => new Date(d.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  const totalOz = drinks.reduce((sum, d) => sum + d.sizeOz, 0);
  const avgPerDay = Math.round(totalOz / 7);

  const handleAddDrink = (sizeOz: number, timestamp: Date) => {
    const newDrink = {
      id: `drink-${Date.now()}`,
      sizeOz,
      timestamp,
    };
    setDrinks([newDrink, ...drinks]);
  };

  const handleRemoveDrink = (id: string) => {
    setDrinks(drinks.filter((d) => d.id !== id));
  };

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
            subtitle={`${thisWeekDrinks > 7 ? '+' : ''}${thisWeekDrinks - 7} from last week`}
          />
          <StatCard
            title="Current Streak"
            value="5 days"
            icon={Flame}
            subtitle="Keep it up!"
          />
          <StatCard
            title="Avg per Day"
            value={`${avgPerDay}oz`}
            icon={BarChart3}
            subtitle="Last 7 days"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickAddWidget onAddDrink={handleAddDrink} />
          <RecentActivity drinks={drinks.slice(0, 7)} onRemoveDrink={handleRemoveDrink} />
        </div>

        <ConsumptionChart data={chartData} />
      </div>
    </div>
  );
}
