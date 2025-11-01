import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassWater, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SIZE_PRESETS = [
  { label: "S", oz: 8 },
  { label: "M", oz: 12 },
  { label: "L", oz: 16 },
];

interface QuickAddWidgetProps {
  onAddDrink?: (sizeOz: number, timestamp: Date) => void;
}

export function QuickAddWidget({ onAddDrink }: QuickAddWidgetProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(12);
  const [customSize, setCustomSize] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const handleSizeSelect = (oz: number) => {
    setSelectedSize(oz);
    setIsCustom(false);
    setCustomSize("");
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    setSelectedSize(null);
  };

  const handleLogDrink = () => {
    const size = isCustom ? parseInt(customSize) : selectedSize;
    if (size && size > 0) {
      onAddDrink?.(size, new Date());
      console.log(`Logged drink: ${size}oz at ${new Date().toLocaleString()}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GlassWater className="h-5 w-5" />
          Log a Drink
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="mb-2 block">Size</Label>
          <div className="flex gap-2">
            {SIZE_PRESETS.map((preset) => (
              <Button
                key={preset.label}
                variant={selectedSize === preset.oz && !isCustom ? "default" : "outline"}
                className="flex-1"
                onClick={() => handleSizeSelect(preset.oz)}
                data-testid={`button-size-${preset.label.toLowerCase()}`}
              >
                {preset.label}
                <span className="ml-1 text-xs opacity-70">{preset.oz}oz</span>
              </Button>
            ))}
            <Button
              variant={isCustom ? "default" : "outline"}
              className="flex-1"
              onClick={handleCustomClick}
              data-testid="button-size-custom"
            >
              Custom
            </Button>
          </div>
        </div>

        {isCustom && (
          <div>
            <Label htmlFor="custom-size">Custom Size (oz)</Label>
            <Input
              id="custom-size"
              type="number"
              min="1"
              max="32"
              placeholder="8-32 oz"
              value={customSize}
              onChange={(e) => {
                setCustomSize(e.target.value);
                setSelectedSize(parseInt(e.target.value) || null);
              }}
              data-testid="input-custom-size"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Badge variant="secondary" data-testid="badge-timestamp">
            Now
          </Badge>
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleString()}
          </span>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleLogDrink}
          disabled={!selectedSize || selectedSize <= 0}
          data-testid="button-log-drink"
        >
          <Plus className="h-4 w-4 mr-2" />
          Log Drink
        </Button>
      </CardContent>
    </Card>
  );
}
