import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { fontSize, radius, spacing } from '../constants/theme';

import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

import ConfirmModal from './ConfirmModal';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { colors } = useTheme();
  const { t } = useLanguage();

  const isSaveDisabled = editedTitle.trim() === '';

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    onDelete();
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.taskRow}>
        <Pressable style={styles.task} onPress={onPress}>
          <View
            style={[
              styles.checkbox,
              {
                borderColor: colors.border,
              },
              completed && {
                backgroundColor: colors.text,
                borderColor: colors.text,
              },
            ]}
          >
            {completed && (
              <Text
                style={[
                  styles.checkmark,
                  {
                    color: colors.surface,
                  },
                ]}
              >
                ✓
              </Text>
            )}
          </View>
        </Pressable>

        {isEditing ? (
          <View style={styles.editContent}>
            <View style={styles.editInputWrapper}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
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
                    <Text
                      style={[
                        styles.clearText,
                        {
                          color: colors.textMuted,
                        },
                      ]}
                    >
                      ×
                    </Text>
                  </Pressable>
                )}
              </View>

              <Text
                style={[
                  styles.characterCount,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                {editedTitle.length}/{MAX_TASK_LENGTH}
              </Text>
            </View>

            <View
              style={[
                styles.editActions,
                {
                  borderTopColor: colors.border,
                },
              ]}
            >
              <Pressable
                style={styles.actionButton}
                onPress={cancelEdit}
                accessibilityRole='button'
              >
                <Text
                  style={[
                    styles.cancelText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                  numberOfLines={1}
                >
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
                    {
                      color: colors.text,
                    },
                    isSaveDisabled && {
                      color: colors.textMuted,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {t.task.save}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Text
            style={[
              styles.taskText,
              {
                color: colors.text,
              },
              completed && {
                color: colors.textMuted,
                textDecorationLine: 'line-through',
              },
            ]}
          >
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
            <Text
              style={[
                styles.moreText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              ⋮
            </Text>
          </Pressable>
        )}
      </View>

      {showActions && !isEditing && (
        <View
          style={[
            styles.actions,
            {
              borderTopColor: colors.border,
            },
          ]}
        >
          <Pressable
            style={styles.actionButton}
            onPress={startEditing}
            accessibilityRole='button'
          >
            <Text
              style={[
                styles.editText,
                {
                  color: colors.text,
                },
              ]}
            >
              {t.task.edit}
            </Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={handleDelete}
            accessibilityRole='button'
          >
            <Text
              style={[
                styles.deleteText,
                {
                  color: colors.danger,
                },
              ]}
            >
              {t.task.delete}
            </Text>
          </Pressable>
        </View>
      )}
      
      <ConfirmModal
        visible={showDeleteModal}
        title={t.task.deleteTaskTitle}
        message={t.task.deleteTaskMessage.replace('{{title}}', title)}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
  },

  task: {
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkmark: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
  },

  input: {
    width: '100%',
    paddingVertical: spacing.sm,
    paddingLeft: spacing.md,
    paddingRight: 44,
    borderWidth: 1,
    borderRadius: radius.sm,
    fontSize: fontSize.md,
  },

  editText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },

  cancelText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },

  deleteText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },

  disabledActionButton: {
    opacity: 0.5,
  },

  moreButton: {
    width: 40,
    height: 40,
    marginLeft: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  moreText: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
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
    alignItems: 'center',
  },

  taskText: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    fontSize: fontSize.md,
    lineHeight: 22,
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
  },

  characterCount: {
    marginTop: spacing.xs,
    textAlign: 'right',
    fontSize: fontSize.sm,
  },
});
