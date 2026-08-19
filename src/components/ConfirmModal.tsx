import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { fontSize, radius, spacing } from '../constants/theme';

import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />

        <View
          style={[
            styles.modal,
            {
              backgroundColor: colors.surface,
            },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.danger + '18',
              },
            ]}
          >
            <Ionicons name='trash-outline' size={24} color={colors.danger} />
          </View>

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.message,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {message}
          </Text>

          <View style={styles.actions}>
            <Pressable
              style={[
                styles.button,
                styles.cancelButton,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                },
              ]}
              onPress={onCancel}
              accessibilityRole='button'
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {t.task.cancel}
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                styles.deleteButton,
                {
                  backgroundColor: colors.danger,
                },
              ]}
              onPress={onConfirm}
              accessibilityRole='button'
            >
              <Ionicons name='trash-outline' size={17} color={colors.surface} />

              <Text
                style={[
                  styles.buttonText,
                  {
                    color: colors.surface,
                  },
                ]}
              >
                {t.task.delete}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },

  modal: {
    width: '100%',
    maxWidth: 420,
    padding: spacing.xl,
    borderRadius: radius.xl,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },

  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
  },

  message: {
    marginTop: spacing.sm,
    fontSize: fontSize.md,
    lineHeight: 22,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },

  button: {
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },

  cancelButton: {
    borderWidth: 1,
  },

  deleteButton: {
    minWidth: 100,
  },

  buttonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
