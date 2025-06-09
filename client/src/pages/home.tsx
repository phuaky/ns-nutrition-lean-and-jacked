import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { QuickStats } from "@/components/quick-stats";
import { ProfileSetup } from "@/components/profile-setup";
import { MealPlanning } from "@/components/meal-planning";
import { ProgressTracking } from "@/components/progress-tracking";
import { BottomNavigation } from "@/components/bottom-navigation";
import { 
  calculateCalories, 
  calculateMealBudgets,
  type InBodyData,
  type CalorieCalculation,
  type MealBudgets 
} from "@/lib/calculations";
import { weeklyMeals, cafeItems } from "@/lib/nutrition-data";

export default function Home() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [profileExpanded, setProfileExpanded] = useState(true);
  
  // Get current day of week
  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };
  
  const [currentDay, setCurrentDay] = useState(getCurrentDay());
  
  // InBody data state
  const [inBodyData, setInBodyData] = useState<InBodyData>({
    currentWeight: 0,
    currentBodyFatPercentage: 0,
    targetWeight: 0,
    targetBodyFatPercentage: 0,
    height: 0,
    age: 0,
    gender: 'male',
    activityLevel: 'moderatelyActive',
    daysToGoal: 90
  });
  
  // Calculation results
  const [calorieCalc, setCalorieCalc] = useState<CalorieCalculation | null>(null);
  const [mealBudgets, setMealBudgets] = useState<MealBudgets | null>(null);
  const [selectedBreakfast, setSelectedBreakfast] = useState<number>(0);
  
  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('inBodyData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setInBodyData(parsed);
      calculateAndSetRecommendations(parsed);
    }
  }, []);
  
  // Save data to localStorage
  const saveData = (data: InBodyData) => {
    // Create a clean copy to ensure no circular references
    const cleanData: InBodyData = {
      currentWeight: data.currentWeight,
      currentBodyFatPercentage: data.currentBodyFatPercentage,
      targetWeight: data.targetWeight,
      targetBodyFatPercentage: data.targetBodyFatPercentage,
      height: data.height,
      age: data.age,
      gender: data.gender,
      activityLevel: data.activityLevel,
      daysToGoal: data.daysToGoal,
      skeletalMuscleMass: data.skeletalMuscleMass,
      inBodyScore: data.inBodyScore
    };
    
    localStorage.setItem('inBodyData', JSON.stringify(cleanData));
    localStorage.setItem('startDate', new Date().toISOString());
  };
  
  const calculateAndSetRecommendations = (data: InBodyData = inBodyData) => {
    if (data.currentWeight === 0 || data.targetWeight === 0 || data.height === 0) return;
    
    try {
      const calc = calculateCalories(data);
      setCalorieCalc(calc);
      
      const budgets = calculateMealBudgets(calc.dailyBudget, selectedBreakfast);
      setMealBudgets(budgets);
      
      // Save to localStorage
      saveData(data);
      
      // Collapse profile after calculation
      setProfileExpanded(false);
      
      toast({
        title: "Calculations updated",
        description: `Daily budget: ${calc.dailyBudget} kcal`
      });
    } catch (error) {
      console.error('Error calculating recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to calculate recommendations. Please check your inputs.",
        variant: "destructive"
      });
    }
  };
  
  const handleSelectBreakfast = (calories: number) => {
    setSelectedBreakfast(calories);
    if (calorieCalc) {
      const budgets = calculateMealBudgets(calorieCalc.dailyBudget, calories);
      setMealBudgets(budgets);
    }
  };
  
  const getCurrentDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };
  
  const showMealPlanning = calorieCalc !== null && mealBudgets !== null;
  const showProgress = calorieCalc !== null;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">NS</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">NS Nutrition</h1>
                <p className="text-xs text-gray-500">{getCurrentDayName()}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </nav>
      
      <div className="max-w-md mx-auto px-4">
        {/* Quick Stats - Always visible */}
        {calorieCalc && mealBudgets && (
          <div className="mt-4">
            <QuickStats 
              dailyCalories={calorieCalc.dailyBudget}
              remainingCalories={mealBudgets.remaining}
              breakfastCalories={selectedBreakfast}
              lunchBudget={mealBudgets.lunch}
              dinnerBudget={mealBudgets.dinner}
            />
          </div>
        )}
        
        {/* Tab Content */}
        {activeTab === 'home' && (
          <>
            {/* Profile Setup */}
            <div className="mt-4">
              <ProfileSetup
                inBodyData={inBodyData}
                onInBodyDataChange={setInBodyData}
                onCalculate={calculateAndSetRecommendations}
                isExpanded={profileExpanded}
                onToggleExpanded={() => setProfileExpanded(!profileExpanded)}
                calorieCalc={calorieCalc}
              />
            </div>
            
            {/* Meal Planning */}
            {showMealPlanning && (
              <div className="mt-4">
                <MealPlanning
                  mealBudgets={mealBudgets}
                  currentDay={currentDay}
                  weeklyMeals={weeklyMeals}
                  cafeItems={cafeItems}
                  onSelectBreakfast={handleSelectBreakfast}
                  selectedBreakfast={selectedBreakfast}
                />
              </div>
            )}
          </>
        )}
        
        {/* Meals Tab */}
        {activeTab === 'meals' && showMealPlanning && (
          <div className="mt-4">
            <MealPlanning
              mealBudgets={mealBudgets}
              currentDay={currentDay}
              weeklyMeals={weeklyMeals}
              cafeItems={cafeItems}
              onSelectBreakfast={handleSelectBreakfast}
              selectedBreakfast={selectedBreakfast}
            />
          </div>
        )}
        
        {/* Progress Tracking */}
        {activeTab === 'progress' && showProgress && calorieCalc && (
          <div className="mt-4">
            <ProgressTracking 
              inBodyData={inBodyData}
              calorieCalc={calorieCalc}
            />
          </div>
        )}
        
        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="mt-4 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Weekly View</h2>
              <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs text-gray-500 font-medium p-2">
                    {day}
                  </div>
                ))}
                {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => (
                  <button
                    key={day}
                    onClick={() => setCurrentDay(day)}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      currentDay === day
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {day.slice(0, 3).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            {showMealPlanning && (
              <MealPlanning
                mealBudgets={mealBudgets}
                currentDay={currentDay}
                weeklyMeals={weeklyMeals}
                cafeItems={cafeItems}
                onSelectBreakfast={handleSelectBreakfast}
                selectedBreakfast={selectedBreakfast}
              />
            )}
          </div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}