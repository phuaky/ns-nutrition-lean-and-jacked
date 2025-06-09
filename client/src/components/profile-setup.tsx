import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { 
  type InBodyData, 
  type CalorieCalculation,
  getBodyFatCategory,
  isDeficitSafe
} from "@/lib/calculations";

interface ProfileSetupProps {
  inBodyData: InBodyData;
  onInBodyDataChange: (data: InBodyData) => void;
  onCalculate: () => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  calorieCalc: CalorieCalculation | null;
}

export function ProfileSetup({ 
  inBodyData, 
  onInBodyDataChange, 
  onCalculate, 
  isExpanded, 
  onToggleExpanded,
  calorieCalc
}: ProfileSetupProps) {
  const updateField = (field: keyof InBodyData, value: any) => {
    onInBodyDataChange({ ...inBodyData, [field]: value });
  };

  const bodyFatCategory = getBodyFatCategory(inBodyData.currentBodyFatPercentage, inBodyData.gender);
  const targetBodyFatCategory = getBodyFatCategory(inBodyData.targetBodyFatPercentage, inBodyData.gender);
  
  const deficitSafe = calorieCalc ? isDeficitSafe(calorieCalc.tdee, calorieCalc.dailyDeficit) : true;

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">InBody Profile</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onToggleExpanded}
            className="text-primary text-sm font-medium hover:bg-transparent"
          >
            <span>{isExpanded ? 'Collapse' : 'Edit'}</span>
            {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
          </Button>
        </div>
        
        {!isExpanded && calorieCalc && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Current:</span>
              <span className="font-medium">{inBodyData.currentWeight}kg @ {inBodyData.currentBodyFatPercentage}% BF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Target:</span>
              <span className="font-medium">{inBodyData.targetWeight}kg @ {inBodyData.targetBodyFatPercentage}% BF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Daily Budget:</span>
              <span className="font-medium text-primary">{calorieCalc.dailyBudget} kcal</span>
            </div>
          </div>
        )}
        
        {isExpanded && (
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-gray-600">Gender</Label>
                  <Select 
                    value={inBodyData.gender} 
                    onValueChange={(value) => updateField('gender', value)}
                  >
                    <SelectTrigger className="text-sm mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Age</Label>
                  <Input 
                    type="number"
                    value={inBodyData.age || ''}
                    onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
                    placeholder="30"
                    className="text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Height (cm)</Label>
                  <Input 
                    type="number"
                    value={inBodyData.height || ''}
                    onChange={(e) => updateField('height', parseInt(e.target.value) || 0)}
                    placeholder="175"
                    className="text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Activity Level</Label>
                  <Select 
                    value={inBodyData.activityLevel} 
                    onValueChange={(value) => updateField('activityLevel', value)}
                  >
                    <SelectTrigger className="text-sm mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="lightlyActive">Light Exercise</SelectItem>
                      <SelectItem value="moderatelyActive">Moderate Exercise</SelectItem>
                      <SelectItem value="veryActive">Very Active</SelectItem>
                      <SelectItem value="extraActive">Extra Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Current InBody Data */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Current InBody Measurements</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-gray-600">Weight (kg)</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    value={inBodyData.currentWeight || ''}
                    onChange={(e) => updateField('currentWeight', parseFloat(e.target.value) || 0)}
                    placeholder="71.2"
                    className="text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Body Fat %</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    value={inBodyData.currentBodyFatPercentage || ''}
                    onChange={(e) => updateField('currentBodyFatPercentage', parseFloat(e.target.value) || 0)}
                    placeholder="24"
                    className="text-sm mt-1"
                  />
                  {inBodyData.currentBodyFatPercentage > 0 && (
                    <span className="text-xs text-gray-500 mt-1">{bodyFatCategory}</span>
                  )}
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Muscle Mass (kg)</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    value={inBodyData.skeletalMuscleMass || ''}
                    onChange={(e) => updateField('skeletalMuscleMass', parseFloat(e.target.value) || 0)}
                    placeholder="32.8"
                    className="text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">InBody Score</Label>
                  <Input 
                    type="number"
                    value={inBodyData.inBodyScore || ''}
                    onChange={(e) => updateField('inBodyScore', parseInt(e.target.value) || 0)}
                    placeholder="74"
                    className="text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Target Goals */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Target Goals</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-gray-600">Target Weight (kg)</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    value={inBodyData.targetWeight || ''}
                    onChange={(e) => updateField('targetWeight', parseFloat(e.target.value) || 0)}
                    placeholder="63.6"
                    className="text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Target Body Fat %</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    value={inBodyData.targetBodyFatPercentage || ''}
                    onChange={(e) => updateField('targetBodyFatPercentage', parseFloat(e.target.value) || 0)}
                    placeholder="15"
                    className="text-sm mt-1"
                  />
                  {inBodyData.targetBodyFatPercentage > 0 && (
                    <span className="text-xs text-gray-500 mt-1">{targetBodyFatCategory}</span>
                  )}
                </div>
                <div className="col-span-2">
                  <Label className="text-xs font-medium text-gray-600">Days to Goal</Label>
                  <Input 
                    type="number"
                    value={inBodyData.daysToGoal || ''}
                    onChange={(e) => updateField('daysToGoal', parseInt(e.target.value) || 0)}
                    placeholder="90"
                    className="text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Calculation Results */}
            {calorieCalc && (
              <div className="bg-blue-50 rounded-lg p-3">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Calculation Results</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">BMR:</span>
                    <span className="font-medium text-blue-900">{calorieCalc.bmr} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">TDEE:</span>
                    <span className="font-medium text-blue-900">{calorieCalc.tdee} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Daily Deficit:</span>
                    <span className="font-medium text-blue-900">{calorieCalc.dailyDeficit} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Daily Budget:</span>
                    <span className="font-bold text-primary">{calorieCalc.dailyBudget} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Total Fat Loss:</span>
                    <span className="font-medium text-blue-900">{calorieCalc.totalFatLossKg} kg</span>
                  </div>
                </div>
                {!deficitSafe && (
                  <div className="mt-2 p-2 bg-yellow-100 rounded flex items-start space-x-1">
                    <Info className="w-4 h-4 text-yellow-700 mt-0.5" />
                    <p className="text-xs text-yellow-700">
                      Your deficit exceeds safe limits. Consider extending your timeline or adjusting your target.
                    </p>
                  </div>
                )}
              </div>
            )}

            <Button 
              onClick={() => onCalculate()}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium text-sm hover:bg-blue-700"
              disabled={!inBodyData.currentWeight || !inBodyData.targetWeight || !inBodyData.height}
            >
              Calculate My Plan
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}