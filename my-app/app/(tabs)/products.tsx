import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

// Mock machine data
const MACHINES = [
  { id: 'M001', location: 'Girls Hostel Block A' },
  { id: 'M002', location: 'Girls Hostel Block B' },
  { id: 'M003', location: 'Academic Block Ground Floor' },
  { id: 'M004', location: 'Academic Block First Floor' },
  { id: 'M005', location: 'Library Building' },
];

interface Article {
  id: string;
  title: string;
  description: string;
  price: string;
  itemsLeft: number;
  details?: {
    scent?: string;
    size?: string;
    flow?: string;
    rewardPoints?: number;
  };
}

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Whisper Regular Pad',
    description: '30 Units',
    price: 'Rs.256/-',
    itemsLeft: 7,
    details: {
      scent: 'Fresh Flower Scent, Protects From Stains',
      size: 'Regular',
      flow: 'Normal to Heavy',
      rewardPoints: 5,
    },
  },
  {
    id: '2',
    title: 'Mini Pads XL+',
    description: '30 Units',
    price: 'Rs.50/-',
    itemsLeft: 8,
    details: {
      size: 'XL+',
      flow: 'Light',
      rewardPoints: 2,
    },
  },
  {
    id: '3',
    title: 'Tampons - Sienna',
    description: '16 Units',
    price: 'Rs.264/-',
    itemsLeft: 4,
  },
  {
    id: '4',
    title: 'Tampons - Mid Flow',
    description: '20 Units',
    price: 'Rs.264/-',
    itemsLeft: 5,
  },
  {
    id: '5',
    title: 'Carefree Air Free',
    description: '30 Units',
    price: 'Rs.264/-',
    itemsLeft: 8,
  },
  {
    id: '6',
    title: 'Whisper Ultra XL+',
    description: '24 Units',
    price: 'Rs.264/-',
    itemsLeft: 7,
  },
];

interface CartItem extends Article {
  quantity: number;
}

