import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuickStatsProps {
  dailyCalories: number;
  remainingCalories: number;
  breakfastCalories?: number;
  lunchBudget?: number;
  dinnerBudget?: number;
}

export function QuickStats({ 
  dailyCalories, 
  remainingCalories,
  breakfastCalories = 0,
  lunchBudget = 0,
  dinnerBudget = 0
}: QuickStatsProps) {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  const consumed = dailyCalories - remainingCalories;
  const progressPercentage = (consumed / dailyCalories) * 100;

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-700">Today's Calories</h2>
          <span className="text-xs text-gray-500">{currentDate}</span>
        </div>
        
        {/* Main Stats */}
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="text-3xl font-bold text-gray-900">{remainingCalories}</div>
            <div className="text-sm text-gray-500">kcal remaining</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-700">{consumed} / {dailyCalories}</div>
            <div className="text-xs text-gray-500">consumed / daily budget</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <Progress value={progressPercentage} className="h-2 mb-4" />
        
        {/* Meal Breakdown */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Breakfast</div>
            <div className="text-sm font-semibold">{breakfastCalories || '-'}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Lunch</div>
            <div className="text-sm font-semibold">{lunchBudget || '-'}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Dinner</div>
            <div className="text-sm font-semibold">{dinnerBudget || '-'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}