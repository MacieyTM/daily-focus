import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { TaskProvider, useTasks } from '../context/TaskContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function AppContent() {
  const { t, isLanguageLoaded } = useLanguage();
  const { isLoaded: areTasksLoaded } = useTasks();
  const { colors, theme, isThemeLoaded } = useTheme();

  if (!isLanguageLoaded || !areTasksLoaded || !isThemeLoaded) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size='large' color={colors.text} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,

        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },

        tabBarLabelStyle: {
          color: colors.text,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: t.tabs.home,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home-outline' size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: t.tabs.settings,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings-outline' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
