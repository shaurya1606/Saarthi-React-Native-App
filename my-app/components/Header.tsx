import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>SAARTHI</Text>
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => router.push('/profile')}
      >
        <Text style={styles.profileText}>👤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#FFE4E1',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FF69B4',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  profileText: {
    fontSize: 20,
  },
}); 