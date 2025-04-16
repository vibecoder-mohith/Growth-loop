
import { useTheme } from './ThemeContext';

export function StatsView() {
  const { themeClasses, darkMode } = useTheme();

  return (
    <div className={`${themeClasses.card} p-4 rounded-xl shadow-sm my-4 max-w-2xl mx-auto`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Weekly Stats</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded-lg">Week</button>
          <button className={`px-3 py-1 text-sm font-medium ${themeClasses.textSecondary}`}>Month</button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Habit Completion</h3>
            <span className="text-sm font-medium text-blue-600">86%</span>
          </div>
          <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '86%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Todo Completion</h3>
            <span className="text-sm font-medium text-green-600">72%</span>
          </div>
          <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div className="h-full bg-green-600 rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-3">Top Habits</h3>
          <div className={`${themeClasses.card} border ${themeClasses.border} rounded-lg p-3`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Morning Meditation</span>
              <span className="text-blue-600 text-sm">15 days</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Read a Book</span>
              <span className="text-purple-600 text-sm">8 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Daily Exercise</span>
              <span className="text-red-600 text-sm">6 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
