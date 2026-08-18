import { StyleSheet, Text, View } from 'react-native';

import { fontSize, radius, spacing } from '../constants/theme';

import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

import { getPolishTaskWord } from '../constants/translations';

type TaskSummaryProps = {
  totalTasks: number;
  completedTasks: number;
};

export default function TaskSummary({
  totalTasks,
  completedTasks,
}: TaskSummaryProps) {
  const { colors } = useTheme();
  const { language, t } = useLanguage();

  const progress = totalTasks === 0 ? 0 : completedTasks / totalTasks;

  const percentage = Math.round(progress * 100);

  const taskWord =
    language === 'pl'
      ? getPolishTaskWord(totalTasks)
      : totalTasks === 1
        ? t.home.task
        : t.home.tasks;

  return (
    <View>
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        {t.home.todaysTasks}
      </Text>

      <Text
        style={[
          styles.counter,
          {
            color: colors.textMuted,
          },
        ]}
      >
        {totalTasks} {taskWord}
        {' · '}
        {completedTasks}{' '}
        {language === 'pl'
          ? completedTasks === 1
            ? 'ukończone'
            : 'ukończonych'
          : t.home.completed}
      </Text>

      <View
        style={[
          styles.progressBackground,
          {
            backgroundColor: colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.progress,
            {
              width: `${percentage}%`,
              backgroundColor: colors.text,
            },
          ]}
        />
      </View>

      <Text
        style={[
          styles.percentage,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {percentage}% {t.home.complete}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
  },

  counter: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
  },

  progressBackground: {
    height: 8,
    marginTop: spacing.md,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },

  progress: {
    height: '100%',
    borderRadius: radius.sm,
  },

  percentage: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    paddingBottom: spacing.sm,
  },
});
