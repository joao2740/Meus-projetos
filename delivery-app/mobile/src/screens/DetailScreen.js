import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function DetailScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const [cart, setCart] = useState([]);

  const restaurantProducts = products.filter(
    (p) => p.restaurantId === restaurant.id
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Hero */}
      <View style={styles.hero}>
        <Image source={{ uri: restaurant.image }} style={styles.heroImage} />
        <View style={styles.heroOverlay} />

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <Text style={styles.heroName}>{restaurant.name}</Text>
          <View style={styles.heroMeta}>
            <Text style={styles.heroTag}>⭐ {restaurant.rating}</Text>
            <Text style={styles.heroDot}>·</Text>
            <Text style={styles.heroTag}>🕐 {restaurant.deliveryTime}</Text>
            <Text style={styles.heroDot}>·</Text>
            <Text style={styles.heroTag}>
              {restaurant.deliveryFee === 0
                ? '🟢 Grátis'
                : `🛵 R$ ${restaurant.deliveryFee.toFixed(2)}`}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Tags */}
        <View style={styles.tagsRow}>
          {restaurant.tags.map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Info cards */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoValue}>⭐ {restaurant.rating}</Text>
            <Text style={styles.infoLabel}>Avaliação</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoValue}>🕐 {restaurant.deliveryTime}</Text>
            <Text style={styles.infoLabel}>Entrega</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoValue}>
              R$ {restaurant.minOrder.toFixed(2)}
            </Text>
            <Text style={styles.infoLabel}>Pedido mín.</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Cardápio</Text>
          {restaurantProducts.length > 0 ? (
            restaurantProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => addToCart(product)}
                qty={cart.find((i) => i.id === product.id)?.qty || 0}
              />
            ))
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🍽️</Text>
              <Text style={styles.emptyText}>Cardápio em breve</Text>
            </View>
          )}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Cart button */}
      {cartCount > 0 && (
        <View style={styles.cartBar}>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
          <Text style={styles.cartText}>Ver carrinho</Text>
          <Text style={styles.cartTotal}>R$ {cartTotal.toFixed(2)}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F8F8' },
  hero: { height: 220, position: 'relative' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  heroContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  heroName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 6,
  },
  heroMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  heroTag: { fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '500' },
  heroDot: { color: 'rgba(255,255,255,0.5)', marginHorizontal: 6 },
  body: { flex: 1 },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 8,
  },
  tagChip: {
    backgroundColor: '#FFF0EB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: { color: '#FF4500', fontSize: 12, fontWeight: '500' },
  infoRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 14,
    gap: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  infoValue: { fontSize: 13, fontWeight: '600', color: '#1A1A1A', marginBottom: 2 },
  infoLabel: { fontSize: 11, color: '#AAA' },
  menuSection: { paddingHorizontal: 16, paddingTop: 20 },
  menuTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginBottom: 12 },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 40 },
  emptyText: { fontSize: 15, color: '#AAA', marginTop: 12 },
  cartBar: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#FF4500',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cartBadgeText: { color: '#FFF', fontWeight: '700', fontSize: 12 },
  cartText: { flex: 1, color: '#FFF', fontWeight: '700', fontSize: 16 },
  cartTotal: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});
