import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import InputField from '../components/InputField';
import SuccessModal from '../components/SuccessModal';
import { MenuItem, FormErrors } from '../types/MenuItem';

export default function CadastroScreen() {
  // Estado do formulário usando useState
  const [nome, setNome] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');

  // Estado dos erros de validação
  const [errors, setErrors] = useState<FormErrors>({});

  // Estado do modal de sucesso
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [itemCadastrado, setItemCadastrado] = useState<MenuItem | null>(null);

  // Animação do botão
  const buttonScale = new Animated.Value(1);

  // Função de validação dos campos
  const validarCampos = (): boolean => {
    const newErrors: FormErrors = {};

    // Validação do nome
    if (!nome.trim()) {
      newErrors.nome = 'O nome do item é obrigatório';
    } else if (nome.trim().length < 3) {
      newErrors.nome = 'O nome deve ter pelo menos 3 caracteres';
    }

    // Validação do preço
    if (!preco.trim()) {
      newErrors.preco = 'O preço é obrigatório';
    } else {
      const precoNumerico = parseFloat(preco.replace(',', '.'));
      if (isNaN(precoNumerico) || precoNumerico <= 0) {
        newErrors.preco = 'Informe um preço válido maior que zero';
      }
    }

    // Validação da descrição
    if (!descricao.trim()) {
      newErrors.descricao = 'A descrição é obrigatória';
    } else if (descricao.trim().length < 10) {
      newErrors.descricao = 'A descrição deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Animação do botão ao pressionar
  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // Função de cadastro
  const handleCadastro = () => {
    if (validarCampos()) {
      const novoItem: MenuItem = {
        nome: nome.trim(),
        preco: preco.replace(',', '.'),
        descricao: descricao.trim(),
      };

      // Exibir dados no console
      console.log('========================================');
      console.log('✅ ITEM CADASTRADO COM SUCESSO!');
      console.log('========================================');
      console.log('Nome:', novoItem.nome);
      console.log('Preço: R$', parseFloat(novoItem.preco).toFixed(2));
      console.log('Descrição:', novoItem.descricao);
      console.log('========================================');

      // Exibir modal de sucesso
      setItemCadastrado(novoItem);
      setModalVisible(true);
    }
  };

  // Função para fechar o modal e limpar o formulário
  const handleCloseModal = () => {
    setModalVisible(false);
    setItemCadastrado(null);
    // Limpar os campos
    setNome('');
    setPreco('');
    setDescricao('');
    setErrors({});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🍽️</Text>
          <Text style={styles.title}>Cardápio Digital</Text>
          <Text style={styles.subtitle}>
            Cadastre novos itens no seu cardápio
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <View style={styles.formDot} />
            <Text style={styles.formTitle}>Novo Item</Text>
          </View>

          <InputField
            label="Nome do Item"
            value={nome}
            onChangeText={(text) => {
              setNome(text);
              if (errors.nome) {
                setErrors((prev) => ({ ...prev, nome: undefined }));
              }
            }}
            placeholder="Ex: Pizza Margherita"
            error={errors.nome}
          />

          <InputField
            label="Preço (R$)"
            value={preco}
            onChangeText={(text) => {
              setPreco(text);
              if (errors.preco) {
                setErrors((prev) => ({ ...prev, preco: undefined }));
              }
            }}
            placeholder="Ex: 39.90"
            keyboardType="decimal-pad"
            error={errors.preco}
          />

          <InputField
            label="Descrição"
            value={descricao}
            onChangeText={(text) => {
              setDescricao(text);
              if (errors.descricao) {
                setErrors((prev) => ({ ...prev, descricao: undefined }));
              }
            }}
            placeholder="Ex: Pizza com molho de tomate, mussarela e manjericão fresco"
            multiline
            numberOfLines={4}
            style={{ minHeight: 100, textAlignVertical: 'top' }}
            error={errors.descricao}
          />

          {/* Botão de Cadastro */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCadastro}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>Cadastrar Item</Text>
              <Text style={styles.buttonIcon}>→</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          App Cardápio • React Native + TypeScript
        </Text>
      </ScrollView>

      {/* Modal de Sucesso */}
      <SuccessModal
        visible={modalVisible}
        item={itemCadastrado}
        onClose={handleCloseModal}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1A',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
    marginTop: 8,
  },
  formCard: {
    backgroundColor: '#14142B',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1E1E3A',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  formDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6C63FF',
    marginRight: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 18,
    marginTop: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 8,
  },
  buttonIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    color: '#3A3A50',
    fontSize: 12,
    marginTop: 32,
    letterSpacing: 0.5,
  },
});
