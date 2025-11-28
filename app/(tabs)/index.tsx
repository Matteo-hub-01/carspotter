import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Camera, User, X, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import MapView, { Region, Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const initialRegion: Region = {
  latitude: 50.6293,
  longitude: 3.0573,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const nightMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }, { height: '200%' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2c2c2c' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] }
];

export default function MapScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation(loc);
        mapRef.current?.animateToRegion(
          {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          },
          1000
        );
      }
    })();
  }, []);

  const showPhotoTips = () => {
    Alert.alert(
      'Astuce photo parfaite',
      '• Prends l\'arrière de la voiture\n• Logo + badge modèle bien visibles\n• Pas de reflet\n• Bonne luminosité',
      [{ text: 'OK, je prends la photo !' }]
    );
  };

  const openCamera = async () => {
    showPhotoTips();
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      const uri = result.assets[0].uri;
      setCapturedImage(uri);
      setModalVisible(true);
      setBrand('');
      setModel('');
    }
  };

  const validateSpot = () => {
    if (!brand) {
      Alert.alert('Marque requise', 'Remplis la marque manuellement');
      return;
    }
    Alert.alert('Spot ajouté !', `${brand} ${model}`.trim(), [
      {
        text: 'OK',
        onPress: () => {
          setModalVisible(false);
          setCapturedImage(null);
          setBrand('');
          setModel('');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#8B0000']} style={StyleSheet.absoluteFillObject} />
      <StatusBar style="light" />

      <MapView
        ref={mapRef}
        style={[StyleSheet.absoluteFillObject, {height: '120%'}]}
        initialRegion={initialRegion}
        customMapStyle={nightMapStyle}
        provider="google"
      >
        {userLocation && (
          <Marker coordinate={{ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude }}>
            <View style={styles.userMarker}>
              <View style={styles.userMarkerDot} />
            </View>
          </Marker>
        )}
      </MapView>

      <Pressable onPress={() => router.push('/profile')} style={styles.profileContainer}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><User size={20} color="#fff" /></View>
          <View>
            <Text style={styles.pseudoLabel}>PSEUDO</Text>
            <Text style={styles.pseudo}>XXX cars</Text>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={openCamera} style={styles.cameraButton}>
        <Camera size={32} color="#fff" />
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <X size={28} color="#fff" />
              </TouchableOpacity>

              {capturedImage && (
                <Image source={{ uri: capturedImage }} style={styles.capturedImage} resizeMode="cover" />
              )}

              <Text style={styles.modalTitle}>Quel bolide as-tu spoté ?</Text>

              <TextInput
                style={styles.input}
                placeholder="Marque (ex: Porsche)"
                placeholderTextColor="#888"
                value={brand}
                onChangeText={setBrand}
                autoCapitalize="words"
              />

              <TextInput
                style={styles.input}
                placeholder="Modèle (ex: 911 GT3 RS)"
                placeholderTextColor="#888"
                value={model}
                onChangeText={setModel}
                autoCapitalize="words"
              />

              <TouchableOpacity
                onPress={validateSpot}
                style={styles.validateButton}
              >
                <Check size={28} color="#fff" />
                <Text style={styles.validateText}>Valider le spot</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 , justifyContent: 'center', alignItems: 'center' },
  profileContainer: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  pseudoLabel: { fontSize: 10, color: '#aaa', fontWeight: '600', textTransform: 'uppercase' },
  pseudo: { fontSize: 14, color: '#fff', fontWeight: 'bold' },
  cameraButton: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: '#000',
    padding: 28,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userMarker: { alignItems: 'center', justifyContent: 'center' },
  userMarkerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#00BFFF',
    borderWidth: 3,
    borderColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.97)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '92%',
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  closeButton: { position: 'absolute', top: 12, right: 12, padding: 8 },
  capturedImage: { width: 300, height: 300, borderRadius: 16, marginVertical: 20 },
  modalTitle: { fontSize: 22, color: '#fff', fontWeight: 'bold', marginVertical: 10 },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  validateButton: {
    flexDirection: 'row',
    backgroundColor: '#8B0000',
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15,
  },
  validateText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});
