import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function CarSpotterScreen() {
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

      <View style={styles.filterCard}>
        <TextInput placeholder="Marque" style={styles.input} />
        <TextInput placeholder="Modèle" style={styles.input} />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filtrer</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={styles.carCard}>
            <Text style={styles.carText}>Cars</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#fff' },
  filterCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#b10202ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterText: { color: 'white', fontWeight: '600' },
  grid: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  carCard: {
    width: '48%',
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carText: { color: '#666' },
});