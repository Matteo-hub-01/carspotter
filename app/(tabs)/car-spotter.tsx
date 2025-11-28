import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

type CarData = {
  [brand: string]: string[];
};

const carData: CarData = {
  Toyota: ['Corolla', 'Camry', 'Yaris'],
  BMW: ['X5', 'X3', '320i'],
  Audi: ['A3', 'A4', 'Q5'],
  Ford: ['Fiesta', 'Focus', 'Mustang'],
};

type Car = {
  brand: string;
  model: string;
};

export default function CarSpotterScreen() {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [showBrandList, setShowBrandList] = useState<boolean>(false);
  const [showModelList, setShowModelList] = useState<boolean>(false);

  const filteredModels = selectedBrand ? carData[selectedBrand] : [];

  const filteredCars: Car[] = [];
  if (selectedBrand && selectedModel) {
    filteredCars.push({ brand: selectedBrand, model: selectedModel });
  } else if (selectedBrand) {
    filteredCars.push(...filteredModels.map((model) => ({ brand: selectedBrand, model })));
  } else {
    Object.entries(carData).forEach(([brand, models]) => {
      models.forEach((model) => filteredCars.push({ brand, model }));
    });
  }

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
        {/* Liste Marques */}
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setShowBrandList(!showBrandList)}
        >
          <Text style={styles.selectText}>
            {selectedBrand || 'Sélectionner une marque'}
          </Text>
        </TouchableOpacity>
        {showBrandList && (
          <FlatList
            data={Object.keys(carData)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  setSelectedBrand(item);
                  setSelectedModel('');
                  setShowBrandList(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.listContainer}
          />
        )}

        {/* Liste Modèles */}
        <TouchableOpacity
          style={[styles.selectButton, !selectedBrand && { backgroundColor: '#eee' }]}
          disabled={!selectedBrand}
          onPress={() => setShowModelList(!showModelList)}
        >
          <Text style={styles.selectText}>
            {selectedModel || 'Sélectionner un modèle'}
          </Text>
        </TouchableOpacity>
        {showModelList && selectedBrand && (
          <FlatList
            data={filteredModels}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  setSelectedModel(item);
                  setShowModelList(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.listContainer}
          />
        )}

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filtrer</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {filteredCars.map((car, i) => (
          <View key={i} style={styles.carCard}>
            <Text style={styles.carText}>
              {car.brand} {car.model}
            </Text>
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
  selectButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectText: { fontSize: 14 },
  listContainer: {
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  carText: { color: '#666', textAlign: 'center' },
});
