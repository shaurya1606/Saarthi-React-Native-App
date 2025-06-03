import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Feedback from './Feedback';

interface User {
  name: string;
  email: string;
  rewardPoints: number;
  totalOrders: number;
}

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const router = useRouter();
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Add any logout logic here (clear tokens, user data, etc.)
            router.replace('/');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.rewardPoints}</Text>
          <Text style={styles.statLabel}>Reward Points</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.totalOrders}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
      </View>

      {/* Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(profile)/edit')}
        >
          <Text style={styles.actionText}>Edit Profile</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(profile)/notifications')}
        >
          <Text style={styles.actionText}>Notification Preferences</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(profile)/privacy')}
        >
          <Text style={styles.actionText}>Privacy Settings</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(profile)/help')}
        >
          <Text style={styles.actionText}>Help Center</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(profile)/contact')}
        >
          <Text style={styles.actionText}>Contact Support</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(profile)/terms')}
        >
          <Text style={styles.actionText}>Terms & Conditions</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(profile)/suggestion')}
        >
          <Text style={styles.actionText}>Suggestion Form</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setIsFeedbackVisible(true)}
        >
          <Text style={styles.actionText}>Give Feedback</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Feedback
        isVisible={isFeedbackVisible}
        onClose={() => setIsFeedbackVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF1493',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFE4E1',
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#FFF',
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionText: {
    fontSize: 16,
    color: '#000',
  },
  actionArrow: {
    fontSize: 18,
    color: '#666',
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#FF1493',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
}); 