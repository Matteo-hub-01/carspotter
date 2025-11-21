import React, { useState, useEffect } from 'react';
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
import MapView, { Region } from 'react-native-maps';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const initialRegion: Region = {
  latitude: 50.6293,
  longitude: 3.0573,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const nightMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2c2c2c' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
];

export default function MapScreen() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  // Demande des permissions au lancement
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        Alert.alert('Permissions manquantes', "L'app a besoin de l'accès à l'appareil photo et à la galerie.");
      }
    })();
  }, []);

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setCapturedImage(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const validateSpot = () => {
    if (!brand.trim() || !model.trim()) {
      Alert.alert('Champs requis', 'Veuillez indiquer la marque et le modèle de la voiture');
      return;
    }

    // Ici tu pourras sauvegarder ou envoyer les données
    console.log('Spot validé →', { imageUri: capturedImage, brand, model });

    Alert.alert(
      'Spot ajouté ! 🚗',
      `${brand} ${model} a bien été repérée !`,
      [{ text: 'OK', onPress: () => {
        setModalVisible(false);
        setCapturedImage(null);
        setBrand('');
        setModel('');
      }}]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#8B0000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <StatusBar style="light" />

      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        customMapStyle={nightMapStyle}
        provider="google"
      />

      {/* Profil en haut à gauche */}
      <Pressable onPress={() => router.push('/profile')} style={styles.profileContainer}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <User size={20} color="#fff" />
          </View>
          <View>
            <Text style={styles.pseudoLabel}>PSEUDO</Text>
            <Text style={styles.pseudo}>XXX cars</Text>
          </View>
        </View>
      </Pressable>

      {/* Bouton caméra flottant */}
      <Pressable onPress={openCamera} style={styles.cameraButton}>
        <Camera size={32} color="#ffffff" />
      </Pressable>

      {/* Modale après prise de photo */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <X size={28} color="#fff" />
              </TouchableOpacity>

              {capturedImage && (
                <Image source={{ uri: capturedImage }} style={styles.capturedImage} resizeMode="cover" />
              )}

              <Text style={styles.modalTitle}>Quelle voiture as-tu repérée ?</Text>

              <TextInput
                style={styles.input}
                placeholder="Marque (ex: Porsche)"
                placeholderTextColor="#888"
                value={brand}
                onChangeText={setBrand}
                autoCapitalize="words"
                autoFocus
              />

              <TextInput
                style={styles.input}
                placeholder="Modèle (ex: 911 GT3 RS)"
                placeholderTextColor="#888"
                value={model}
                onChangeText={setModel}
                autoCapitalize="words"
              />

              <TouchableOpacity onPress={validateSpot} style={styles.validateButton}>
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
  container: { flex: 1 },
  profileContainer: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
  pseudoLabel: { fontSize: 10, color: '#aaa', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  pseudo: { fontSize: 14, color: '#fff', fontWeight: 'bold' },
  cameraButton: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: '#000000',
    padding: 28,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },

  // Modale
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.97)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '92%',
    maxHeight: '90%',
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  closeButton: { position: 'absolute', top: 10, right: 10, padding: 8 },
  capturedImage: { width: 300, height: 300, borderRadius: 16, marginVertical: 20 },
  modalTitle: { fontSize: 22, color: '#fff', fontWeight: 'bold', marginBottom: 20 },
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
    marginTop: 10,
  },
  validateText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});