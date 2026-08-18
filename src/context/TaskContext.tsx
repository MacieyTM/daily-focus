import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  isLoaded: boolean;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  clearAllTasks: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TASKS_STORAGE_KEY = '@daily-focus/tasks';
const MAX_TASK_LENGTH = 50;

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.log('Failed to load tasks:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.log('Failed to save tasks:', error);
      }
    };

    saveTasks();
  }, [tasks, isLoaded]);

  const addTask = (title: string) => {
    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      return;
    }

    const limitedTitle = trimmedTitle.slice(0, MAX_TASK_LENGTH);

    const newTask: Task = {
      id: Date.now().toString(),
      title: limitedTitle,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      }),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((item) => item.id !== id));
  };

  const editTask = (id: string, newTitle: string) => {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === '') {
      return;
    }

    const limitedTitle = trimmedTitle.slice(0, MAX_TASK_LENGTH);

    setTasks((currentTasks) =>
      currentTasks.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: limitedTitle,
          };
        }

        return item;
      }),
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoaded,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        clearAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider');
  }

  return context;
}
