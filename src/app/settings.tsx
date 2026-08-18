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

import { getPolishTaskWord } from '../constants/translations';

import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

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

      {/* Language */}

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

      <View
        style={[
          styles.settingsCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Pressable
          style={[
            styles.optionButton,
            language === 'en' && {
              backgroundColor: colors.background,
              borderColor: colors.text,
            },
          ]}
          onPress={() => setLanguage('en')}
        >
          <View style={styles.optionLeft}>
            <Text style={styles.flag}>🇬🇧</Text>

            <Text
              style={[
                styles.optionText,
                {
                  color: colors.text,
                },
              ]}
            >
              {t.language.english}
            </Text>
          </View>

          <View
            style={[
              styles.radio,
              {
                borderColor: colors.border,
              },
              language === 'en' && {
                borderColor: colors.text,
                backgroundColor: colors.text,
              },
            ]}
          >
            {language === 'en' && (
              <View
                style={[
                  styles.radioInner,
                  {
                    backgroundColor: colors.surface,
                  },
                ]}
              />
            )}
          </View>
        </Pressable>

        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.border,
            },
          ]}
        />

        <Pressable
          style={[
            styles.optionButton,
            language === 'pl' && {
              backgroundColor: colors.background,
              borderColor: colors.text,
            },
          ]}
          onPress={() => setLanguage('pl')}
        >
          <View style={styles.optionLeft}>
            <Text style={styles.flag}>🇵🇱</Text>

            <Text
              style={[
                styles.optionText,
                {
                  color: colors.text,
                },
              ]}
            >
              {t.language.polish}
            </Text>
          </View>

          <View
            style={[
              styles.radio,
              {
                borderColor: colors.border,
              },
              language === 'pl' && {
                borderColor: colors.text,
                backgroundColor: colors.text,
              },
            ]}
          >
            {language === 'pl' && (
              <View
                style={[
                  styles.radioInner,
                  {
                    backgroundColor: colors.surface,
                  },
                ]}
              />
            )}
          </View>
        </Pressable>
      </View>

      {/* Appearance */}

      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
          },
        ]}
      >
        {t.settings.appearance}
      </Text>

      <Pressable
        style={[
          styles.themeCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
        onPress={toggleTheme}
      >
        <View style={styles.themeLeft}>
          <View
            style={[
              styles.themeIcon,
              {
                backgroundColor: colors.background,
              },
            ]}
          >
            <Text style={styles.themeEmoji}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </Text>
          </View>

          <View style={styles.themeInfo}>
            <Text
              style={[
                styles.themeText,
                {
                  color: colors.text,
                },
              ]}
            >
              {theme === 'dark' ? t.settings.darkMode : t.settings.lightMode}
            </Text>

            <Text
              style={[
                styles.themeDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {theme === 'dark'
                ? t.settings.darkAppearance
                : t.settings.lightAppearance}
            </Text>
          </View>
        </View>

        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{
            false: colors.border,
            true: colors.textSecondary,
          }}
          thumbColor={theme === 'dark' ? colors.text : colors.surface}
        />
      </Pressable>

      {/* Delete */}

      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
          },
        ]}
      >
        {t.settings.deleteAllTasks}
      </Text>

      <View
        style={[
          styles.deleteCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.deleteDescription,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {t.settings.deleteAllTasksMessage}
        </Text>

        <Button
          title={t.settings.deleteAllTasks}
          onPress={handleClearAllTasks}
          variant='danger'
          disabled={tasks.length === 0}
        />
      </View>
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
    marginBottom: spacing.md,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },

  settingsCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },

  optionButton: {
    minHeight: 64,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'transparent',
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flag: {
    fontSize: 24,
    marginRight: spacing.md,
  },

  optionText: {
    fontSize: fontSize.md,
    fontWeight: '500',
  },

  divider: {
    height: 1,
    marginLeft: spacing.md,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  themeCard: {
    minHeight: 76,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  themeIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  themeEmoji: {
    fontSize: 22,
  },

  themeInfo: {
    flex: 1,
  },

  themeText: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },

  themeDescription: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
  },

  deleteCard: {
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },

  deleteDescription: {
    marginBottom: spacing.md,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
});
