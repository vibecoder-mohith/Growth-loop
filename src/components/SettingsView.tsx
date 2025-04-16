
import { Bell, Clock, FileText, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

export function SettingsView() {
  const { themeClasses, darkMode, setDarkMode } = useTheme();

  return (
    <div className={`${themeClasses.card} p-4 rounded-xl shadow-sm my-4 max-w-2xl mx-auto`}>
      <h2 className="text-lg font-semibold mb-4">Settings</h2>

      <div className="space-y-4">
        <div className={`p-3 border ${themeClasses.border} rounded-lg`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Moon size={20} className={themeClasses.text} />
              <span className="font-medium">Dark Mode</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full relative ${darkMode ? 'bg-blue-600' : themeClasses.border}`}
            >
              <div className={`absolute w-5 h-5 rounded-full top-0.5 transition-all ${darkMode ? 'right-0.5 bg-white' : 'left-0.5 bg-gray-400'}`}></div>
            </button>
          </div>
        </div>

        <div className={`p-3 border ${themeClasses.border} rounded-lg`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bell size={20} className={themeClasses.text} />
              <span className="font-medium">Notifications</span>
            </div>
            <button className={`w-12 h-6 rounded-full relative bg-blue-600`}>
              <div className={`absolute w-5 h-5 rounded-full top-0.5 right-0.5 bg-white`}></div>
            </button>
          </div>
        </div>

        <div className={`p-3 border ${themeClasses.border} rounded-lg`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Clock size={20} className={themeClasses.text} />
              <span className="font-medium">Reminder Time</span>
            </div>
            <select className={`px-3 py-1 rounded-lg border ${themeClasses.border} ${themeClasses.card} text-sm`}>
              <option>Morning (8:00 AM)</option>
              <option>Afternoon (12:00 PM)</option>
              <option>Evening (6:00 PM)</option>
            </select>
          </div>
        </div>

        <div className={`p-3 border ${themeClasses.border} rounded-lg`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FileText size={20} className={themeClasses.text} />
              <span className="font-medium">Categories</span>
            </div>
            <button className="px-3 py-1 text-sm text-blue-600 font-medium">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
}
