import React, { useState } from 'react';

import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Editar() {

  const router = useRouter();

  const params = useLocalSearchParams();

  const [titulo, setTitulo] = useState(params.titulo);
  const [bairro, setBairro] = useState(params.bairro);

  async function atualizarProblema() {

    if (titulo === '' || bairro === '') {

      Alert.alert(
        'Erro',
        'Preencha todos os campos'
      );

      return;
    }

    const dados = await AsyncStorage.getItem('problemas');

    let problemas = [];

    if (dados) {
      problemas = JSON.parse(dados);
    }

    const novaLista = problemas.map((item) => {

      if (item.id === params.id) {

        return {
          ...item,
          titulo,
          bairro,
        };
      }

      return item;
    });

    await AsyncStorage.setItem(
      'problemas',
      JSON.stringify(novaLista)
    );

    Alert.alert(
      'Sucesso',
      'Problema atualizado!'
    );

    router.back();
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Editar Problema
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={atualizarProblema}
      >
        <Text style={styles.buttonText}>
          Atualizar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#e9ecef',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#28a745',
  },

  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

});