import { RecentActivity } from "../RecentActivity";

const mockDrinks = [
  { id: "1", sizeOz: 12, timestamp: new Date() },
  { id: "2", sizeOz: 8, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: "3", sizeOz: 16, timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: "4", sizeOz: 12, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
];

export default function RecentActivityExample() {
  return (
    <div className="p-4 max-w-lg">
      <RecentActivity 
        drinks={mockDrinks}
        onRemoveDrink={(id) => console.log(`Remove drink: ${id}`)}
      />
    </div>
  );
}
