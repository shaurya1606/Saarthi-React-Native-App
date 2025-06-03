import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from '../../components/Header';

const { width } = Dimensions.get('window');

const LOCATIONS = {
  'Ground Floor': ['W-1', 'W-2'],
  'First Floor': ['W-1', 'W-2', 'W-3'],
  'Second Floor': ['W-1', 'W-2', 'W-3'],
};

const MapMarker = ({ label, style }) => (
  <View style={[styles.mapMarker, style]}>
    <Text style={styles.mapMarkerText}>📍</Text>
    <Text style={styles.mapMarkerLabel}>{label}</Text>
  </View>
);

export default function MapScreen() {
  const [selectedLocation, setSelectedLocation] = useState('CS/IT Block');

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Find Vending Machine</Text>

        <View style={styles.mapContainer}>
          {/* Simple Map View */}
          <View style={styles.map}>
            <MapMarker label="Mechanical Block" style={styles.mechanicalMarker} />
            <MapMarker label="Civil Block" style={styles.civilMarker} />
            <MapMarker label="ECE Block" style={styles.eceMarker} />
            <View style={styles.selectedMarker}>
              <Text style={styles.selectedMarkerText}>📍</Text>
              <Text style={styles.selectedMarkerLabel}>CS/IT Block</Text>
              <View style={styles.personIcon}>
                <Text>👤</Text>
              </View>
            </View>
          </View>

          {/* Location Details */}
          <View style={styles.locationDetails}>
            <Text style={styles.locationTitle}>{selectedLocation}</Text>
            
            <View style={styles.floorContainer}>
              {Object.entries(LOCATIONS).map(([floor, machines]) => (
                <View key={floor} style={styles.floorSection}>
                  <Text style={styles.floorTitle}>{floor}</Text>
                  <View style={styles.machineList}>
                    {machines.map((machine) => (
                      <Text key={machine} style={styles.machineText}>
                        {machine}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: width * 0.8,
    backgroundColor: '#E8E8E8',
    borderRadius: 12,
    marginBottom: 20,
    position: 'relative',
  },
  mapMarker: {
    position: 'absolute',
    alignItems: 'center',
  },
  mapMarkerText: {
    fontSize: 24,
    color: '#666',
  },
  mapMarkerLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  mechanicalMarker: {
    top: '30%',
    left: '20%',
  },
  civilMarker: {
    top: '20%',
    right: '30%',
  },
  eceMarker: {
    top: '50%',
    left: '45%',
  },
  selectedMarker: {
    position: 'absolute',
    top: '60%',
    left: '35%',
    alignItems: 'center',
  },
  selectedMarkerText: {
    fontSize: 32,
    color: '#FF1493',
  },
  selectedMarkerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 2,
  },
  personIcon: {
    marginTop: 4,
    fontSize: 20,
  },
  locationDetails: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  floorContainer: {
    flex: 1,
  },
  floorSection: {
    marginBottom: 16,
  },
  floorTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  machineList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  machineText: {
    fontSize: 14,
    color: '#000',
    backgroundColor: '#F0F0F0',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
}); 