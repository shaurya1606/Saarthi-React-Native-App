import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';

interface OrderItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  details?: {
    scent?: string;
    size?: string;
    flow?: string;
    rewardPoints?: number;
  };
}

interface Machine {
  id: string;
  location: string;
}

export default function OrderSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const orderItems: OrderItem[] = JSON.parse(params.items as string);
  const machine: Machine = JSON.parse(params.machine as string);
  const totalAmount = parseInt(params.totalAmount as string);
  const totalItems = parseInt(params.totalItems as string);

  const handlePayment = () => {
    // TODO: Implement payment integration
    router.push('/(tabs)/orders');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Order Summary',
          headerStyle: {
            backgroundColor: '#FFE4E1',
          },
          headerTintColor: '#FF1493',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />

      <ScrollView style={styles.content}>
        {/* Machine Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vending Machine Details</Text>
          <View style={styles.card}>
            <Text style={styles.machineId}>Machine ID: {machine.id}</Text>
            <Text style={styles.machineLocation}>{machine.location}</Text>
          </View>
        </View>

        {/* Selected Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Products</Text>
          {orderItems.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.productHeader}>
                <View style={styles.productImage}>
                  <Text style={styles.productEmoji}>📦</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  {item.details?.size && (
                    <Text style={styles.productDetail}>Size: {item.details.size}</Text>
                  )}
                </View>
              </View>
              <View style={styles.productFooter}>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.quantity}>x{item.quantity}</Text>
                </View>
                {item.details?.rewardPoints && (
                  <Text style={styles.rewardPoints}>
                    +{item.details.rewardPoints * item.quantity} Points
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.card}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Items</Text>
              <Text style={styles.summaryValue}>{totalItems}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.summaryValue}>Rs. {totalAmount}/-</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Reward Points</Text>
              <Text style={styles.summaryValue}>
                +{orderItems.reduce((sum, item) => sum + (item.details?.rewardPoints || 0) * item.quantity, 0)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
          <Text style={styles.paymentAmount}>Rs. {totalAmount}/-</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  machineId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 4,
  },
  machineLocation: {
    fontSize: 14,
    color: '#666',
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: '#FFE4E1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productEmoji: {
    fontSize: 24,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  productDetail: {
    fontSize: 14,
    color: '#666',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1493',
    marginRight: 8,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  rewardPoints: {
    fontSize: 12,
    color: '#4CAF50',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  paymentButton: {
    backgroundColor: '#FF1493',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
}); 