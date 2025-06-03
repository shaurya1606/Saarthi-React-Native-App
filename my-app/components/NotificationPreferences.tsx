import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';

interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  healthReminders: boolean;
  periodTracking: boolean;
  productAvailability: boolean;
}

interface NotificationPreferencesProps {
  initialSettings?: NotificationSettings;
}

export default function NotificationPreferences({ initialSettings }: NotificationPreferencesProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSettings>(initialSettings || {
    orderUpdates: true,
    promotions: true,
    healthReminders: true,
    periodTracking: true,
    productAvailability: true,
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the notification settings
    Alert.alert(
      'Success',
      'Notification preferences updated successfully!',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Notifications</Text>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Order Updates</Text>
            <Switch
              value={settings.orderUpdates}
              onValueChange={() => handleToggle('orderUpdates')}
              trackColor={{ false: '#D3D3D3', true: '#FF69B4' }}
              thumbColor={settings.orderUpdates ? '#FF1493' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health & Tracking</Text>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Health Reminders</Text>
            <Switch
              value={settings.healthReminders}
              onValueChange={() => handleToggle('healthReminders')}
              trackColor={{ false: '#D3D3D3', true: '#FF69B4' }}
              thumbColor={settings.healthReminders ? '#FF1493' : '#f4f3f4'}
            />
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Period Tracking Updates</Text>
            <Switch
              value={settings.periodTracking}
              onValueChange={() => handleToggle('periodTracking')}
              trackColor={{ false: '#D3D3D3', true: '#FF69B4' }}
              thumbColor={settings.periodTracking ? '#FF1493' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products & Promotions</Text>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Promotional Offers</Text>
            <Switch
              value={settings.promotions}
              onValueChange={() => handleToggle('promotions')}
              trackColor={{ false: '#D3D3D3', true: '#FF69B4' }}
              thumbColor={settings.promotions ? '#FF1493' : '#f4f3f4'}
            />
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Product Availability</Text>
            <Switch
              value={settings.productAvailability}
              onValueChange={() => handleToggle('productAvailability')}
              trackColor={{ false: '#D3D3D3', true: '#FF69B4' }}
              thumbColor={settings.productAvailability ? '#FF1493' : '#f4f3f4'}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  preferenceText: {
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#FF1493',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 