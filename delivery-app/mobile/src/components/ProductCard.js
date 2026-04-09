import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function ProductCard({ product, onAdd, qty }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={[styles.addBtn, qty > 0 && styles.addBtnActive]}
            onPress={onAdd}
          >
            <Text style={[styles.addBtnText, qty > 0 && styles.addBtnTextActive]}>
              {qty > 0 ? `+  ${qty}` : '+'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  image: { width: 100, height: 100, resizeMode: 'cover' },
  body: { flex: 1, padding: 12, justifyContent: 'space-between' },
  name: { fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  description: { fontSize: 12, color: '#888', lineHeight: 17, flex: 1 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: { fontSize: 16, fontWeight: '800', color: '#FF4500' },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF4500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnActive: { backgroundColor: '#FF4500' },
  addBtnText: { fontSize: 16, fontWeight: '700', color: '#FF4500' },
  addBtnTextActive: { color: '#FFF' },
});
