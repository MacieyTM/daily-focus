import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { fontSize, radius, spacing } from '../constants/theme';

import { useTheme } from '../context/ThemeContext';

import { getPolishTaskWord } from '../constants/translations';

import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { useTasks } from '../context/TaskContext';

export default function SettingsScreen() {
  const { tasks, clearAllTasks } = useTasks();
  const { language, setLanguage, t } = useLanguage();
  const { theme, colors, toggleTheme } = useTheme();

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
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        {t.settings.title}
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {t.settings.tasksCount} {tasks.length}{' '}
        {language === 'pl'
          ? getPolishTaskWord(tasks.length)
          : tasks.length === 1
            ? 'task'
            : 'tasks'}
        .
      </Text>

      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
          },
        ]}
      >
        {t.language.title}
      </Text>

      <View style={styles.languageContainer}>
        <Pressable
          style={[
            styles.languageButton,
            {
              borderColor: colors.border,
              backgroundColor: colors.surface,
            },
            language === 'en' && {
              borderColor: colors.text,
            },
          ]}
          onPress={() => setLanguage('en')}
        >
          <Text style={styles.flag}>🇬🇧</Text>

          <Text
            style={[
              styles.languageText,
              {
                color: colors.text,
              },
            ]}
          >
            {t.language.english}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.languageButton,
            {
              borderColor: colors.border,
              backgroundColor: colors.surface,
            },
            language === 'pl' && {
              borderColor: colors.text,
            },
          ]}
          onPress={() => setLanguage('pl')}
        >
          <Text style={styles.flag}>🇵🇱</Text>

          <Text
            style={[
              styles.languageText,
              {
                color: colors.text,
              },
            ]}
          >
            {t.language.polish}
          </Text>
        </Pressable>
      </View>

      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
          },
        ]}
      >
        {t.settings.darkMode}
      </Text>

      <View
        style={[
          styles.themeButton,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.themeText,
            {
              color: colors.text,
            },
          ]}
        >
          {theme === 'dark' ? '🌙' : '☀️'} {t.settings.darkMode}
        </Text>

        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{
            false: colors.border,
            true: colors.textSecondary,
          }}
          thumbColor={theme === 'dark' ? colors.text : colors.surface}
        />
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
  },

  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: fontSize.lg,
  },

  sectionTitle: {
    marginTop: spacing.xxl,
    fontSize: fontSize.lg,
    fontWeight: '600',
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
  },

  flag: {
    fontSize: 24,
    marginRight: spacing.md,
  },

  languageText: {
    fontSize: fontSize.md,
  },

  themeButton: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  themeText: {
    fontSize: fontSize.md,
  },
});
