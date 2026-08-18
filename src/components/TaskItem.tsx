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

type TaskItemProps = {
  title: string;
  completed: boolean;
  onPress: () => void;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
};

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

  const isSaveDisabled = editedTitle.trim() === '';

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        `Delete "${title}"?\n\nThis action cannot be undone.`,
      );

      if (confirmed) {
        onDelete();
      }

      return;
    }

    Alert.alert(
      'Delete task?',
      `Delete "${title}"? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
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
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            autoFocus
          />
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
            accessibilityLabel={`Actions for ${title}`}
          >
            <Text style={styles.moreText}>⋮</Text>
          </Pressable>
        )}

        {isEditing && (
          <View style={styles.editActions}>
            <Pressable
              style={styles.actionButton}
              onPress={cancelEdit}
              accessibilityRole='button'
            >
              <Text style={styles.cancelText}>Cancel</Text>
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
              >
                Save
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {showActions && !isEditing && (
        <View style={styles.actions}>
          <Pressable
            style={styles.actionButton}
            onPress={startEditing}
            accessibilityRole='button'
          >
            <Text style={styles.editText}>Edit</Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={handleDelete}
            accessibilityRole='button'
          >
            <Text style={styles.deleteText}>Delete</Text>
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

  taskText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },

  taskCompleted: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },

  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },

  actionButton: {
    marginLeft: 8,
    paddingHorizontal: 4,
    paddingVertical: 6,
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

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
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

  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
