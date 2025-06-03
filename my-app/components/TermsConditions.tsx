import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function TermsConditions() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms of Service</Text>
          <Text style={styles.lastUpdated}>Last Updated: March 15, 2024</Text>
          
          <View style={styles.termsSection}>
            <Text style={styles.termTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.termText}>
              By accessing and using the Saarthi app, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termTitle}>2. User Accounts</Text>
            <Text style={styles.termText}>
              You must create an account to use certain features of the app. You are responsible for maintaining the confidentiality of your account information.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termTitle}>3. Privacy Policy</Text>
            <Text style={styles.termText}>
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termTitle}>4. Product Orders</Text>
            <Text style={styles.termText}>
              All orders placed through the app are subject to availability and acceptance. Prices are subject to change without notice.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termTitle}>5. Health Information</Text>
            <Text style={styles.termText}>
              The health tracking features are for informational purposes only and should not be considered medical advice. Consult healthcare professionals for medical decisions.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termTitle}>6. Rewards Program</Text>
            <Text style={styles.termText}>
              Points earned through our rewards program have no cash value and are subject to the program's terms and expiration policies.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termTitle}>7. User Content</Text>
            <Text style={styles.termText}>
              By submitting content to the app, you grant us a worldwide, non-exclusive license to use, reproduce, and distribute that content.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termTitle}>8. Limitation of Liability</Text>
            <Text style={styles.termText}>
              We are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the app.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termTitle}>9. Changes to Terms</Text>
            <Text style={styles.termText}>
              We reserve the right to modify these terms at any time. Continued use of the app after changes constitutes acceptance of the new terms.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termTitle}>10. Contact Information</Text>
            <Text style={styles.termText}>
              For questions about these terms, please contact us at legal@saarthi.com or through our support channels.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.disclaimer}>
            By using the Saarthi app, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  termsSection: {
    marginBottom: 20,
  },
  termTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  termText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
    textAlign: 'center',
  },
}); 