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

interface PrivacyOptions {
  shareHealthData: boolean;
  shareLocation: boolean;
  allowAnalytics: boolean;
  marketingEmails: boolean;
  showProfilePublic: boolean;
}

interface PrivacySettingsProps {
  initialSettings?: PrivacyOptions;
}

export default function PrivacySettings({ initialSettings }: PrivacySettingsProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<PrivacyOptions>(initialSettings || {
    shareHealthData: false,
    shareLocation: true,
    allowAnalytics: true,
    marketingEmails: false,
    showProfilePublic: false,
  });

  const handleToggle = (key: keyof PrivacyOptions) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the privacy settings
    Alert.alert(
      'Success',
      'Privacy settings updated successfully!',
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
          <Text style={styles.sectionTitle}>Data Sharing</Text>
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingText}>Share Health Data</Text>
              <Text style={styles.settingDescription}>
                Allow sharing of health-related data for personalized recommendations
              </Text>
            </View>
            <Switch
              value={settings.shareHealthData}
              onValueChange={() => handleToggle('shareHealthData')}
              trackColor={{ false: '#D3D3D3', true: '#FF69B4' }}
              thumbColor={settings.shareHealthData ? '#FF1493' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingText}>Location Services</Text>
              <Text style={styles.settingDescription}>
                Enable location sharing for nearby vending machines
              </Text>
            </View>
            <Switch
              value={settings.shareLocation}
              onValueChange={() => handleToggle('shareLocation')}
              trackColor={{ false: '#D3D3D3', true: '#FF69B4' }}
              thumbColor={settings.shareLocation ? '#FF1493' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Privacy</Text>
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingText}>Public Profile</Text>
              <Text style={styles.settingDescription}>
                Make your profile visible to other users
              </Text>
            </View>
            <Switch
              value={settings.showProfilePublic}
              onValueChange={() => handleToggle('showProfilePublic')}
              trackColor={{ false: '#D3D3D3', true: '#FF69B4' }}
              thumbColor={settings.showProfilePublic ? '#FF1493' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communications</Text>
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingText}>Marketing Emails</Text>
              <Text style={styles.settingDescription}>
                Receive promotional emails and offers
              </Text>
            </View>
            <Switch
              value={settings.marketingEmails}
              onValueChange={() => handleToggle('marketingEmails')}
              trackColor={{ false: '#D3D3D3', true: '#FF69B4' }}
              thumbColor={settings.marketingEmails ? '#FF1493' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Analytics</Text>
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingText}>Usage Analytics</Text>
              <Text style={styles.settingDescription}>
                Help improve the app by sharing usage data
              </Text>
            </View>
            <Switch
              value={settings.allowAnalytics}
              onValueChange={() => handleToggle('allowAnalytics')}
              trackColor={{ false: '#D3D3D3', true: '#FF69B4' }}
              thumbColor={settings.allowAnalytics ? '#FF1493' : '#f4f3f4'}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    maxWidth: '80%',
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