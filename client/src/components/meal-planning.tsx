import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { NutritionItem } from "@/lib/nutrition-data";
import type { CalorieDistribution } from "@/lib/calculations";

interface MealPlanningProps {
  calorieDistribution: CalorieDistribution;
  lunchOptions: NutritionItem[];
  dinnerOptions: NutritionItem[];
  currentDay: string;
  onSelectMeal: (meal: NutritionItem, mealType: 'lunch' | 'dinner') => void;
}

export function MealPlanning({ 
  calorieDistribution, 
  lunchOptions, 
  dinnerOptions, 
  currentDay,
  onSelectMeal 
}: MealPlanningProps) {
  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const renderMealOptions = (options: NutritionItem[], mealType: 'lunch' | 'dinner') => {
    if (options.length === 0) {
      return (
        <div className="text-center py-6 text-gray-500">
          <p className="text-sm">No meals found within your calorie budget.</p>
          <p className="text-xs mt-1">Try adjusting your daily calorie target.</p>
        </div>
      );
    }

    return options.map((meal, index) => (
      <div key={index} className="border border-gray-200 rounded-lg p-3">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-medium text-gray-900">{meal.name}</h4>
          <span className={`text-sm font-bold ${mealType === 'lunch' ? 'text-primary' : 'text-secondary'}`}>
            {Math.round(meal.calories)} kcal
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 mb-2">
          <div>Carbs: {Math.round(meal.carbs)}g</div>
          <div>Protein: {Math.round(meal.protein)}g</div>
          <div>Fat: {Math.round(meal.fat)}g</div>
          <div>Fiber: {Math.round(meal.fiber)}g</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400 flex-1">
            {meal.components ? meal.components.join(' + ') : 'Complete meal combo'}
          </div>
          <Button 
            size="sm"
            onClick={() => onSelectMeal(meal, mealType)}
            className="text-xs bg-secondary text-white px-3 py-1 rounded-full hover:bg-green-600 ml-2"
          >
            Select
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Today's Meal Plan</h2>
          <div className="text-xs text-gray-500">{formatDay(currentDay)}</div>
        </div>

        {/* Calorie Distribution */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Daily Calorie Distribution</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-gray-400">{calorieDistribution.breakfastCalories}</div>
              <div className="text-xs text-gray-500">Breakfast</div>
              <div className="text-xs text-gray-400">(Cafe Menu)</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">{calorieDistribution.lunchCalories}</div>
              <div className="text-xs text-gray-500">Lunch</div>
            </div>
            <div>
              <div className="text-lg font-bold text-secondary">{calorieDistribution.dinnerCalories}</div>
              <div className="text-xs text-gray-500">Dinner</div>
            </div>
          </div>
        </div>

        {/* Lunch Recommendations */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium text-gray-900">Lunch Options</h3>
            <Badge variant="default" className="bg-primary text-white">
              {calorieDistribution.lunchCalories} kcal
            </Badge>
          </div>
          <div className="space-y-3">
            {renderMealOptions(lunchOptions, 'lunch')}
          </div>
        </div>

        {/* Dinner Recommendations */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium text-gray-900">Dinner Options</h3>
            <Badge variant="default" className="bg-secondary text-white">
              {calorieDistribution.dinnerCalories} kcal
            </Badge>
          </div>
          <div className="space-y-3">
            {renderMealOptions(dinnerOptions, 'dinner')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
