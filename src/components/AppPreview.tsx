
import { useState } from 'react';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { AddItemModal } from './AddItemModal';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from './ThemeContext';
import type { Habit, Todo, MainViewType, TabType, AddType } from '@/types';

export function AppPreview() {
  const [activeTab, setActiveTab] = useState<TabType>('habits');
  const [mainView, setMainView] = useState<MainViewType>('today');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState<AddType>('');

  // Data states
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      title: 'Morning Meditation',
      category: 'Wellness',
      categoryColor: 'blue',
      timeEstimate: '15 minutes',
      timeOfDay: 'Morning',
      streak: 7,
      completed: true
    },
    {
      id: 2,
      title: 'Read a Book',
      category: 'Learning',
      categoryColor: 'purple',
      timeEstimate: '30 minutes',
      timeOfDay: 'Evening',
      streak: 3,
      completed: false
    }
  ]);

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'Take vitamins',
      category: 'Health',
      categoryColor: 'green',
      time: '8:00 AM',
      notes: 'Fish oil and multivitamin',
      completed: true
    },
    {
      id: 2,
      title: 'Call mom',
      category: 'Personal',
      categoryColor: 'pink',
      time: '5:00 PM',
      notes: 'Ask about weekend plans',
      completed: false
    }
  ]);

  // Toggle completion status
  const toggleComplete = (id: number, isHabit: boolean) => {
    if (isHabit) {
      setHabits(habits.map(habit =>
        habit.id === id ? {...habit, completed: !habit.completed} : habit
      ));
    } else {
      setTodos(todos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
      ));
    }
  };

  // Open add modal with specific type
  const openAddModal = (type: AddType) => {
    setAddType(type);
    setShowAddModal(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          mainView={mainView}
          setMainView={setMainView}
        />
        <MainContent
          activeTab={activeTab}
          mainView={mainView}
          habits={habits}
          todos={todos}
          toggleComplete={toggleComplete}
          openAddModal={openAddModal}
        />
        {showAddModal && (
          <AddItemModal
            addType={addType}
            habits={habits}
            setHabits={setHabits}
            todos={todos}
            setTodos={setTodos}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
