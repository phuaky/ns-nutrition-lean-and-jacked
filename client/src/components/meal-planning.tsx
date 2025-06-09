import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Utensils, Moon, ChevronRight } from "lucide-react";
import type { NutritionItem, DailyMeals } from "@/lib/nutrition-data";
import type { MealBudgets } from "@/lib/calculations";

interface MealPlanningProps {
  mealBudgets: MealBudgets;
  currentDay: string;
  weeklyMeals: Record<string, DailyMeals>;
  cafeItems: NutritionItem[];
  onSelectBreakfast: (calories: number) => void;
  selectedBreakfast: number;
}

export function MealPlanning({ 
  mealBudgets,
  currentDay,
  weeklyMeals,
  cafeItems,
  onSelectBreakfast,
  selectedBreakfast
}: MealPlanningProps) {
  const [selectedMeals, setSelectedMeals] = useState<{
    breakfast?: NutritionItem;
    lunch?: { base: NutritionItem; protein: NutritionItem; veggies: NutritionItem };
    dinner?: { base: NutritionItem; protein: NutritionItem; veggies: NutritionItem };
  }>({});
  
  const todayMeals = weeklyMeals[currentDay] || weeklyMeals.monday;
  
  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };
  
  // Build lunch combinations
  const buildMealCombinations = (meal: typeof todayMeals.lunch | typeof todayMeals.dinner) => {
    const combinations: Array<{
      name: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
      components: NutritionItem[];
    }> = [];
    
    // For each base
    meal.base.forEach(base => {
      // For each protein
      [...meal.nonVeganProtein, ...(meal.veganProtein || []), ...(meal.vegetarianProtein || [])].forEach(protein => {
        // For each veggie
        meal.veggies.forEach(veggie => {
          const totalCalories = base.calories + protein.calories + veggie.calories;
          const totalProtein = base.protein + protein.protein + veggie.protein;
          const totalCarbs = base.carbs + protein.carbs + veggie.carbs;
          const totalFat = base.fat + protein.fat + veggie.fat;
          const totalFiber = base.fiber + protein.fiber + veggie.fiber;
          
          combinations.push({
            name: `${base.name} + ${protein.name} + ${veggie.name}`,
            calories: totalCalories,
            protein: totalProtein,
            carbs: totalCarbs,
            fat: totalFat,
            fiber: totalFiber,
            components: [base, protein, veggie]
          });
        });
      });
    });
    
    return combinations;
  };
  
  const lunchCombinations = buildMealCombinations(todayMeals.lunch);
  const dinnerCombinations = buildMealCombinations(todayMeals.dinner);
  
  // Filter meals within budget
  const filterMealsByBudget = (meals: typeof lunchCombinations, budget: number, tolerance: number = 100) => {
    // First try to find meals within tolerance
    const withinBudget = meals.filter(meal => Math.abs(meal.calories - budget) <= tolerance);
    
    // If no meals within budget, return the 3 closest meals
    if (withinBudget.length === 0) {
      return meals
        .sort((a, b) => Math.abs(a.calories - budget) - Math.abs(b.calories - budget))
        .slice(0, 3)
        .map(meal => ({ ...meal, overBudget: true }));
    }
    
    return withinBudget
      .sort((a, b) => Math.abs(a.calories - budget) - Math.abs(b.calories - budget))
      .slice(0, 3)
      .map(meal => ({ ...meal, overBudget: false }));
  };
  
  const filteredLunch = filterMealsByBudget(lunchCombinations, mealBudgets.lunch);
  const filteredDinner = filterMealsByBudget(dinnerCombinations, mealBudgets.dinner);
  const filteredBreakfast = cafeItems
    .filter(item => item.calories <= mealBudgets.breakfast + 100)
    .sort((a, b) => b.protein - a.protein)
    .slice(0, 6);

  return (
    <div className="space-y-4">
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Meal Planning</h2>
            <Badge variant="outline">{formatDay(currentDay)}</Badge>
          </div>
          
          {/* Budget Overview */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-yellow-50 rounded-lg">
              <Coffee className="w-4 h-4 mx-auto mb-1 text-yellow-600" />
              <div className="text-sm font-semibold">{mealBudgets.breakfast}</div>
              <div className="text-xs text-gray-500">Breakfast</div>
            </div>
            <div className={`text-center p-2 rounded-lg ${
              mealBudgets.lunch < 400 ? 'bg-amber-50' : 'bg-blue-50'
            }`}>
              <Utensils className={`w-4 h-4 mx-auto mb-1 ${
                mealBudgets.lunch < 400 ? 'text-amber-600' : 'text-blue-600'
              }`} />
              <div className="text-sm font-semibold">{mealBudgets.lunch}</div>
              <div className="text-xs text-gray-500">Lunch</div>
              {mealBudgets.lunch < 400 && (
                <div className="text-xs text-amber-600 mt-1">Low</div>
              )}
            </div>
            <div className={`text-center p-2 rounded-lg ${
              mealBudgets.dinner < 400 ? 'bg-amber-50' : 'bg-purple-50'
            }`}>
              <Moon className={`w-4 h-4 mx-auto mb-1 ${
                mealBudgets.dinner < 400 ? 'text-amber-600' : 'text-purple-600'
              }`} />
              <div className="text-sm font-semibold">{mealBudgets.dinner}</div>
              <div className="text-xs text-gray-500">Dinner</div>
              {mealBudgets.dinner < 400 && (
                <div className="text-xs text-amber-600 mt-1">Low</div>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="breakfast" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
            </TabsList>
            
            {/* Breakfast Options */}
            <TabsContent value="breakfast" className="mt-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {filteredBreakfast.map((item, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        selectedBreakfast === item.calories 
                          ? 'border-yellow-500 bg-yellow-50' 
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                      onClick={() => onSelectBreakfast(item.calories)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <span className="text-sm font-bold text-yellow-600">{Math.round(item.calories)} kcal</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 mt-2 text-xs text-gray-500">
                        <div>C: {Math.round(item.carbs)}g</div>
                        <div>P: {Math.round(item.protein)}g</div>
                        <div>F: {Math.round(item.fat)}g</div>
                        <div>Fi: {Math.round(item.fiber)}g</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            {/* Lunch Options */}
            <TabsContent value="lunch" className="mt-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {filteredLunch.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No meals within budget</p>
                      <p className="text-xs mt-1">Try selecting a smaller breakfast</p>
                    </div>
                  ) : (
                    <>
                      {filteredLunch.some((combo: any) => combo.overBudget) && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
                          <p className="text-xs text-amber-800">
                            <strong>Note:</strong> Your lunch budget ({mealBudgets.lunch} kcal) is lower than available meals. 
                            Showing closest options.
                          </p>
                        </div>
                      )}
                      {filteredLunch.map((combo: any, index) => (
                        <div key={index} className={`p-3 rounded-lg border transition-colors ${
                          combo.overBudget 
                            ? 'border-amber-300 bg-amber-50 hover:border-amber-400' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 mb-1">
                                {combo.components.map((c: any) => c.name).join(' + ')}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${
                                combo.overBudget ? 'text-amber-600' : 'text-blue-600'
                              }`}>
                                {Math.round(combo.calories)} kcal
                              </span>
                              {combo.overBudget && (
                                <span className="text-xs text-amber-600">
                                  (+{Math.round(combo.calories - mealBudgets.lunch)})
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-1 text-xs text-gray-500">
                            <div>C: {Math.round(combo.carbs)}g</div>
                            <div>P: {Math.round(combo.protein)}g</div>
                            <div>F: {Math.round(combo.fat)}g</div>
                            <div>Fi: {Math.round(combo.fiber)}g</div>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full mt-2 text-xs"
                            variant={combo.overBudget ? "secondary" : "outline"}
                          >
                            Select <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            {/* Dinner Options */}
            <TabsContent value="dinner" className="mt-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {filteredDinner.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No meals within budget</p>
                      <p className="text-xs mt-1">Try adjusting your selections</p>
                    </div>
                  ) : (
                    <>
                      {filteredDinner.some((combo: any) => combo.overBudget) && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
                          <p className="text-xs text-amber-800">
                            <strong>Note:</strong> Your dinner budget ({mealBudgets.dinner} kcal) is lower than available meals. 
                            Showing closest options.
                          </p>
                        </div>
                      )}
                      {filteredDinner.map((combo: any, index) => (
                        <div key={index} className={`p-3 rounded-lg border transition-colors ${
                          combo.overBudget 
                            ? 'border-amber-300 bg-amber-50 hover:border-amber-400' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 mb-1">
                                {combo.components.map((c: any) => c.name).join(' + ')}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${
                                combo.overBudget ? 'text-amber-600' : 'text-purple-600'
                              }`}>
                                {Math.round(combo.calories)} kcal
                              </span>
                              {combo.overBudget && (
                                <span className="text-xs text-amber-600">
                                  (+{Math.round(combo.calories - mealBudgets.dinner)})
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-1 text-xs text-gray-500">
                            <div>C: {Math.round(combo.carbs)}g</div>
                            <div>P: {Math.round(combo.protein)}g</div>
                            <div>F: {Math.round(combo.fat)}g</div>
                            <div>Fi: {Math.round(combo.fiber)}g</div>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full mt-2 text-xs"
                            variant={combo.overBudget ? "secondary" : "outline"}
                          >
                            Select <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}