import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { QuickStats } from "@/components/quick-stats";
import { ProfileSetup } from "@/components/profile-setup";
import { MealPlanning } from "@/components/meal-planning";
import { ProgressTracking } from "@/components/progress-tracking";
import { WeeklyCalendar } from "@/components/weekly-calendar";
import { BottomNavigation } from "@/components/bottom-navigation";
import { calculateDailyCalories, type UserData } from "@/lib/calculations";
import { getDayName, getMealRecommendations, type NutritionItem } from "@/lib/nutrition-data";
import { apiRequest } from "@/lib/queryClient";

// Mock user ID for demonstration - in a real app this would come from authentication
const MOCK_USER_ID = 1;

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState('home');
  const [profileExpanded, setProfileExpanded] = useState(true);
  const [currentDay, setCurrentDay] = useState(getDayName());
  
  const [userData, setUserData] = useState<UserData>({
    weight: 0,
    bodyFat: 0,
    targetWeight: 0,
    inbodyScore: 0,
    bmr: 0,
    activityLevel: 1.375,
    timeline: 90
  });

  const [calorieDistribution, setCalorieDistribution] = useState({
    dailyCalories: 0,
    breakfastCalories: 0,
    lunchCalories: 0,
    dinnerCalories: 0,
    remainingCalories: 0
  });

  const [lunchOptions, setLunchOptions] = useState<NutritionItem[]>([]);
  const [dinnerOptions, setDinnerOptions] = useState<NutritionItem[]>([]);

  // Load user profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['/api/profile', MOCK_USER_ID],
    enabled: true
  });

  // Load today's intake
  const today = new Date().toISOString().split('T')[0];
  const { data: dailyIntake, isLoading: intakeLoading } = useQuery({
    queryKey: ['/api/intake', MOCK_USER_ID, today],
    enabled: true
  });

  // Save profile mutation
  const saveProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      return apiRequest('POST', '/api/profile', {
        userId: MOCK_USER_ID,
        ...profileData
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/profile', MOCK_USER_ID] });
      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Add meal mutation
  const addMealMutation = useMutation({
    mutationFn: async (mealData: any) => {
      return apiRequest('POST', '/api/intake', mealData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/intake', MOCK_USER_ID, today] });
      toast({
        title: "Meal added",
        description: "Your meal has been added to today's intake."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add meal. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Load profile data on mount
  useEffect(() => {
    if (profile) {
      setUserData({
        weight: profile.weight,
        bodyFat: profile.bodyFat,
        targetWeight: profile.targetWeight,
        inbodyScore: profile.inbodyScore,
        bmr: profile.bmr,
        activityLevel: profile.activityLevel,
        timeline: profile.timeline
      });
    }
  }, [profile]);

  // Update current day and calculate recommendations when userData changes
  useEffect(() => {
    setCurrentDay(getDayName());
    if (userData.bmr > 0) {
      calculateAndSetRecommendations();
    }
  }, [userData]);

  const calculateAndSetRecommendations = () => {
    if (userData.bmr === 0) return;

    const distribution = calculateDailyCalories(userData);
    setCalorieDistribution(distribution);

    const lunch = getMealRecommendations(currentDay, 'lunch', distribution.lunchCalories);
    const dinner = getMealRecommendations(currentDay, 'dinner', distribution.dinnerCalories);
    
    setLunchOptions(lunch);
    setDinnerOptions(dinner);

    // Auto-save profile if valid data
    if (userData.weight > 0 && userData.targetWeight > 0) {
      saveProfileMutation.mutate(userData);
    }

    // Collapse profile after calculation
    setProfileExpanded(false);
  };

  const handleSelectMeal = (meal: NutritionItem, mealType: 'lunch' | 'dinner') => {
    addMealMutation.mutate({
      userId: MOCK_USER_ID,
      date: today,
      mealType,
      itemName: meal.name,
      calories: meal.calories,
      carbs: meal.carbs,
      protein: meal.protein,
      fat: meal.fat,
      fiber: meal.fiber
    });
  };

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const showMealPlanning = calorieDistribution.dailyCalories > 0;
  const showProgressAndCalendar = userData.weight > 0 && userData.targetWeight > 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🍽️</span>
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-900">NutriTrack</h1>
                <p className="text-xs text-gray-500">{getCurrentDay()}</p>
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
        <div className="mt-4">
          <QuickStats 
            dailyCalories={calorieDistribution.dailyCalories}
            remainingCalories={calorieDistribution.remainingCalories}
          />
        </div>

        {/* Tab Content */}
        {(activeTab === 'home' || activeTab === 'meals') && (
          <>
            {/* Profile Setup */}
            <div className="mt-4">
              <ProfileSetup
                userData={userData}
                onUserDataChange={setUserData}
                onCalculate={calculateAndSetRecommendations}
                isExpanded={profileExpanded}
                onToggleExpanded={() => setProfileExpanded(!profileExpanded)}
              />
            </div>

            {/* Meal Planning */}
            {showMealPlanning && activeTab === 'meals' && (
              <div className="mt-4">
                <MealPlanning
                  calorieDistribution={calorieDistribution}
                  lunchOptions={lunchOptions}
                  dinnerOptions={dinnerOptions}
                  currentDay={currentDay}
                  onSelectMeal={handleSelectMeal}
                />
              </div>
            )}
          </>
        )}

        {/* Progress Tracking */}
        {activeTab === 'progress' && showProgressAndCalendar && (
          <div className="mt-4">
            <ProgressTracking userData={userData} />
          </div>
        )}

        {/* Weekly Calendar */}
        {activeTab === 'calendar' && showProgressAndCalendar && (
          <div className="mt-4">
            <WeeklyCalendar 
              currentDay={currentDay}
              onDaySelect={setCurrentDay}
            />
          </div>
        )}

        {/* Show meal planning on home tab if calculations are done */}
        {activeTab === 'home' && showMealPlanning && (
          <div className="mt-4">
            <MealPlanning
              calorieDistribution={calorieDistribution}
              lunchOptions={lunchOptions}
              dinnerOptions={dinnerOptions}
              currentDay={currentDay}
              onSelectMeal={handleSelectMeal}
            />
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