const ArticleCard = ({ 
  article, 
  onAdd, 
  cartItem,
  onShowDetails,
  remainingItems 
}: { 
  article: Article;
  onAdd: (item: Article, quantity: number) => void;
  cartItem?: CartItem;
  onShowDetails: (item: Article) => void;
  remainingItems: number;
}) => (
  <TouchableOpacity 
    style={[styles.card, remainingItems === 0 && styles.disabledCard]} 
    onPress={() => remainingItems > 0 && onShowDetails(article)}
  >
    <View style={styles.imageContainer}>
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>📦</Text>
      </View>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.description}>{article.description}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{article.price}</Text>
        <Text style={[
          styles.itemsLeft,
          remainingItems === 0 && styles.outOfStock
        ]}>
          {remainingItems === 0 ? 'Out of Stock' : `${remainingItems} items left`}
        </Text>
      </View>
      {!cartItem ? (
        <TouchableOpacity 
          style={[styles.addButton, remainingItems === 0 && styles.disabledButton]}
          onPress={(e) => {
            e.stopPropagation();
            if (remainingItems > 0) {
              onAdd(article, 1);
            }
          }}
          disabled={remainingItems === 0}
        >
          <Text style={styles.addButtonText}>
            {remainingItems === 0 ? 'OUT OF STOCK' : 'ADD'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.quantitySelector}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={(e) => {
              e.stopPropagation();
              onAdd(article, cartItem.quantity - 1);
            }}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{cartItem.quantity}</Text>
          <TouchableOpacity 
            style={[
              styles.quantityButton,
              remainingItems === 0 && styles.disabledButton
            ]}
            onPress={(e) => {
              e.stopPropagation();
              if (remainingItems > 0) {
                onAdd(article, cartItem.quantity + 1);
              }
            }}
            disabled={remainingItems === 0}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

export default function ProductsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState(MACHINES[0]);
  const [isMachineModalVisible, setIsMachineModalVisible] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Article | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [availableStock, setAvailableStock] = useState<{ [key: string]: number }>(
    ARTICLES.reduce((acc, article) => ({
      ...acc,
      [article.id]: article.itemsLeft
    }), {})
  );
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);

  const filteredProducts = ARTICLES.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item: Article, quantity: number) => {
    const currentCartItem = cart.find(cartItem => cartItem.id === item.id);
    const currentQuantity = currentCartItem?.quantity || 0;
    
    // If removing from cart
    if (quantity === 0) {
      setCart(cart.filter(cartItem => cartItem.id !== item.id));
      // Restore stock
      setAvailableStock(prev => ({
        ...prev,
        [item.id]: prev[item.id] + currentQuantity
      }));
      return;
    }

    // Check if we have enough stock for the requested quantity
    const quantityDiff = quantity - currentQuantity;
    const stockAvailable = availableStock[item.id];
    
    if (quantityDiff > 0 && stockAvailable < quantityDiff) {
      // Not enough stock
      return;
    }

    // Update cart
    if (currentCartItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }

    // Update available stock
    setAvailableStock(prev => ({
      ...prev,
      [item.id]: prev[item.id] - quantityDiff
    }));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  const handleProceedToPayment = () => {
    const orderItems = cart.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      details: item.details,
    }));

    const params = {
      items: JSON.stringify(orderItems),
      machine: JSON.stringify(selectedMachine),
      totalAmount: totalAmount.toString(),
      totalItems: totalItems.toString(),
    };

    router.push({
      pathname: '/screens/OrderSummaryScreen',
      params: params,
    });
  };

  const handleConfirmOrder = () => {
    // TODO: Implement payment integration
    router.push('/(tabs)/orders');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Products</Text>

        <TouchableOpacity 
          style={styles.machineSelector}
          onPress={() => setIsMachineModalVisible(true)}
        >
          <View style={styles.machineInfo}>
            <Text style={styles.machineLabel}>Machine ID:</Text>
            <Text style={styles.machineId}>{selectedMachine.id}</Text>
          </View>
          <Text style={styles.machineLocation}>{selectedMachine.location}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#666"
            />
          </View>
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <ArticleCard 
              article={item} 
              onAdd={handleAddToCart}
              cartItem={cart.find(cartItem => cartItem.id === item.id)}
              onShowDetails={setSelectedProduct}
              remainingItems={availableStock[item.id]}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: cart.length > 0 ? 120 : 16 }
          ]}
        />

        {/* Order Summary Modal */}
        <Modal
          visible={isOrderSummaryVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsOrderSummaryVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Order Summary</Text>
                <TouchableOpacity 
                  onPress={() => setIsOrderSummaryVisible(false)}
                  style={styles.modalCloseButton}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content}>
                {/* Machine Details */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Vending Machine Details</Text>
                  <View style={styles.machineCard}>
                    <Text style={styles.machineId}>Machine ID: {selectedMachine.id}</Text>
                    <Text style={styles.machineLocation}>{selectedMachine.location}</Text>
                  </View>
                </View>

                {/* Selected Products */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Selected Products</Text>
                  {cart.map((item) => (
                    <View key={item.id} style={styles.itemCard}>
                      <View style={styles.itemImageContainer}>
                        <View style={styles.placeholderBox}>
                          <Text style={styles.placeholderText}>📦</Text>
                        </View>
                      </View>
                      <View style={styles.itemDetails}>
                        <Text style={styles.title}>{item.title}</Text>
                        {item.details?.size && (
                          <Text style={styles.description}>Size: {item.details.size}</Text>
                        )}
                        <View style={styles.priceRow}>
                          <Text style={styles.price}>{item.price}</Text>
                          <Text style={styles.itemsLeft}>x{item.quantity}</Text>
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
                  <View style={styles.summaryCard}>
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
                        +{cart.reduce((sum, item) => sum + (item.details?.rewardPoints || 0) * item.quantity, 0)}
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={styles.confirmButton}
                  onPress={handleConfirmOrder}
                >
                  <Text style={styles.confirmButtonText}>Confirm Order</Text>
                  <Text style={styles.confirmAmount}>Rs. {totalAmount}/-</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {cart.length > 0 && (
          <View style={styles.cartSummary}>
            <View style={styles.cartInfo}>
              <Text style={styles.cartItems}>{totalItems} items</Text>
              <Text style={styles.cartTotal}>Rs. {totalAmount}/-</Text>
            </View>
            <TouchableOpacity 
              style={styles.proceedButton}
              onPress={handleProceedToPayment}
            >
              <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          visible={isMachineModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsMachineModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Machine</Text>
                <TouchableOpacity 
                  onPress={() => setIsMachineModalVisible(false)}
                  style={styles.modalCloseButton}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.machineList}>
                {MACHINES.map((machine) => (
                  <TouchableOpacity
                    key={machine.id}
                    style={[
                      styles.machineItem,
                      selectedMachine.id === machine.id && styles.selectedMachineItem
                    ]}
                    onPress={() => {
                      setSelectedMachine(machine);
                      setIsMachineModalVisible(false);
                    }}
                  >
                    <View style={styles.machineItemInfo}>
                      <Text style={[
                        styles.machineItemId,
                        selectedMachine.id === machine.id && styles.selectedMachineText
                      ]}>
                        {machine.id}
                      </Text>
                      <Text style={[
                        styles.machineItemLocation,
                        selectedMachine.id === machine.id && styles.selectedMachineText
                      ]}>
                        {machine.location}
                      </Text>
                    </View>
                    {selectedMachine.id === machine.id && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          visible={!!selectedProduct}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedProduct(null)}
        >
          <View style={styles.productModalContainer}>
            <View style={styles.productModalContent}>
              <TouchableOpacity 
                style={styles.productModalClose}
                onPress={() => setSelectedProduct(null)}
              >
                <Text style={styles.productModalCloseText}>✕</Text>
              </TouchableOpacity>
              
              <Text style={styles.productModalTitle}>Detailed Product Description</Text>
              
              <View style={styles.productImageContainer}>
                <View style={styles.productPlaceholder}>
                  <Text style={styles.placeholderText}>📦</Text>
                </View>
                <View style={styles.imageIndicators}>
                  {[0, 1, 2].map((index) => (
                    <View
                      key={index}
                      style={[
                        styles.indicator,
                        currentImageIndex === index && styles.activeIndicator
                      ]}
                    />
                  ))}
                </View>
                <TouchableOpacity style={styles.shareButton}>
                  <Text>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookmarkButton}>
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>

              {selectedProduct && (
                <View style={styles.productDetails}>
                  <Text style={styles.productDetailItem}>• {selectedProduct.details?.scent || selectedProduct.title}</Text>
                  <Text style={styles.productDetailItem}>• Size- {selectedProduct.details?.size || 'Regular'}</Text>
                  <Text style={styles.productDetailItem}>• Period Flow- {selectedProduct.details?.flow || 'Normal'}</Text>
                  <Text style={styles.productDetailItem}>• 1pc: {selectedProduct.price} (+{selectedProduct.details?.rewardPoints || 0} Reward Points)</Text>
                  <Text style={styles.productDetailItem}>• Available Stock: {availableStock[selectedProduct.id]}</Text>
                  
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityLabel}>Select Quantity-</Text>
                    <View style={styles.quantityPicker}>
                      <Text>1</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={[
                      styles.buyNowButton,
                      availableStock[selectedProduct.id] === 0 && styles.disabledButton
                    ]}
                    onPress={() => {
                      if (availableStock[selectedProduct.id] > 0) {
                        handleAddToCart(selectedProduct, 1);
                        setSelectedProduct(null);
                      }
                    }}
                    disabled={availableStock[selectedProduct.id] === 0}
                  >
                    <Text style={styles.buyNowButtonText}>
                      {availableStock[selectedProduct.id] === 0 ? 'Out of Stock' : 'Buy Now'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.8,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  placeholderBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFE4E1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF69B4',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 32,
    color: '#FF69B4',
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1493',
  },
  itemsLeft: {
    fontSize: 12,
    color: '#4CAF50',
  },
  addButton: {
    backgroundColor: '#FF1493',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  machineSelector: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  machineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  machineLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  machineId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1493',
  },
  machineLocation: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'center',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalCloseText: {
    fontSize: 20,
    color: '#666',
  },
  machineList: {
    padding: 16,
  },
  machineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedMachineItem: {
    backgroundColor: '#FFE4E1',
  },
  machineItemInfo: {
    flex: 1,
  },
  machineItemId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  machineItemLocation: {
    fontSize: 14,
    color: '#666',
  },
  selectedMachineText: {
    color: '#FF1493',
  },
  checkmark: {
    fontSize: 20,
    color: '#FF1493',
    marginLeft: 8,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFE4E1',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF1493',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF1493',
    marginHorizontal: 12,
  },
  cartSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartInfo: {
    flex: 1,
  },
  cartItems: {
    fontSize: 14,
    color: '#666',
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF1493',
  },
  proceedButton: {
    backgroundColor: '#FF1493',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 16,
  },
  proceedButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productModalContainer: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  productModalContent: {
    flex: 1,
    padding: 16,
  },
  productModalClose: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  productModalCloseText: {
    fontSize: 24,
    color: '#000',
  },
  productModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  productImageContainer: {
    aspectRatio: 16/9,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    position: 'relative',
  },
  productPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCC',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FF1493',
  },
  shareButton: {
    position: 'absolute',
    right: 48,
    top: 16,
  },
  bookmarkButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  productDetails: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  productDetailItem: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  quantityLabel: {
    fontSize: 16,
    color: '#000',
    marginRight: 16,
  },
  quantityPicker: {
    backgroundColor: '#FF1493',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buyNowButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buyNowButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledCard: {
    opacity: 0.6,
  },
  disabledButton: {
    backgroundColor: '#CCC',
    opacity: 0.8,
  },
  outOfStock: {
    color: '#FF0000',
  },
  section: {
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#FFE4E1',
    borderRadius: 12,
    padding: 16,
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
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  confirmButton: {
    backgroundColor: '#FF1493',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  confirmAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  rewardPoints: {
    fontSize: 12,
    color: '#4CAF50',
  },
}); 