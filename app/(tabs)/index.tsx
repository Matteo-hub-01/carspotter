import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Camera, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import MapView, { Region } from 'react-native-maps';
import { useRouter } from 'expo-router';

const initialRegion: Region = {
  latitude: 50.6293,
  longitude: 3.0573,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const nightMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#212121' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#212121' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#2c2c2c' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8a8a8a' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
];



export default function MapScreen() {
    const router = useRouter();
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

      <Pressable onPress={()=>router.push("/profile")} style={styles.profileContainer}>
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

      <View style={styles.cameraButton}>
        <Camera size={28} color="#ffffff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
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
  pseudoLabel: {
    fontSize: 10,
    color: '#aaa',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pseudo: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: '#000000',
    padding: 24,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
});