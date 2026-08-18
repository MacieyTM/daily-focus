import { Platform, StyleSheet, TextInput, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '../constants/theme';

import Button from './Button';

type AddTaskProps = {
  value: string;
  onChangeText: (value: string) => void;
  onAdd: () => void;
};

export default function AddTask({ value, onChangeText, onAdd }: AddTaskProps) {
  const isAddDisabled = value.trim() === '';

  const handleSubmit = () => {
    if (isAddDisabled) {
      return;
    }

    onAdd();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          Platform.OS === 'web' && {
            outlineColor: colors.text,
            outlineStyle: 'solid',
            outlineWidth: 1,
          },
        ]}
        placeholder='Enter a task...'
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmit}
        returnKeyType='done'
      />

      <Button title='Add task' onPress={onAdd} disabled={isAddDisabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },

  input: {
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },
});
