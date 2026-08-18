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
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Home',
          }}
        />

        <Tabs.Screen
          name='settings'
          options={{
            title: 'Settings',
          }}
        />
      </Tabs>
    </TaskProvider>
  );
}
