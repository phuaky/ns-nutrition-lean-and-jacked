import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { UserData } from "@/lib/calculations";

interface ProfileSetupProps {
  userData: UserData;
  onUserDataChange: (data: UserData) => void;
  onCalculate: () => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export function ProfileSetup({ 
  userData, 
  onUserDataChange, 
  onCalculate, 
  isExpanded, 
  onToggleExpanded 
}: ProfileSetupProps) {
  const updateField = (field: keyof UserData, value: number) => {
    onUserDataChange({ ...userData, [field]: value });
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Profile Setup</h2>
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
        
        {isExpanded && (
          <div className="space-y-4">
            {/* InBody Data Input */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">InBody Data</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-gray-600">Weight (kg)</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    value={userData.weight || ''}
                    onChange={(e) => updateField('weight', parseFloat(e.target.value) || 0)}
                    placeholder="71.2"
                    className="text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Body Fat %</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    value={userData.bodyFat || ''}
                    onChange={(e) => updateField('bodyFat', parseFloat(e.target.value) || 0)}
                    placeholder="24"
                    className="text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Target Weight (kg)</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    value={userData.targetWeight || ''}
                    onChange={(e) => updateField('targetWeight', parseFloat(e.target.value) || 0)}
                    placeholder="63.6"
                    className="text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">InBody Score</Label>
                  <Input 
                    type="number"
                    value={userData.inbodyScore || ''}
                    onChange={(e) => updateField('inbodyScore', parseInt(e.target.value) || 0)}
                    placeholder="74"
                    className="text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Calorie Goals */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Daily Goals</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-medium text-gray-600">BMR (kcal/day)</Label>
                  <Input 
                    type="number"
                    value={userData.bmr || ''}
                    onChange={(e) => updateField('bmr', parseInt(e.target.value) || 0)}
                    placeholder="1650"
                    className="text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Activity Level</Label>
                  <Select 
                    value={userData.activityLevel.toString()} 
                    onValueChange={(value) => updateField('activityLevel', parseFloat(value))}
                  >
                    <SelectTrigger className="text-sm mt-1">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.2">Sedentary (1.2x)</SelectItem>
                      <SelectItem value="1.375">Light Activity (1.375x)</SelectItem>
                      <SelectItem value="1.55">Moderate Activity (1.55x)</SelectItem>
                      <SelectItem value="1.725">Very Active (1.725x)</SelectItem>
                      <SelectItem value="1.9">Extremely Active (1.9x)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Timeline (days to goal)</Label>
                  <Input 
                    type="number"
                    value={userData.timeline || ''}
                    onChange={(e) => updateField('timeline', parseInt(e.target.value) || 0)}
                    placeholder="90"
                    className="text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={onCalculate}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium text-sm hover:bg-blue-700"
            >
              Calculate My Plan
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
