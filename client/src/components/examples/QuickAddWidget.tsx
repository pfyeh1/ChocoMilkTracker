import { QuickAddWidget } from "../QuickAddWidget";

export default function QuickAddWidgetExample() {
  return (
    <div className="p-4 max-w-lg">
      <QuickAddWidget 
        onAddDrink={(size, timestamp) => {
          console.log(`Added drink: ${size}oz at ${timestamp}`);
        }}
      />
    </div>
  );
}
