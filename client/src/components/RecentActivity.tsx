import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassWater, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Drink {
  id: string;
  sizeOz: number;
  timestamp: Date;
}

interface RecentActivityProps {
  drinks: Drink[];
  onRemoveDrink?: (id: string) => void;
}

export function RecentActivity({ drinks, onRemoveDrink }: RecentActivityProps) {
  const groupedByDay = drinks.reduce((acc, drink) => {
    const date = new Date(drink.timestamp).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(drink);
    return acc;
  }, {} as Record<string, Drink[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {Object.entries(groupedByDay).map(([date, dayDrinks]) => (
              <div key={date}>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {date}
                </p>
                <div className="space-y-2">
                  {dayDrinks.map((drink) => (
                    <div
                      key={drink.id}
                      className="flex items-center justify-between gap-4 p-3 rounded-md border hover-elevate"
                      data-testid={`drink-item-${drink.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <GlassWater className="h-4 w-4 text-primary" />
                        <div>
                          <Badge variant="secondary" data-testid={`badge-size-${drink.id}`}>
                            {drink.sizeOz}oz
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground" data-testid={`text-time-${drink.id}`}>
                          {new Date(drink.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            onRemoveDrink?.(drink.id);
                            console.log(`Removed drink: ${drink.id}`);
                          }}
                          data-testid={`button-remove-${drink.id}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {drinks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <GlassWater className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No drinks logged yet</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
