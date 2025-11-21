// app/(tabs)/profile.tsx
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const CARS_PER_ROW = 2;
const MAX_VISIBLE_ROWS = 3;
const MAX_VISIBLE_CARS = MAX_VISIBLE_ROWS * CARS_PER_ROW;

const userCars = Array.from({ length: 10 }, (_, i) => ({ 
  id: i + 1,
}));

export default function ProfileScreen() {
  const hasMoreThanMax = userCars.length > MAX_VISIBLE_CARS;

  return (

    
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#8B0000']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={40} color="#666" />
        </View>
        <Text style={styles.pseudo}>PSEUDO</Text>
        <Text style={styles.count}>{userCars.length} cars</Text>
      </View>

      <FlatList
        data={userCars}
        keyExtractor={(item) => item.id.toString()}
        numColumns={CARS_PER_ROW}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.carCard}>
            <Text style={styles.carText}>Car {item.id}</Text>
          </View>
        )}
        contentContainerStyle={[
          styles.grid,
          hasMoreThanMax && styles.scrollableGrid, 
        ]}
        scrollEnabled={hasMoreThanMax}
        showsVerticalScrollIndicator={hasMoreThanMax}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1bdfff',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  pseudo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  count: {
    color: '#fff',
    marginTop: 4,
  },
  grid: {
    paddingHorizontal: 20,
  },
  scrollableGrid: {
    paddingBottom: 100, 
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  carCard: {
    width: '49%',
    height: 120,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: '#b10202ff',
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  carText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
});