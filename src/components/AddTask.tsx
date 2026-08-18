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

import Button from './Button';

type AddTaskProps = {
  value: string;
  onChangeText: (value: string) => void;
  onAdd: () => void;
};

const MAX_TASK_LENGTH = 50;

export default function AddTask({ value, onChangeText, onAdd }: AddTaskProps) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const isAddDisabled = value.trim() === '';

  const handleSubmit = () => {
    if (isAddDisabled) {
      return;
    }

    onAdd();
  };

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
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
          placeholder={t.addTask.placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          returnKeyType='done'
          maxLength={MAX_TASK_LENGTH}
        />

        {value.length > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={handleClear}
            accessibilityRole='button'
            accessibilityLabel={t.addTask.clear}
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
        {value.length}/{MAX_TASK_LENGTH}
      </Text>

      <Button title={t.addTask.add} onPress={onAdd} disabled={isAddDisabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },

  inputWrapper: {
    position: 'relative',
  },

  input: {
    padding: spacing.md,
    paddingRight: 44,
    borderWidth: 1,
    borderRadius: radius.md,
    fontSize: fontSize.md,
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
