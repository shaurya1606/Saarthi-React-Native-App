import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import NotificationPreferences from '../../components/NotificationPreferences';

// Sample initial settings - you should replace this with actual user settings from your auth context
const sampleSettings = {
  orderUpdates: true,
  promotions: false,
  healthReminders: true,
  periodTracking: true,
  productAvailability: false,
};

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Notification Preferences</Text>
        <View style={styles.placeholder} />
      </View>
      <NotificationPreferences initialSettings={sampleSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  header: {
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
}); 