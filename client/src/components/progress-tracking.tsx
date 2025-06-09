import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, Target, Calendar, Activity } from "lucide-react";
import { 
  type InBodyData, 
  type CalorieCalculation,
  calculateWeightProgress,
  getBodyFatCategory,
  getDaysElapsed,
  formatNumber,
  getInBodyScoreCategory
} from "@/lib/calculations";

interface ProgressTrackingProps {
  inBodyData: InBodyData;
  calorieCalc: CalorieCalculation;
}

export function ProgressTracking({ inBodyData, calorieCalc }: ProgressTrackingProps) {
  const startDate = localStorage.getItem('startDate');
  const daysElapsed = startDate ? getDaysElapsed(new Date(startDate)) : 0;
  const timelineProgress = (daysElapsed / inBodyData.daysToGoal) * 100;
  
  // Calculate weight progress (assuming start weight = current weight for now)
  const weightProgress = calculateWeightProgress(
    inBodyData.currentWeight,
    inBodyData.targetWeight,
    inBodyData.currentWeight // In real app, would track start weight separately
  );
  
  const currentBFCategory = getBodyFatCategory(inBodyData.currentBodyFatPercentage, inBodyData.gender);
  const targetBFCategory = getBodyFatCategory(inBodyData.targetBodyFatPercentage, inBodyData.gender);
  const inBodyCategory = inBodyData.inBodyScore ? getInBodyScoreCategory(inBodyData.inBodyScore) : null;

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border border-gray-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-500">Fat Loss</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{calorieCalc.totalFatLossKg} kg</div>
            <div className="text-xs text-gray-500">to lose</div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-500">Daily Deficit</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{formatNumber(calorieCalc.dailyDeficit)}</div>
            <div className="text-xs text-gray-500">kcal/day</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Trackers */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Progress Overview</h2>
          
          <div className="space-y-4">
            {/* Weight Progress */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Weight Goal</span>
                <span className="text-sm text-gray-500">{Math.round(weightProgress)}%</span>
              </div>
              <Progress value={weightProgress} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Current: {inBodyData.currentWeight} kg</span>
                <span>Target: {inBodyData.targetWeight} kg</span>
              </div>
            </div>
            
            {/* Body Fat Progress */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Body Fat %</span>
                <span className="text-sm text-gray-500">{inBodyData.currentBodyFatPercentage}% → {inBodyData.targetBodyFatPercentage}%</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{currentBFCategory}</span>
                <span>→</span>
                <span>{targetBFCategory}</span>
              </div>
            </div>
            
            {/* Timeline Progress */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Timeline</span>
                <span className="text-sm text-gray-500">Day {daysElapsed} of {inBodyData.daysToGoal}</span>
              </div>
              <Progress value={timelineProgress} className="h-2 mb-1" />
              <div className="text-xs text-gray-500">
                {inBodyData.daysToGoal - daysElapsed} days remaining
              </div>
            </div>
            
            {/* InBody Score */}
            {inBodyData.inBodyScore && (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">InBody Score</span>
                  <span className="text-sm text-gray-500">{inBodyData.inBodyScore}/100</span>
                </div>
                <Progress value={inBodyData.inBodyScore} className="h-2 mb-1" />
                <div className="text-xs text-gray-500 mt-1">
                  {inBodyCategory}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Body Composition Stats */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium text-gray-900">Body Composition</h3>
            <Activity className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-sm font-semibold text-blue-900">{calorieCalc.leanBodyMass} kg</div>
              <div className="text-xs text-gray-600">Lean Mass</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-sm font-semibold text-green-900">{calorieCalc.targetLeanBodyMass} kg</div>
              <div className="text-xs text-gray-600">Target Lean</div>
            </div>
            {inBodyData.skeletalMuscleMass && (
              <div className="text-center p-2 bg-purple-50 rounded-lg col-span-2">
                <div className="text-sm font-semibold text-purple-900">{inBodyData.skeletalMuscleMass} kg</div>
                <div className="text-xs text-gray-600">Skeletal Muscle Mass</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}