import { Pressable, StyleSheet, Text } from 'react-native';

import { fontSize, radius, spacing } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole='button'
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.text,
        },
        pressed && !disabled && styles.pressedButton,

        variant === 'secondary' && {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },

        variant === 'danger' && {
          backgroundColor: colors.danger,
        },

        disabled && {
          backgroundColor: colors.border,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.surface,
          },

          variant === 'secondary' && {
            color: colors.text,
          },

          variant === 'danger' && {
            color: colors.surface,
          },

          disabled && {
            color: colors.textMuted,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
  },

  text: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },

  pressedButton: {
    opacity: 0.7,
  },
});
