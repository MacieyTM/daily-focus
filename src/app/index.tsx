import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { fontSize, radius, spacing } from '../constants/theme';

import { useLanguage } from '../context/LanguageContext';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

import AddTask from '../components/AddTask';
import TaskItem from '../components/TaskItem';
import TaskSummary from '../components/TaskSummary';

export default function HomeScreen() {
  const [task, setTask] = useState('');

  const { colors } = useTheme();
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
        isSmallScreen && styles.smallContainer,
      ]}
    >
      <View style={[styles.header, isSmallScreen && styles.smallHeader]}>
        <View style={styles.headerText}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
              isSmallScreen && styles.smallTitle,
            ]}
          >
            {t.home.title}
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
              },
              isSmallScreen && styles.smallSubtitle,
            ]}
          >
            {t.home.subtitle}
          </Text>
        </View>

        <Text
          style={[
            styles.copyright,
            {
              color: colors.textMuted,
            },
            isSmallScreen && styles.smallCopyright,
          ]}
        >
          {t.home.copyright}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
          },
        ]}
      >
        <TaskSummary totalTasks={totalTasks} completedTasks={completedTasks} />

        {totalTasks > 0 && completedTasks === totalTasks && (
          <Text
            style={[
              styles.successText,
              {
                color: colors.successTextSecondary,
              },
            ]}
          >
            {t.home.allTasksCompleted}
          </Text>
        )}

        <FlatList
          style={[
            styles.flatList,
            {
              backgroundColor: colors.background,
            },
          ]}
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
            <Text
              style={[
                styles.cardText,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              {t.home.emptyTasks}
            </Text>
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
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: fontSize.lg,
  },

  copyright: {
    marginLeft: spacing.lg,
    fontSize: fontSize.sm,
    textAlign: 'right',
  },

  card: {
    flex: 1,
    marginTop: spacing.md,
    padding: spacing.xl,
    borderRadius: radius.xl,
  },

  cardText: {
    marginTop: spacing.sm,
    fontSize: fontSize.md,
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
    paddingBottom: spacing.sm,
  },

  flatList: {
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
