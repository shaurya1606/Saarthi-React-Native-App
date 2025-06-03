import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

const { width } = Dimensions.get('window');
const FRAME_SIZE = width * 0.7;

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    // Reset camera state when component mounts
    setIsCameraActive(true);
    setIsCameraReady(false);

    // Cleanup when component unmounts
    return () => {
      setIsCameraActive(false);
      setIsCameraReady(false);
    };
  }, []);

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.centerContent}>
          <Text style={styles.text}>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.centerContent}>
          <Text style={styles.text}>No access to camera</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={requestPermission}
          >
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    setIsCameraActive(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.cameraContainer}>
        {isCameraActive && (
          <CameraView 
            style={styles.camera}
            facing="back"
            onMountError={() => {
              setIsCameraReady(false);
            }}
            onCameraReady={() => {
              setIsCameraReady(true);
            }}
          >
            <View style={styles.overlay}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleBack}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>

              <Text style={styles.instructions}>
                {isCameraReady ? 'Point your camera at a QR code' : 'Starting camera...'}
              </Text>
            </View>
          </CameraView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE4E1',
  },
  text: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF1493',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#FFF',
  },
  scanFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#FF69B4',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  instructions: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
}); 