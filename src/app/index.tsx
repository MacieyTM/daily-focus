import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '../constants/theme';

import AddTask from '../components/AddTask';
import TaskItem from '../components/TaskItem';
import TaskSummary from '../components/TaskSummary';

import { useTasks } from '../context/TaskContext';

export default function HomeScreen() {
  const [task, setTask] = useState('');

  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((item) => item.completed).length;

  const handleAddTask = () => {
    if (task.trim() === '') {
      return;
    }

    addTask(task);
    setTask('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Focus</Text>

      <Text style={styles.subtitle}>What do you want to accomplish today?</Text>

      <View style={styles.card}>
        <TaskSummary totalTasks={totalTasks} completedTasks={completedTasks} />

        {totalTasks > 0 && completedTasks === totalTasks && (
          <Text style={styles.successText}>All tasks completed!</Text>
        )}

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              title={item.title}
              completed={item.completed}
              onPress={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
              onEdit={(newTitle) => editTask(item.id, newTitle)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.cardText}>You haven't added anything yet.</Text>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            tasks.length === 0 ? styles.emptyList : styles.list
          }
        />

        <AddTask value={task} onChangeText={setTask} onAdd={handleAddTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xxl,
    backgroundColor: colors.background,
    marginBottom: spacing.xs,
  },

  title: {
    marginTop: 40,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },

  card: {
    flex: 1,
    marginTop: spacing.xxxl,
    padding: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
  },

  cardText: {
    marginTop: spacing.sm,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },

  list: {
    paddingBottom: spacing.sm,
  },

  emptyList: {
    flexGrow: 1,
  },

  successText: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.successTextSecondary,
  },
});
