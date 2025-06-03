import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Header from '../../components/Header';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface Article {
  id: string;
  title: string;
  preview: string;
  readTime: string;
  category: string;
}

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Understanding Your Menstrual Cycle',
    preview: 'Learn about the four phases of your menstrual cycle and how they affect your body...',
    readTime: '5 min read',
    category: 'Health',
  },
  {
    id: '2',
    title: 'Natural Remedies for Period Pain',
    preview: 'Discover effective natural remedies to help manage menstrual cramps and discomfort...',
    readTime: '4 min read',
    category: 'Wellness',
  },
  {
    id: '3',
    title: 'Nutrition Tips During Menstruation',
    preview: 'Foods to eat and avoid during your period to help maintain energy and reduce symptoms...',
    readTime: '6 min read',
    category: 'Nutrition',
  },
  {
    id: '4',
    title: 'Exercise and Your Cycle',
    preview: 'How to adapt your workout routine according to your menstrual cycle phases...',
    readTime: '7 min read',
    category: 'Fitness',
  },
  {
    id: '5',
    title: 'Mental Health & Periods',
    preview: 'Understanding the emotional changes during your cycle and how to cope with them...',
    readTime: '5 min read',
    category: 'Mental Health',
  },
  {
    id: '6',
    title: 'Sustainable Period Products',
    preview: 'A guide to eco-friendly menstrual products and their benefits for you and the environment...',
    readTime: '8 min read',
    category: 'Sustainability',
  },
];

const Banner = () => (
  <View style={styles.bannerContainer}>
    <View style={styles.bannerContent}>
      <Text style={styles.bannerTitle}>Women's Health Week</Text>
      <Text style={styles.bannerText}>
        Special focus on menstrual health and wellness. Explore our curated articles and expert advice.
      </Text>
      <TouchableOpacity style={styles.bannerButton}>
        <Text style={styles.bannerButtonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ArticleCard = ({ article }: { article: Article }) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.imageContainer}>
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>📰</Text>
      </View>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.category}>{article.category}</Text>
      <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
      <Text style={styles.preview} numberOfLines={2}>{article.preview}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.readTime}>{article.readTime}</Text>
        <Text style={styles.readMore}>Read More ›</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function ArticlesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={ARTICLES}
        renderItem={({ item }) => <ArticleCard article={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Banner />
            <Text style={styles.sectionTitle}>Latest Articles</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  headerContainer: {
    padding: 16,
  },
  bannerContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#FF69B4',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 16,
    opacity: 0.9,
  },
  bannerButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#FF69B4',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
    height: CARD_WIDTH * 0.6,
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
  category: {
    fontSize: 12,
    color: '#FF69B4',
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    lineHeight: 22,
  },
  preview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 12,
    color: '#666',
  },
  readMore: {
    fontSize: 12,
    color: '#FF69B4',
    fontWeight: '600',
  },
}); 