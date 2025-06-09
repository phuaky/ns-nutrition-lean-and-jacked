import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDayName } from "@/lib/nutrition-data";

interface WeeklyCalendarProps {
  currentDay: string;
  onDaySelect?: (day: string) => void;
}

export function WeeklyCalendar({ currentDay, onDaySelect }: WeeklyCalendarProps) {
  const days = [
    { short: 'Sun', full: 'sunday', date: 10 },
    { short: 'Mon', full: 'monday', date: 11 },
    { short: 'Tue', full: 'tuesday', date: 12 },
    { short: 'Wed', full: 'wednesday', date: 13 },
    { short: 'Thu', full: 'thursday', date: 14 },
    { short: 'Fri', full: 'friday', date: 15 },
    { short: 'Sat', full: 'saturday', date: 16 }
  ];

  const todayName = getDayName();

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Meal Plans</h2>
        
        <div className="grid grid-cols-7 gap-1 mb-4">
          {days.map((day) => (
            <div 
              key={day.full}
              className={`text-center cursor-pointer p-2 rounded-lg transition-colors ${
                day.full === currentDay 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onDaySelect?.(day.full)}
            >
              <div className="text-xs font-medium">{day.short}</div>
              <div className="text-xs mt-1">{day.date}</div>
              {day.full === todayName && (
                <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-1"></div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            {currentDay.charAt(0).toUpperCase() + currentDay.slice(1)}'s Menu Preview
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between items-center">
              <span>Lunch: Available options based on calorie budget</span>
              <Badge variant="outline" className="text-primary border-primary">
                View
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Dinner: Available options based on calorie budget</span>
              <Badge variant="outline" className="text-secondary border-secondary">
                View
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
