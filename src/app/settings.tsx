import { Alert, Platform, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, spacing } from '../constants/theme';

import Button from '../components/Button';
import { useTasks } from '../context/TaskContext';

export default function SettingsScreen() {
  const { tasks, clearAllTasks } = useTasks();

  const handleClearAllTasks = () => {
    if (tasks.length === 0) {
      return;
    }

    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Delete all tasks?\n\nThis action cannot be undone.',
      );

      if (confirmed) {
        clearAllTasks();
      }

      return;
    }

    Alert.alert('Delete all tasks?', 'This action cannot be undone.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: clearAllTasks,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.subtitle}>
        You currently have {tasks.length}{' '}
        {tasks.length === 1 ? 'task' : 'tasks'}.
      </Text>

      <Button
        title='Delete all tasks'
        onPress={handleClearAllTasks}
        variant='danger'
        disabled={tasks.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xxl,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
});
