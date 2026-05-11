import React, { useEffect, useState } from 'react';

import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function Prefeitura() {

  const [problemas, setProblemas] = useState([]);
  const [observacao, setObservacao] = useState('');

  async function carregarProblemas() {

    const dados = await AsyncStorage.getItem('problemas');

    if (dados) {
      setProblemas(JSON.parse(dados));
    }
  }

  async function atualizarStatus(id, novoStatus) {

    const novaLista = problemas.map((item) => {

      if (item.id === id) {

        return {
          ...item,
          status: novoStatus,
          observacao: observacao,
        };
      }

      return item;
    });

    setProblemas(novaLista);

    await AsyncStorage.setItem(
      'problemas',
      JSON.stringify(novaLista)
    );

    setObservacao('');

    Alert.alert(
      'Sucesso',
      'Status atualizado!'
    );
  }

  useEffect(() => {
    carregarProblemas();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      carregarProblemas();
    }, [])
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Área da Prefeitura
      </Text>

      <FlatList
        data={problemas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum problema encontrado.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.cardTitle}>
              {item.titulo}
            </Text>

            <Text style={styles.cardText}>
              Bairro: {item.bairro}
            </Text>

            <Text style={styles.cardText}>
              Cidade: {item.cidade}
            </Text>

            <Text style={styles.cardText}>
              CEP: {item.cep}
            </Text>

            <Text style={styles.cardText}>
              Localização: {item.localizacao}
            </Text>

            <Text style={styles.cardText}>
              Fotos anexadas: {item.fotos}
            </Text>

            <Text style={styles.reportado}>
              Reportado por: {item.reportadoPor}
            </Text>

            <Text style={styles.data}>
              Data: {item.data}
            </Text>

            <Text
              style={[
                styles.status,

                item.status === 'Resolvido'
                  ? styles.statusResolvido

                  : item.status === 'Em andamento'
                  ? styles.statusAndamento

                  : styles.statusPendente
              ]}
            >
              Status: {item.status || 'Pendente'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Adicionar observação"
              value={observacao}
              onChangeText={setObservacao}
            />

            {item.observacao ? (
              <Text style={styles.obsAtual}>
                Obs atual: {item.observacao}
              </Text>
            ) : null}

            <TouchableOpacity
              style={styles.andamentoButton}
              onPress={() =>
                atualizarStatus(
                  item.id,
                  'Em andamento'
                )
              }
            >
              <Text style={styles.buttonText}>
                Em andamento
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resolveButton}
              onPress={() =>
                atualizarStatus(
                  item.id,
                  'Resolvido'
                )
              }
            >
              <Text style={styles.buttonText}>
                Resolver
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

    </View>
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#28a745',
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  cardText: {
    marginTop: 5,
    fontSize: 16,
    color: '#555',
  },

  reportado: {
    marginTop: 10,
    fontWeight: 'bold',
  },

  data: {
    marginTop: 5,
    color: '#666',
  },

  status: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },

  statusPendente: {
    color: '#dc3545',
  },

  statusAndamento: {
    color: '#ffc107',
  },

  statusResolvido: {
    color: '#28a745',
  },

  input: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
  },

  obsAtual: {
    marginBottom: 10,
    color: '#555',
    fontStyle: 'italic',
  },

  andamentoButton: {
    backgroundColor: '#ffc107',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  resolveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },

});