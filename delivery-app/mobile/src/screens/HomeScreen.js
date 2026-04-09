import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { categories, restaurants } from '../data/mockData';
import RestaurantCard from '../components/RestaurantCard';
import CategoryChip from '../components/CategoryChip';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filtered = restaurants.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory ? r.category === selectedCategory : true;
    return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, bem-vindo! 👋</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.location}>Rua das Flores, 123</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <Text style={styles.avatarText}>U</Text>
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTag}>🔥 Oferta do dia</Text>
            <Text style={styles.bannerTitle}>Frete grátis{'\n'}no primeiro pedido!</Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Pedir agora</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bannerEmoji}>🍕</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar restaurantes..."
            placeholderTextColor="#AAA"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            <CategoryChip
              label="Todos"
              emoji="🍽️"
              active={selectedCategory === null}
              onPress={() => setSelectedCategory(null)}
            />
            {categories.map((cat) => (
              <CategoryChip
                key={cat.id}
                label={cat.name}
                emoji={cat.emoji}
                active={selectedCategory === cat.name}
                onPress={() =>
                  setSelectedCategory(selectedCategory === cat.name ? null : cat.name)
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* Restaurants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory ? selectedCategory : 'Todos os restaurantes'}
            {'  '}
            <Text style={styles.count}>{filtered.length}</Text>
          </Text>
          {filtered.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onPress={() => navigation.navigate('Detail', { restaurant })}
            />
          ))}
          {filtered.length === 0 && (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyText}>Nenhum resultado encontrado</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFF',
  },
  greeting: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  locationIcon: { fontSize: 12, marginRight: 2 },
  location: { fontSize: 13, color: '#666' },
  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF4500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  banner: {
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: '#FF4500',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerContent: { flex: 1 },
  bannerTag: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 6,
    fontWeight: '500',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
    lineHeight: 26,
    marginBottom: 14,
  },
  bannerBtn: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerBtnText: { color: '#FF4500', fontWeight: '700', fontSize: 13 },
  bannerEmoji: { fontSize: 60 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1A1A1A' },
  section: { paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginBottom: 12 },
  count: { fontSize: 14, color: '#AAA', fontWeight: '400' },
  categoriesScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 40 },
  emptyText: { fontSize: 15, color: '#AAA', marginTop: 12 },
});
