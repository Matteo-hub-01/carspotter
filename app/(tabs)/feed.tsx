// app/(tabs)/spotted-cars.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function SpottedCarsScreen() {
  const spottedCars = [
    { id: 1, pseudo: 'PSEUDO', count: 'XXX cars' },
    { id: 2, pseudo: 'PSEUDO', count: 'XXX cars' },
    { id: 3, pseudo: 'PSEUDO', count: 'XXX cars' },
    { id: 4, pseudo: 'PSEUDO', count: 'XXX cars' },
    { id: 5, pseudo: 'PSEUDO', count: 'XXX cars' },
    { id: 6, pseudo: 'PSEUDO', count: 'XXX cars' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#8B0000']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <StatusBar style="light" />
      <Text style={styles.title}>CarSpotter</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {spottedCars.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.header}>
              <View style={styles.avatar}>
                <User size={20} color="#666" />
              </View>
              <View>
                <Text style={styles.pseudo}>{item.pseudo}</Text>
                <Text style={styles.count}>{item.count}</Text>
              </View>
            </View>

            <View style={styles.carImage}>
              <Text style={styles.carText}>Cars</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },
  list: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: '#b10202ff',
    borderWidth: 4,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1C1C1E',
    borderColor: '#b10202ff',
    borderBottomWidth: 4,

  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pseudo: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  count: {
    color: '#AAA',
    fontSize: 13,
  },
  carImage: {
    height: 180,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carText: {
    color: '#999',
    fontSize: 16,
  },
});