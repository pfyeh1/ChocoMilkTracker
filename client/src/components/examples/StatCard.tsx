import { StatCard } from "../StatCard";
import { GlassWater } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <StatCard
        title="Total Drinks"
        value="42"
        icon={GlassWater}
        subtitle="+5 from last week"
      />
    </div>
  );
}
