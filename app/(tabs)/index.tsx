import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function HomeScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Ajuda Bairro
      </Text>

      <Text style={styles.subtitle}>
        Sistema de Gestão Urbana
      </Text>

      <TouchableOpacity
        style={styles.buttonUser}
        onPress={() =>
          router.push('/login-cidadao')
        }
      >
        <Text style={styles.buttonText}>
          Área do Cidadão
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonPrefeitura}
        onPress={() =>
          router.push('/login-prefeitura')
        }
      >
        <Text style={styles.buttonText}>
          Área da Prefeitura
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e9ecef',
  },

  title: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#007bff',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 50,
    color: '#555',
  },

  buttonUser: {
    backgroundColor: '#007bff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
  },

  buttonPrefeitura: {
    backgroundColor: '#28a745',
    padding: 18,
    borderRadius: 15,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

});