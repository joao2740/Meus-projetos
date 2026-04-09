import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function RestaurantCard({ restaurant, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.category}>{restaurant.category}</Text>
        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⭐ {restaurant.rating}</Text>
          </View>
          <Text style={styles.meta}>🕐 {restaurant.deliveryTime}</Text>
          <Text style={styles.meta}>
            {restaurant.deliveryFee === 0
              ? '🟢 Grátis'
              : `🛵 R$ ${restaurant.deliveryFee.toFixed(2)}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  body: { padding: 14 },
  name: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginBottom: 2 },
  category: { fontSize: 13, color: '#888', marginBottom: 10 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  badge: {
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#F59E0B' },
  meta: { fontSize: 12, color: '#666' },
});
