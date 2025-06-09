import { Card, CardContent } from "@/components/ui/card";

interface QuickStatsProps {
  dailyCalories: number;
  remainingCalories: number;
}

export function QuickStats({ dailyCalories, remainingCalories }: QuickStatsProps) {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-700">Today's Overview</h2>
          <span className="text-xs text-gray-500">{currentDate}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{dailyCalories}</div>
            <div className="text-xs text-gray-500">Daily Target</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{remainingCalories}</div>
            <div className="text-xs text-gray-500">Remaining</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
