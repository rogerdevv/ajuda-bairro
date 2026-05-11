import React, { useEffect, useState } from 'react';

import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    useFocusEffect,
    useLocalSearchParams,
    useRouter
} from 'expo-router';

export default function Cidadao() {

  const router = useRouter();

  const params = useLocalSearchParams();

  const nomeUsuario = params.nome;

  const [problemas, setProblemas] = useState([]);

  async function carregarProblemas() {

    const dados = await AsyncStorage.getItem('problemas');

    if (dados) {
      setProblemas(JSON.parse(dados));
    }
  }

  async function deletarProblema(id) {

    const novaLista = problemas.filter(
      (item) => item.id !== id
    );

    setProblemas(novaLista);

    await AsyncStorage.setItem(
      'problemas',
      JSON.stringify(novaLista)
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
        Área do Cidadão
      </Text>

      <Text style={styles.user}>
        Usuário: {nomeUsuario}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: '/cadastro',
            params: {
              nome: nomeUsuario,
            },
          })
        }
      >
        <Text style={styles.buttonText}>
          Novo Problema
        </Text>
      </TouchableOpacity>

      <FlatList
        data={problemas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum problema cadastrado.
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

            {item.observacao ? (
              <View style={styles.obsBox}>

                <Text style={styles.obsTitle}>
                  Observação da Prefeitura
                </Text>

                <Text style={styles.obsText}>
                  {item.observacao}
                </Text>

              </View>
            ) : null}

            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                router.push({
                  pathname: '/editar',
                  params: {
                    id: item.id,
                    titulo: item.titulo,
                    bairro: item.bairro,
                  },
                })
              }
            >
              <Text style={styles.editButtonText}>
                Editar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deletarProblema(item.id)}
            >
              <Text style={styles.deleteButtonText}>
                Excluir
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
    textAlign: 'center',
    color: '#007bff',
  },

  user: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#555',
  },

  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
    fontSize: 15,
    color: '#333',
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

  obsBox: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },

  obsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },

  obsText: {
    color: '#555',
  },

  editButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },

  editButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  deleteButtonText: {
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