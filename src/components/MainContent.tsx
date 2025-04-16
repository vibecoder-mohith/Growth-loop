
import { Plus, Circle, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { StatsView } from './StatsView';
import { SettingsView } from './SettingsView';
import type { MainViewType, TabType, Habit, Todo } from '@/types';

interface Props {
  activeTab: TabType;
  mainView: MainViewType;
  habits: Habit[];
  todos: Todo[];
  toggleComplete: (id: number, isHabit: boolean) => void;
  openAddModal: (type: 'habit' | 'todo') => void;
}

export function MainContent({ 
  activeTab, 
  mainView,
  habits,
  todos,
  toggleComplete,
  openAddModal 
}: Props) {
  const { themeClasses, darkMode } = useTheme();

  const getProgress = () => {
    if (activeTab === 'habits') {
      const completed = habits.filter(h => h.completed).length;
      return {
        count: `${completed} of ${habits.length}`,
        percentage: habits.length > 0 ? (completed / habits.length) * 100 : 0
      };
    } else {
      const completed = todos.filter(t => t.completed).length;
      return {
        count: `${completed} of ${todos.length}`,
        percentage: todos.length > 0 ? (completed / todos.length) * 100 : 0
      };
    }
  };

  if (mainView === 'stats') {
    return <StatsView />;
  }

  if (mainView === 'settings') {
    return <SettingsView />;
  }

  const getCategoryClasses = (color: string) => {
    const colorClasses = {
      'blue': 'bg-blue-500 bg-opacity-20 text-blue-500',
      'purple': 'bg-purple-500 bg-opacity-20 text-purple-500',
      'green': 'bg-green-500 bg-opacity-20 text-green-500',
      'pink': 'bg-pink-500 bg-opacity-20 text-pink-500',
      'yellow': 'bg-yellow-500 bg-opacity-20 text-yellow-500',
      'red': 'bg-red-500 bg-opacity-20 text-red-500'
    };
    return colorClasses[color] || colorClasses['blue'];
  };

  const getStreakClasses = (color: string) => {
    const colorClasses = {
      'blue': 'bg-blue-500 bg-opacity-10 text-blue-500',
      'purple': 'bg-purple-500 bg-opacity-10 text-purple-500',
      'green': 'bg-green-500 bg-opacity-10 text-green-500',
      'pink': 'bg-pink-500 bg-opacity-10 text-pink-500',
      'yellow': 'bg-yellow-500 bg-opacity-10 text-yellow-500',
      'red': 'bg-red-500 bg-opacity-10 text-red-500'
    };
    return colorClasses[color] || colorClasses['blue'];
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Progress Summary */}
      <div className={`${themeClasses.card} p-4 rounded-xl shadow-sm mb-4`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Today's Progress</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{getProgress().count}</span>
          </div>
        </div>
        <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${getProgress().percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {activeTab === 'habits' ? (
          <>
            {habits.map(habit => (
              <div key={habit.id} className={`${themeClasses.card} p-4 rounded-xl shadow-sm ${habit.completed ? 'opacity-75' : ''}`}>
                <div className="flex items-center">
                  <button className="mr-3 flex-shrink-0" onClick={() => toggleComplete(habit.id, true)}>
                    {habit.completed ? (
                      <CheckCircle size={24} className="text-green-500" />
                    ) : (
                      <Circle size={24} className={darkMode ? "text-gray-700" : "text-gray-300"} />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className={`font-medium ${habit.completed ? 'line-through' : ''}`}>{habit.title}</h3>
                      <div className={`ml-2 px-2 py-0.5 text-xs rounded ${getCategoryClasses(habit.categoryColor)}`}>
                        {habit.category}
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      <span>{habit.timeEstimate} · {habit.timeOfDay}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`flex items-center px-2 py-1 rounded-lg ${getStreakClasses(habit.categoryColor)}`}>
                      <span className="text-xs font-medium">{habit.streak} days</span>
                    </div>
                    <button className="ml-2 p-1 text-gray-400">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={() => openAddModal('habit')}
              className={`w-full ${themeClasses.card} p-3 rounded-xl border border-dashed ${themeClasses.border} flex items-center justify-center text-blue-600`}
            >
              <Plus size={20} className="mr-2" />
              <span className="font-medium">Add Habit</span>
            </button>
          </>
        ) : (
          <>
            {todos.map(todo => (
              <div key={todo.id} className={`${themeClasses.card} p-4 rounded-xl shadow-sm ${todo.completed ? 'opacity-75' : ''}`}>
                <div className="flex items-center">
                  <button className="mr-3 flex-shrink-0" onClick={() => toggleComplete(todo.id, false)}>
                    {todo.completed ? (
                      <CheckCircle size={24} className="text-green-500" />
                    ) : (
                      <Circle size={24} className={darkMode ? "text-gray-700" : "text-gray-300"} />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className={`font-medium ${todo.completed ? 'line-through' : ''}`}>{todo.title}</h3>
                      <div className={`ml-2 px-2 py-0.5 text-xs rounded ${getCategoryClasses(todo.categoryColor)}`}>
                        {todo.category}
                      </div>
                    </div>
                    {(todo.time || todo.notes) && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        <span>{todo.time} {todo.notes && `· ${todo.notes}`}</span>
                      </div>
                    )}
                  </div>
                  <button className="ml-2 p-1 text-gray-400">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => openAddModal('todo')}
              className={`w-full ${themeClasses.card} p-3 rounded-xl border border-dashed ${themeClasses.border} flex items-center justify-center text-blue-600`}
            >
              <Plus size={20} className="mr-2" />
              <span className="font-medium">Add Todo</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
