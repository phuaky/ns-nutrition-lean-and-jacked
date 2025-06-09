import { Home, Utensils, TrendingUp, Calendar } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'meals', label: 'Meals', icon: Utensils },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'calendar', label: 'Calendar', icon: Calendar }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="grid grid-cols-4 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-1 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
