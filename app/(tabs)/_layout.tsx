import { Tabs } from 'expo-router';
import { GalleryVerticalEnd, ShoppingBag, User, Home, CarFront } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets(); 

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#b10202ff',
        tabBarInactiveTintColor: '#ffffffff',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000000ff',
          height: 50 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 10,
          borderRadius: 20,
          position: 'absolute', 
          bottom: 20,
          marginHorizontal: '2.5%',
          width: '95%',
        },
        tabBarItemStyle: {
          marginTop: 10,
        },
        tabBarBackground: () => <View style={StyleSheet.absoluteFill} />,
      }}
    >
      <Tabs.Screen
        name="car-spotter"
        options={{
          tabBarIcon: ({ color }) => <CarFront size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color }) => <GalleryVerticalEnd size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Home size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          tabBarIcon: ({ color }) => <ShoppingBag size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <User size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}