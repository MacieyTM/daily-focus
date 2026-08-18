import { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, fontSize, radius, spacing } from '../constants/theme';

import { useLanguage } from '../context/LanguageContext';

type TaskItemProps = {
  title: string;
  completed: boolean;
  onPress: () => void;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
};

const MAX_TASK_LENGTH = 50;

export default function TaskItem({
  title,
  completed,
  onPress,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const { t } = useLanguage();

  const isSaveDisabled = editedTitle.trim() === '';

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        `${t.task.deleteTaskMessage.replace('{{title}}', title)}`,
      );

      if (confirmed) {
        onDelete();
      }

      return;
    }

    Alert.alert(
      t.task.deleteTaskTitle,
      t.task.deleteTaskMessage.replace('{{title}}', title),
      [
        {
          text: t.task.cancel,
          style: 'cancel',
        },
        {
          text: t.task.delete,
          style: 'destructive',
          onPress: onDelete,
        },
      ],
    );
  };

  const cancelEdit = () => {
    setEditedTitle(title);
    setIsEditing(false);
  };

  const saveEdit = () => {
    if (isSaveDisabled) {
      return;
    }

    const trimmedTitle = editedTitle.trim();

    onEdit(trimmedTitle);
    setEditedTitle(trimmedTitle);
    setIsEditing(false);
  };

  const startEditing = () => {
    setEditedTitle(title);
    setIsEditing(true);
    setShowActions(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskRow}>
        <Pressable style={styles.task} onPress={onPress}>
          <View
            style={[styles.checkbox, completed && styles.checkboxCompleted]}
          >
            {completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </Pressable>

        {isEditing ? (
          <View style={styles.editContent}>
            <View style={styles.editInputWrapper}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    Platform.OS === 'web' && {
                      outlineColor: colors.text,
                      outlineStyle: 'solid',
                      outlineWidth: 1,
                    },
                  ]}
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                  maxLength={MAX_TASK_LENGTH}
                  autoFocus
                />

                {editedTitle.length > 0 && (
                  <Pressable
                    style={styles.clearButton}
                    onPress={() => setEditedTitle('')}
                    accessibilityRole='button'
                    accessibilityLabel={t.task.clear}
                  >
                    <Text style={styles.clearText}>×</Text>
                  </Pressable>
                )}
              </View>

              <Text style={styles.characterCount}>
                {editedTitle.length}/{MAX_TASK_LENGTH}
              </Text>
            </View>

            <View style={styles.editActions}>
              <Pressable
                style={styles.actionButton}
                onPress={cancelEdit}
                accessibilityRole='button'
              >
                <Text style={styles.cancelText} numberOfLines={1}>
                  {t.task.cancel}
                </Text>
              </Pressable>

              <Pressable
                disabled={isSaveDisabled}
                style={[
                  styles.actionButton,
                  isSaveDisabled && styles.disabledActionButton,
                ]}
                onPress={saveEdit}
                accessibilityRole='button'
                accessibilityState={{ disabled: isSaveDisabled }}
              >
                <Text
                  style={[
                    styles.editText,
                    isSaveDisabled && styles.disabledActionText,
                  ]}
                  numberOfLines={1}
                >
                  {t.task.save}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Text style={[styles.taskText, completed && styles.taskCompleted]}>
            {title}
          </Text>
        )}

        {!isEditing && (
          <Pressable
            style={styles.moreButton}
            onPress={() => setShowActions((current) => !current)}
            accessibilityRole='button'
            accessibilityLabel={t.task.actionsFor.replace('{{title}}', title)}
          >
            <Text style={styles.moreText}>⋮</Text>
          </Pressable>
        )}
      </View>

      {showActions && !isEditing && (
        <View style={styles.actions}>
          <Pressable
            style={styles.actionButton}
            onPress={startEditing}
            accessibilityRole='button'
          >
            <Text style={styles.editText}>{t.task.edit}</Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={handleDelete}
            accessibilityRole='button'
          >
            <Text style={styles.deleteText}>{t.task.delete}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  task: {
    marginRight: 12,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  checkboxCompleted: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },

  checkmark: {
    color: colors.surface,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
  },

  taskCompleted: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },

  input: {
    width: '100%',
    paddingVertical: spacing.sm,
    paddingLeft: spacing.md,
    paddingRight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },

  editText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },

  cancelText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },

  deleteText: {
    color: colors.danger,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },

  disabledActionButton: {
    opacity: 0.5,
  },

  disabledActionText: {
    color: colors.textMuted,
  },

  moreButton: {
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },

  moreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  editContent: {
    flex: 1,
    minWidth: 0,
  },

  inputWrapper: {
    position: 'relative',
    minWidth: 0,
  },

  editInputWrapper: {
    width: '100%',
  },

  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.xs,
  },

  actionButton: {
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    flexShrink: 0,
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  taskText: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    fontSize: fontSize.md,
    lineHeight: 22,
    color: colors.text,
  },

  clearButton: {
    position: 'absolute',
    right: spacing.sm,
    top: 0,
    bottom: 0,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearText: {
    fontSize: 26,
    lineHeight: 28,
    color: colors.textMuted,
  },

  characterCount: {
    marginTop: spacing.xs,
    textAlign: 'right',
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
});
