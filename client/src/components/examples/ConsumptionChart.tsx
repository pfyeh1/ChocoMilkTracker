import { ConsumptionChart } from "../ConsumptionChart";

const mockData = [
  { date: "Mon", oz: 24 },
  { date: "Tue", oz: 16 },
  { date: "Wed", oz: 32 },
  { date: "Thu", oz: 20 },
  { date: "Fri", oz: 28 },
  { date: "Sat", oz: 12 },
  { date: "Sun", oz: 24 },
];

export default function ConsumptionChartExample() {
  return (
    <div className="p-4">
      <ConsumptionChart data={mockData} />
    </div>
  );
}
