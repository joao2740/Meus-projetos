import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CategoryChip({ label, emoji, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
  },
  chipActive: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  emoji: { fontSize: 14, marginRight: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#444' },
  labelActive: { color: '#FFF' },
});
