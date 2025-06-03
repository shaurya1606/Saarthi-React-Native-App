import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How do I track my order?',
    answer: 'You can track your order in real-time through the Orders section. Click on any active order to see its current status and location.',
  },
  {
    question: 'How does period tracking work?',
    answer: 'Our period tracking feature uses your input data to predict your next cycle. You can log your symptoms and flow in the calendar view of the home screen.',
  },
  {
    question: 'Where can I find vending machines?',
    answer: 'Use the Map screen to locate nearby vending machines. You can filter by building and floor to find the most convenient location.',
  },
  {
    question: 'How do I earn reward points?',
    answer: 'Earn points with every purchase! You get 1 point per ₹10 spent. Additional points for referring friends and completing health surveys.',
  },
  {
    question: 'How to contact customer support?',
    answer: 'You can reach our support team through the Contact Support section or email us at support@saarthi.com',
  },
];

const helpTopics = [
  'Orders & Tracking',
  'Account & Privacy',
  'Payment Methods',
  'Rewards Program',
  'Technical Support',
  'Product Information',
];

export default function HelpCenter() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [animation] = useState(new Animated.Value(0));

  const toggleQuestion = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Topics</Text>
          <View style={styles.topicsGrid}>
            {helpTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topicButton}
              >
                <Text style={styles.topicText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqData.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqItem}
              onPress={() => toggleQuestion(index)}
            >
              <View style={styles.questionRow}>
                <Text style={styles.question}>{faq.question}</Text>
                <Ionicons
                  name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#666"
                />
              </View>
              {expandedIndex === index && (
                <Text style={styles.answer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Still Need Help?</Text>
          <Text style={styles.helpText}>
            If you couldn't find what you're looking for, our support team is here to help.
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
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
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topicButton: {
    width: '48%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF69B4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  topicText: {
    color: '#FF1493',
    fontSize: 14,
    fontWeight: '500',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 12,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: '#FF1493',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 