import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

interface ChartData {
  date: string;
  oz: number;
}

interface ConsumptionChartProps {
  data: ChartData[];
}

export function ConsumptionChart({ data }: ConsumptionChartProps) {
  const [view, setView] = useState<"7day" | "30day">("7day");

  const displayData = data.slice(0, view === "7day" ? 7 : 30);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
        <CardTitle>Consumption Chart</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={view === "7day" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("7day")}
            data-testid="button-view-7day"
          >
            7 Days
          </Button>
          <Button
            variant={view === "30day" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("30day")}
            data-testid="button-view-30day"
          >
            30 Days
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                label={{ value: 'oz', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Bar 
                dataKey="oz" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
