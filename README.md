# Daily Focus

A simple, distraction-free task manager built with **React Native** and **Expo**. Daily Focus helps you keep track of what you want to accomplish today, while keeping your tasks stored locally on your device.

## ✨ Features

- **Create tasks** — Add tasks with a maximum length of 50 characters.
- **Complete tasks** — Mark tasks as completed with a single tap.
- **Edit tasks** — Update existing tasks whenever your priorities change.
- **Delete tasks** — Remove individual tasks with confirmation.
- **Task progress** — See how many tasks you've completed and your overall progress percentage.
- **Clear all tasks** — Remove all saved tasks at once with confirmation.
- **Light & dark themes** — Switch between light and dark appearance.
- **English & Polish** — Use the app in English or Polish.
- **Persistent storage** — Tasks, language, and theme preferences are saved locally.
- **Responsive layout** — The interface adapts to smaller screens and also works on the web.

## 🛠️ Built with

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [Expo Router](https://docs.expo.dev/router/introduction)
- TypeScript
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- `@expo/vector-icons`

## 🚀 Getting started

### Prerequisites

Make sure you have:

- [Node.js](https://nodejs.org/) installed
- npm installed
- An Android emulator, iOS simulator, physical device, or a browser for web development

You can also use **Expo Go** for a quick development setup.

### 1. Install dependencies

Clone the repository and install the project dependencies:

```bash
npm install
```

### 2. Start the development server

```bash
npx expo start
```

After the server starts, Expo will show available options for opening the app.

You can run Daily Focus on:

- **Android emulator**
- **iOS simulator**
- **Physical Android or iOS device**
- **Web browser**
- **Expo Go** for supported development scenarios

### 3. Start developing

Most application screens are located inside the `app` directory.

Because the project uses **Expo Router**, files inside `app` represent the application's routes.

For example:

```text
app/
├── _layout.tsx
├── index.tsx
└── settings.tsx
```

- `index.tsx` — Main Daily Focus screen
- `settings.tsx` — App settings
- `_layout.tsx` — Navigation and application providers

Changes made to your source files will normally appear automatically through Expo's development tools.

## 📱 How Daily Focus works

### Home

The Home screen is where you manage your daily tasks.

You can:

1. Enter a task in the input field.
2. Select **Add task**.
3. Tap the checkbox to mark a task as complete.
4. Open the task actions menu to edit or delete a task.
5. Track your progress using the progress bar at the top.

Tasks are limited to **50 characters** to keep them short and focused.

When all tasks are completed, Daily Focus displays a completion message.

### Settings

The Settings screen lets you:

- Change the application language between **English** and **Polish**.
- Switch between **light** and **dark** themes.
- See the current number of saved tasks.
- Delete all tasks.

Destructive actions require confirmation before anything is permanently removed.

## 💾 Data storage

Daily Focus currently stores its data locally using **AsyncStorage**.

The following information is persisted:

| Data              | Storage              |
| ----------------- | -------------------- |
| Tasks             | Local device storage |
| Selected language | Local device storage |
| Selected theme    | Local device storage |

No backend or external database is currently required.

This means the application can be used without creating an account or connecting to a remote service.

> **Important:** Because tasks are stored locally, they are not automatically synchronized between devices.

## 🌍 Languages

Daily Focus currently supports:

- 🇬🇧 English
- 🇵🇱 Polish

Translations are maintained in:

```text
constants/translations.ts
```

The application also handles Polish task-count grammar automatically, so task counts are displayed using the appropriate Polish form.

## 🎨 Theming

The application includes separate light and dark color palettes.

Theme definitions are located in:

```text
constants/theme.ts
```

Components use the `useTheme()` hook to access the current colors.

The selected theme is saved locally, so your preference is preserved when you reopen the application.

## 📂 Project structure

A simplified overview of the project:

```text
.
├── app/
│   ├── _layout.tsx       # Providers and tab navigation
│   ├── index.tsx         # Home screen
│   └── settings.tsx     # Settings screen
│
├── components/
│   ├── AddTask.tsx       # Add-task form
│   ├── Button.tsx        # Reusable button
│   ├── ConfirmModal.tsx  # Confirmation dialog
│   ├── TaskItem.tsx      # Individual task
│   └── TaskSummary.tsx   # Progress and task summary
│
├── constants/
│   ├── theme.ts          # Colors, spacing, radius and typography
│   └── translations.ts   # English and Polish translations
│
└── context/
    ├── LanguageContext.tsx
    ├── TaskContext.tsx
    └── ThemeContext.tsx
```

### Context providers

The application uses React Context to keep shared state organized:

- **`TaskContext`** — Manages tasks and task operations.
- **`LanguageContext`** — Manages the selected language and translations.
- **`ThemeContext`** — Manages light/dark appearance and theme colors.

## 🧹 Code quality

You can run Expo's linting command with:

```bash
npx expo lint
```

For more information about ESLint and Prettier, see the [Expo ESLint guide](https://docs.expo.dev/guides/using-eslint/).

## 🧪 Testing

Automated tests are not currently included in the project.

If tests are added later, Expo provides documentation for [unit testing with Jest](https://docs.expo.dev/develop/unit-testing/).

## 📚 Useful resources

If you're new to Expo or React Native, these resources are useful:

- [Expo documentation](https://docs.expo.dev/) — Learn how Expo works and explore development guides.
- [Expo Router](https://docs.expo.dev/router/introduction) — Learn about file-based routing.
- [React Native documentation](https://reactnative.dev/docs/getting-started) — Learn about React Native components and APIs.
- [Expo tutorial](https://docs.expo.dev/tutorial/introduction/) — Build an Expo application step by step.

## 🔄 Resetting the project

This project started from the Expo `create-expo-app` template. If you need to reset the original starter structure, the standard Expo reset command is:

```bash
npm run reset-project
```

**Note:** This is generally not something you need to run during normal development. It is intended for resetting the starter project structure.

## 👤 Author

**Maciej Grochowski**

Daily Focus © 2026 Maciej Grochowski
