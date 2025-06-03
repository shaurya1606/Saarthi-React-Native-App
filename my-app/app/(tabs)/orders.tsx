import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';

const ORDERS = [
  {
    id: '1',
    date: '20 Apr 2024',
    time: '14:30',
    items: [
      { name: 'Whisper Ultra Clean', quantity: 2 },
      { name: 'Stayfree Secure XL', quantity: 1 },
    ],
    total: '₹130',
    status: 'Delivered',
    location: 'CS/IT Block - First Floor',
  },
  {
    id: '2',
    date: '15 Apr 2024',
    time: '11:45',
    items: [
      { name: 'Sofy Antibacterial', quantity: 1 },
      { name: 'Whisper Choice', quantity: 2 },
    ],
    total: '₹120',
    status: 'Delivered',
    location: 'ECE Block - Ground Floor',
  },
  {
    id: '3',
    date: '10 Apr 2024',
    time: '09:15',
    items: [
      { name: 'Stayfree All Night', quantity: 2 },
    ],
    total: '₹84',
    status: 'Delivered',
    location: 'Mechanical Block - Second Floor',
  },
];

const OrderCard = ({ order }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View>
        <Text style={styles.dateText}>{order.date}</Text>
        <Text style={styles.timeText}>{order.time}</Text>
      </View>
      <Text style={[
        styles.statusText,
        order.status === 'Delivered' && styles.deliveredText
      ]}>
        {order.status}
      </Text>
    </View>

    <View style={styles.itemsList}>
      {order.items.map((item, index) => (
        <Text key={index} style={styles.itemText}>
          {item.quantity}x {item.name}
        </Text>
      ))}
    </View>

    <View style={styles.cardFooter}>
      <Text style={styles.locationText}>{order.location}</Text>
      <Text style={styles.totalText}>{order.total}</Text>
    </View>
  </View>
);

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Your Orders</Text>

        <FlatList
          data={ORDERS}
          renderItem={({ item }) => <OrderCard order={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
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
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF69B4',
  },
  deliveredText: {
    color: '#4CAF50',
  },
  itemsList: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    paddingVertical: 12,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 16,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1493',
  },
}); 