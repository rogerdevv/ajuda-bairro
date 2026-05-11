import React, { useState } from 'react';

import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function LoginCidadao() {

  const router = useRouter();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  function entrar() {

    if (
      usuario === 'cidadao' &&
      senha === '123'
    ) {

      router.push({
        pathname: '/cidadao',
        params: {
          nome,
        },
      });

    } else {

      Alert.alert(
        'Erro',
        'Usuário ou senha inválidos'
      );
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Login Cidadão
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={entrar}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        usuário: cidadao
      </Text>

      <Text style={styles.info}>
        senha: 123
      </Text>

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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#007bff',
  },

  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  info: {
    textAlign: 'center',
    marginTop: 15,
    color: '#555',
  },

});