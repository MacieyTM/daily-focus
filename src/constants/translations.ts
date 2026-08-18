export type Language = 'en' | 'pl';

export const translations = {
  en: {
    home: {
      title: 'Daily Focus',
      subtitle: 'What do you want to accomplish today?',
      copyright: '© Copyright 2026 | Maciej Grochowski',
      allTasksCompleted: 'All tasks completed!',
      emptyTasks: "You haven't added anything yet.",
      todaysTasks: "Today's tasks",
      task: 'task',
      tasks: 'tasks',
      completed: 'completed',
      complete: 'complete',
    },

    settings: {
      title: 'Settings',
      tasksCount: 'You currently have',
      task: 'task',
      tasks: 'tasks',
      deleteAllTasks: 'Delete all tasks',
      deleteAllTasksTitle: 'Delete all tasks?',
      deleteAllTasksMessage: 'This action cannot be undone.',
      darkMode: 'Dark mode',
    },

    task: {
      deleteTaskTitle: 'Delete task?',
      deleteTaskMessage: 'Delete "{{title}}"? This action cannot be undone.',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      save: 'Save',
      actionsFor: 'Actions for {{title}}',
      clear: 'Clear edit input',
    },

    addTask: {
      placeholder: 'Enter a task...',
      add: 'Add task',
      clear: 'Clear input',
    },

    tabs: {
      home: 'Home',
      settings: 'Settings',
    },

    language: {
      title: 'Language',
      english: 'English',
      polish: 'Polski',
    },
  },

  pl: {
    home: {
      title: 'Dzienny Fokus',
      subtitle: 'Co chcesz dzisiaj osiągnąć?',
      copyright: '© Copyright 2026 | Maciej Grochowski',
      allTasksCompleted: 'Wszystkie zadania wykonane!',
      emptyTasks: 'Nie dodałeś jeszcze żadnych zadań.',
      todaysTasks: 'Dzisiejsze zadania',
      task: 'zadanie',
      tasks: 'zadań',
      completed: 'ukończonych',
      complete: 'ukończono',
    },

    settings: {
      title: 'Ustawienia',
      tasksCount: 'Masz obecnie',
      task: 'zadanie',
      tasks: 'zadań',
      deleteAllTasks: 'Usuń wszystkie zadania',
      deleteAllTasksTitle: 'Usunąć wszystkie zadania?',
      deleteAllTasksMessage: 'Tej operacji nie można cofnąć.',
      darkMode: 'Tryb ciemny',
    },

    task: {
      deleteTaskTitle: 'Usunąć zadanie?',
      deleteTaskMessage: 'Usunąć "{{title}}"? Tej operacji nie można cofnąć.',
      cancel: 'Anuluj',
      delete: 'Usuń',
      edit: 'Edytuj',
      save: 'Zapisz',
      actionsFor: 'Akcje dla {{title}}',
      clear: 'Wyczyść pole edycji',
    },

    addTask: {
      placeholder: 'Wpisz zadanie...',
      add: 'Dodaj zadanie',
      clear: 'Wyczyść pole',
    },

    tabs: {
      home: 'Start',
      settings: 'Ustawienia',
    },

    language: {
      title: 'Język',
      english: 'English',
      polish: 'Polski',
    },
  },
} as const;

export function getPolishTaskWord(count: number) {
  if (count === 1) {
    return 'zadanie';
  }

  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    !(count % 100 >= 12 && count % 100 <= 14)
  ) {
    return 'zadania';
  }

  return 'zadań';
}
