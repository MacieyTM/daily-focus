import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { colors, fontSize, radius, spacing } from '../constants/theme';

import AddTask from '../components/AddTask';
import TaskItem from '../components/TaskItem';
import TaskSummary from '../components/TaskSummary';

import { useTasks } from '../context/TaskContext';

import { useLanguage } from '../context/LanguageContext';

export default function HomeScreen() {
  const [task, setTask] = useState('');

  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();
  const { t } = useLanguage();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((item) => item.completed).length;

  const handleAddTask = () => {
    if (task.trim() === '') {
      return;
    }

    addTask(task);
    setTask('');
  };

  const { width } = useWindowDimensions();

  const isSmallScreen = width < 500;

  return (
    <View style={[styles.container, isSmallScreen && styles.smallContainer]}>
      <View style={[styles.header, isSmallScreen && styles.smallHeader]}>
        <View style={styles.headerText}>
          <Text style={[styles.title, isSmallScreen && styles.smallTitle]}>
            {t.home.title}
          </Text>
          <Text
            style={[styles.subtitle, isSmallScreen && styles.smallSubtitle]}
          >
            {t.home.subtitle}
          </Text>
        </View>
        <Text
          style={[styles.copyright, isSmallScreen && styles.smallCopyright]}
        >
          {t.home.copyright}
        </Text>
      </View>

      <View style={styles.card}>
        <TaskSummary totalTasks={totalTasks} completedTasks={completedTasks} />

        {totalTasks > 0 && completedTasks === totalTasks && (
          <Text style={styles.successText}>{t.home.allTasksCompleted}</Text>
        )}

        <FlatList
          style={styles.flatList}
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
            <Text style={styles.cardText}>{t.home.emptyTasks}</Text>
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

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  headerText: {
    flex: 1,
  },

  title: {
    // marginTop: 40,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },

  copyright: {
    marginLeft: spacing.lg,
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'right',
  },

  card: {
    flex: 1,
    marginTop: spacing.md,
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
    paddingBottom: spacing.sm,
  },

  flatList: {
    backgroundColor: colors.background,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    borderRadius: radius.lg,
  },

  smallContainer: {
    padding: spacing.md,
  },

  smallTitle: {
    fontSize: fontSize.xl,
  },

  smallSubtitle: {
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },

  smallHeader: {
    flexDirection: 'column',
  },

  smallCopyright: {
    marginTop: spacing.sm,
    marginLeft: 0,
    textAlign: 'left',
  },
});
