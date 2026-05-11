import React, { useState } from 'react';

import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    useLocalSearchParams,
    useRouter
} from 'expo-router';

export default function Cadastro() {

  const router = useRouter();

  const params = useLocalSearchParams();

  const nomeUsuario = params.nome;

  const [titulo, setTitulo] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [fotos, setFotos] = useState('');

  async function salvarProblema() {

    if (
      titulo === '' ||
      bairro === '' ||
      cidade === '' ||
      cep === ''
    ) {

      Alert.alert(
        'Erro',
        'Preencha os campos obrigatórios'
      );

      return;
    }

    const dataAtual = new Date().toLocaleString('pt-BR');

    const novoProblema = {
      id: Date.now().toString(),
      titulo,
      bairro,
      cidade,
      cep,
      localizacao,
      fotos,
      reportadoPor: nomeUsuario,
      status: 'Pendente',
      data: dataAtual,
      observacao: '',
    };

    const dados = await AsyncStorage.getItem('problemas');

    let problemas = [];

    if (dados) {
      problemas = JSON.parse(dados);
    }

    problemas.push(novoProblema);

    await AsyncStorage.setItem(
      'problemas',
      JSON.stringify(problemas)
    );

    Alert.alert(
      'Sucesso',
      'Problema cadastrado!'
    );

    router.back();
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Novo Problema
      </Text>

      <Text style={styles.user}>
        Usuário: {nomeUsuario}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Título do problema"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
      />

      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
      />

      <TextInput
        style={styles.input}
        placeholder="Localização / Endereço"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade de fotos anexadas"
        value={fotos}
        onChangeText={setFotos}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={salvarProblema}
      >
        <Text style={styles.buttonText}>
          Salvar
        </Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e9ecef',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center',
    color: '#007bff',
  },

  user: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    color: '#555',
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
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

});