import React from 'react';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import FloatingChatButton from '../../components/FloatingChatButton';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFF',
            borderTopWidth: 1,
            borderTopColor: '#F0F0F0',
          },
          tabBarActiveTintColor: '#FF1493',
          tabBarInactiveTintColor: '#666',
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🏠</Text>,
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: 'Products',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📦</Text>,
          }}
        />
        <Tabs.Screen
          name="scanner"
          options={{
            title: 'Scan',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📱</Text>,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📋</Text>,
          }}
        />
        <Tabs.Screen
          name="articles"
          options={{
            title: 'Articles',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📚</Text>,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Map',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📍</Text>,
          }}
        />
      </Tabs>
      <FloatingChatButton />
    </View>
  );
} 