
import { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from './ThemeContext';
import type { Habit, Todo } from '@/types';

interface Props {
  addType: 'habit' | 'todo' | '';
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  onClose: () => void;
}

export function AddItemModal({ addType, habits, setHabits, todos, setTodos, onClose }: Props) {
  const { themeClasses } = useTheme();
  
  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('15');
  const [timeOfDay, setTimeOfDay] = useState('Morning');

  const getCategoryColor = (category: string) => {
    const colorMap = {
      'Wellness': 'blue',
      'Learning': 'purple',
      'Health': 'green',
      'Personal': 'pink',
      'Work': 'yellow',
      'Fitness': 'red'
    };
    return colorMap[category] || 'blue';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    if (addType === 'habit') {
      const newHabit: Habit = {
        id: habits.length + 1,
        title,
        category: category || 'General',
        categoryColor: getCategoryColor(category) as Habit['categoryColor'],
        timeEstimate: `${duration} minutes`,
        timeOfDay,
        streak: 0,
        completed: false
      };
      setHabits([...habits, newHabit]);
    } else {
      const newTodo: Todo = {
        id: todos.length + 1,
        title,
        category: category || 'General',
        categoryColor: getCategoryColor(category) as Todo['categoryColor'],
        time: time || 'Anytime',
        notes,
        completed: false
      };
      setTodos([...todos, newTodo]);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${themeClasses.card} w-full max-w-md rounded-xl p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add {addType === 'habit' ? 'Habit' : 'Todo'}</h2>
          <button onClick={onClose} className={themeClasses.textSecondary}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 rounded-lg border ${themeClasses.input}`}
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full p-2 rounded-lg border ${themeClasses.input}`}
            >
              <option value="">Select category</option>
              <option>Wellness</option>
              <option>Learning</option>
              <option>Health</option>
              <option>Personal</option>
              <option>Work</option>
              <option>Fitness</option>
            </select>
          </div>

          {addType === 'habit' ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${themeClasses.input}`}
                >
                  <option>5</option>
                  <option>15</option>
                  <option>30</option>
                  <option>45</option>
                  <option>60</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time of Day</label>
                <select
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${themeClasses.input}`}
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                  <option>Night</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${themeClasses.input}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${themeClasses.input}`}
                  rows={3}
                  placeholder="Add notes"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium"
          >
            Add {addType === 'habit' ? 'Habit' : 'Todo'}
          </button>
        </form>
      </div>
    </div>
  );
}
