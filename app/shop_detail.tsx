import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function ShopDetailScreen() {
  const { carId, brand } = useLocalSearchParams();
  const router = useRouter();
  const id = Array.isArray(carId) ? carId[0] : carId;
  const name = Array.isArray(brand) ? brand[0] : brand;

  // Simulation du solde SpotterCoins (remplace par un vrai store plus tard)
  const [spotterCoins, setSpotterCoins] = useState(5000); // Ex: 15,000 coins
  const [hasCoupon, setHasCoupon] = useState(false);

  const COUPON_PRICE = 3000;
  const canBuy = spotterCoins >= COUPON_PRICE && !hasCoupon;

  const handleBuyCoupon = () => {
    if (!canBuy) return;

    Alert.alert(
      "Achat confirmé !",
      `Vous avez dépensé 3,000 SpotterCoins pour un coupon de -10% !`,
      [
        {
          text: "OK",
          onPress: () => {
            setSpotterCoins(prev => prev - COUPON_PRICE);
            setHasCoupon(true);
          },
        },
      ]
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

      <View style={styles.coinsContainer}>
        <Text style={styles.coinsText}>{spotterCoins.toLocaleString()} SpotterCoins</Text>
      </View>

      <Text style={styles.title}></Text>

      <View style={styles.detailCard}>
        <View style={styles.couponSection}>
          <Text style={styles.couponTitle}>Coupon de réduction pour {name || 'Voiture'}</Text>
          <Text style={styles.couponDiscount}>-10% sur votre prochain achat</Text>
          <Text style={styles.couponPrice}>Prix : 3,000 SpotterCoins</Text>

          <Pressable
            style={[
              styles.buyButton,
              !canBuy && styles.buyButtonDisabled,
            ]}
            onPress={handleBuyCoupon}
            disabled={!canBuy}
          >
            <Text style={styles.buyButtonText}>
              {hasCoupon ? 'Coupon acquis !' : 'Acheter le coupon'}
            </Text>
          </Pressable>

          {!canBuy && !hasCoupon && (
            <Text style={styles.insufficient}>
              Pas assez de SpotterCoins
            </Text>
          )}
        </View>
      </View>

      <Pressable style={styles.backButton} onPress={() => router.push('/shop')}>
        <Text style={styles.backButtonText}>Retour</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  coinsContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
  },
  detailCard: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  model: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    lineHeight: 22,
  },
  couponSection: {

  },
  couponTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  couponDiscount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 5,
  },
  couponPrice: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  buyButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButtonDisabled: {
    backgroundColor: '#ccc',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  insufficient: {
    color: '#d00',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});