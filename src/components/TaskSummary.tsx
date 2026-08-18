import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '../constants/theme';

import { useLanguage } from '../context/LanguageContext';

type TaskSummaryProps = {
  totalTasks: number;
  completedTasks: number;
};

export default function TaskSummary({
  totalTasks,
  completedTasks,
}: TaskSummaryProps) {
  const { t } = useLanguage();

  const progress = totalTasks === 0 ? 0 : completedTasks / totalTasks;

  const percentage = Math.round(progress * 100);

  return (
    <View>
      <Text style={styles.title}>{t.home.todaysTasks}</Text>

      <Text style={styles.counter}>
        {totalTasks} {totalTasks === 1 ? t.home.task : t.home.tasks}
        {' · '}
        {completedTasks} {t.home.completed}
      </Text>

      <View style={styles.progressBackground}>
        <View style={[styles.progress, { width: `${percentage}%` }]} />
      </View>

      <Text style={styles.percentage}>
        {percentage}% {t.home.complete}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
  },

  counter: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },

  progressBackground: {
    height: 8,
    marginTop: spacing.md,
    borderRadius: radius.sm,
    overflow: 'hidden',
    backgroundColor: '#eeeeee',
  },

  progress: {
    height: '100%',
    borderRadius: radius.sm,
    backgroundColor: colors.text,
  },

  percentage: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    paddingBottom: spacing.sm,
  },
});
