import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

interface FormData {
  name: string;
  age: string;
  product: 'Pads' | 'Tampons' | 'Cups' | 'Others';
  carryProduct: 'Always' | 'Sometimes' | 'Never';
  suddenOnset: 'Yes' | 'Never';
  helpSource: string[];
  rating: number;
}

export default function FeedbackScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    product: 'Pads',
    carryProduct: 'Always',
    suddenOnset: 'Never',
    helpSource: [],
    rating: 4,
  });

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
    router.back();
  };

  const toggleHelpSource = (source: string) => {
    setFormData(prev => ({
      ...prev,
      helpSource: prev.helpSource.includes(source)
        ? prev.helpSource.filter(item => item !== source)
        : [...prev.helpSource, source]
    }));
  };

  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setFormData(prev => ({ ...prev, rating: index + 1 }))}
      >
        <Text style={[
          styles.star,
          { color: index < formData.rating ? '#FF1493' : '#ccc' }
        ]}>
          ★
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Survey Form</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.getStartedBox}>
          <Text style={styles.getStartedTitle}>Get Started!</Text>
          <Text style={styles.getStartedSubtitle}>
            Let us know your experience to help you..
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Age</Text>
          <TextInput
            style={styles.input}
            value={formData.age}
            onChangeText={(text) => setFormData(prev => ({ ...prev, age: text }))}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Which Menstrual Product do you use?</Text>
          <View style={styles.optionsRow}>
            {['Pads', 'Tampons', 'Cups', 'Others'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.radioButton,
                  formData.product === item && styles.radioButtonSelected
                ]}
                onPress={() => setFormData(prev => ({ ...prev, product: item as any }))}
              >
                <View style={styles.radioCircle}>
                  {formData.product === item && <View style={styles.radioFill} />}
                </View>
                <Text style={styles.radioText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Do you regularly carry it with you?</Text>
          <View style={styles.optionsRow}>
            {['Always', 'Sometimes', 'Never'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.radioButton,
                  formData.carryProduct === item && styles.radioButtonSelected
                ]}
                onPress={() => setFormData(prev => ({ ...prev, carryProduct: item as any }))}
              >
                <View style={styles.radioCircle}>
                  {formData.carryProduct === item && <View style={styles.radioFill} />}
                </View>
                <Text style={styles.radioText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Ever experienced a sudden onset of period- before or after the expected date?
          </Text>
          <View style={styles.optionsRow}>
            {['Yes', 'Never'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.radioButton,
                  formData.suddenOnset === item && styles.radioButtonSelected
                ]}
                onPress={() => setFormData(prev => ({ ...prev, suddenOnset: item as any }))}
              >
                <View style={styles.radioCircle}>
                  {formData.suddenOnset === item && <View style={styles.radioFill} />}
                </View>
                <Text style={styles.radioText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Whom do you ask for help in such a situation?</Text>
          <View style={styles.checkboxGroup}>
            {[
              'Friends or Family',
              'Rush to Nearby Pharmacy',
              'I always carry product with me',
              'Never experienced this situation'
            ].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.checkbox}
                onPress={() => toggleHelpSource(item)}
              >
                <View style={styles.checkboxBox}>
                  {formData.helpSource.includes(item) && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rate App</Text>
          <View style={styles.ratingContainer}>
            {renderStars()}
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFE4E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  getStartedBox: {
    backgroundColor: '#FF1493',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  getStartedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    fontStyle: 'italic',
  },
  getStartedSubtitle: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },
  radioButtonSelected: {
    opacity: 1,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF1493',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioFill: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF1493',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  checkboxGroup: {
    marginTop: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FF1493',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FF1493',
    fontSize: 16,
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  star: {
    fontSize: 32,
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: '#FF1493',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 