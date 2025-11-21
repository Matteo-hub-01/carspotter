import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const carBrands = ['AUTODOC', 'BMW', 'Mercedes', 'Audi', 'Norauto', 'Carter-Cash'];

export default function ShopScreen() {
  const [spotterCoins, setSpotterCoins] = useState(5000); 
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredBrands = carBrands.filter(brand =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#8B0000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <StatusBar style="light" />

      <Text style={styles.title}>SHOP</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une marque..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.coinsContainer}>
          <Text style={styles.coinsText}>{spotterCoins.toLocaleString()} SpotterCoins</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {filteredBrands.map((brand, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [
              styles.carCard,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() =>
              router.push({
                pathname: '/shop_detail',
                params: { carId: i, brand },
              })
            }
          >
            <Text style={styles.carText}>{brand}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'left', marginBottom: 10, marginHorizontal: 20, color: '#fff' },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  coinsContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  coinsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  carCard: {
    width: '45%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  carText: { color: '#666', fontWeight: '600', fontSize: 16 },
});