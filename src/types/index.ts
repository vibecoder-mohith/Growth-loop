
export type TabType = 'habits' | 'todos';
export type MainViewType = 'today' | 'stats' | 'settings';
export type AddType = 'habit' | 'todo' | '';
export type CategoryColor = 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'red';

export interface Habit {
  id: number;
  title: string;
  category: string;
  categoryColor: CategoryColor;
  timeEstimate: string;
  timeOfDay: string;
  streak: number;
  completed: boolean;
}

export interface Todo {
  id: number;
  title: string;
  category: string;
  categoryColor: CategoryColor;
  time: string;
  notes: string;
  completed: boolean;
}
