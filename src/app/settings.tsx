import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, fontSize, radius, spacing } from '../constants/theme';
import { getPolishTaskWord } from '../constants/translations';

import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { useTasks } from '../context/TaskContext';

export default function SettingsScreen() {
  const { tasks, clearAllTasks } = useTasks();
  const { language, setLanguage, t } = useLanguage();

  const handleClearAllTasks = () => {
    if (tasks.length === 0) {
      return;
    }

    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        `${t.settings.deleteAllTasksTitle}\n\n${t.settings.deleteAllTasksMessage}`,
      );

      if (confirmed) {
        clearAllTasks();
      }

      return;
    }

    Alert.alert(
      t.settings.deleteAllTasksTitle,
      t.settings.deleteAllTasksMessage,
      [
        {
          text: t.task.cancel,
          style: 'cancel',
        },
        {
          text: t.task.delete,
          style: 'destructive',
          onPress: clearAllTasks,
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.settings.title}</Text>

      <Text style={styles.subtitle}>
        {t.settings.tasksCount} {tasks.length}{' '}
        {language === 'pl'
          ? getPolishTaskWord(tasks.length)
          : tasks.length === 1
            ? 'task'
            : 'tasks'}
        .
      </Text>

      <Text style={styles.sectionTitle}>{t.language.title}</Text>

      <View style={styles.languageContainer}>
        <Pressable
          style={[
            styles.languageButton,
            language === 'en' && styles.selectedLanguage,
          ]}
          onPress={() => setLanguage('en')}
        >
          <Text style={styles.flag}>🇬🇧</Text>
          <Text style={styles.languageText}>{t.language.english}</Text>
        </Pressable>

        <Pressable
          style={[
            styles.languageButton,
            language === 'pl' && styles.selectedLanguage,
          ]}
          onPress={() => setLanguage('pl')}
        >
          <Text style={styles.flag}>🇵🇱</Text>
          <Text style={styles.languageText}>{t.language.polish}</Text>
        </Pressable>
      </View>

      <Button
        title={t.settings.deleteAllTasks}
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
    justifyContent: 'flex-start',
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

  sectionTitle: {
    marginTop: spacing.xxl,
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },

  languageContainer: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },

  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  selectedLanguage: {
    borderColor: colors.text,
    backgroundColor: colors.surface,
  },

  flag: {
    fontSize: 24,
    marginRight: spacing.md,
  },

  languageText: {
    fontSize: fontSize.md,
    color: colors.text,
  },
});
