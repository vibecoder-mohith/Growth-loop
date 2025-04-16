
import { Calendar, BarChart, Settings } from 'lucide-react';
import { useTheme } from './ThemeContext';
import type { TabType, MainViewType } from '@/types';

interface Props {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  mainView: MainViewType;
  setMainView: (view: MainViewType) => void;
}

export function Header({ activeTab, setActiveTab, mainView, setMainView }: Props) {
  const { themeClasses } = useTheme();

  return (
    <div className={`${themeClasses.card} p-4 rounded-b-xl shadow-sm sticky top-0 z-10`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={24} className="text-blue-600" />
          <h1 className="text-xl font-bold">Zen Tasks</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMainView('stats')} 
            className={`p-2 rounded-lg ${mainView === 'stats' ? 'text-blue-600' : themeClasses.textSecondary}`}
          >
            <BarChart size={20} />
          </button>
          <button 
            onClick={() => setMainView('settings')} 
            className={`p-2 rounded-lg ${mainView === 'settings' ? 'text-blue-600' : themeClasses.textSecondary}`}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className={`flex-1 py-2 text-center rounded-lg font-medium ${
            activeTab === 'habits' ? 'bg-blue-600 text-white' : themeClasses.textSecondary
          }`}
          onClick={() => setActiveTab('habits')}
        >
          Habits
        </button>
        <button
          className={`flex-1 py-2 text-center rounded-lg font-medium ${
            activeTab === 'todos' ? 'bg-blue-600 text-white' : themeClasses.textSecondary
          }`}
          onClick={() => setActiveTab('todos')}
        >
          To-dos
        </button>
      </div>
    </div>
  );
}
