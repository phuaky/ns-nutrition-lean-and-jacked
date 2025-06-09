import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { UserData } from "@/lib/calculations";

interface ProgressTrackingProps {
  userData: UserData;
  currentDay?: number;
}

export function ProgressTracking({ userData, currentDay = 1 }: ProgressTrackingProps) {
  const weightProgress = userData.weight > 0 && userData.targetWeight > 0 
    ? Math.min(((userData.weight - userData.targetWeight) / (userData.weight - userData.targetWeight)) * 100, 100)
    : 0;
  
  const timelineProgress = (currentDay / userData.timeline) * 100;

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Progress Tracking</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Weight Goal Progress</span>
              <span className="text-sm text-gray-500">{Math.round(weightProgress)}%</span>
            </div>
            <Progress value={weightProgress} className="h-2 mb-1" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{userData.weight} kg</span>
              <span>{userData.targetWeight} kg</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Timeline Progress</span>
              <span className="text-sm text-gray-500">Day {currentDay} of {userData.timeline}</span>
            </div>
            <Progress value={timelineProgress} className="h-2" />
          </div>

          {userData.inbodyScore > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">InBody Score</span>
                <span className="text-sm text-gray-500">{userData.inbodyScore}/100</span>
              </div>
              <Progress value={userData.inbodyScore} className="h-2" />
              <div className="text-xs text-gray-500 mt-1">
                {userData.inbodyScore >= 80 ? 'Excellent' : 
                 userData.inbodyScore >= 70 ? 'Good' : 
                 userData.inbodyScore >= 60 ? 'Fair' : 'Needs Improvement'}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
