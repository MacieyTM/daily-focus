import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { TaskProvider } from '../context/TaskContext';

function AppTabs() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#111',
        tabBarInactiveTintColor: '#999',
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
    <LanguageProvider>
      <TaskProvider>
        <AppTabs />
      </TaskProvider>
    </LanguageProvider>
  );
}
