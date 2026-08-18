import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { TaskProvider } from '../context/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#111',
          tabBarInactiveTintColor: '#999',
          // tabBarIcon: () => null,
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home-outline' size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name='settings'
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='settings-outline' size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </TaskProvider>
  );
}
