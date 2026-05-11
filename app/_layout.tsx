import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
    <Stack>

      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="cidadao"
        options={{
          title: 'Área do Cidadão',
        }}
      />

      <Stack.Screen
        name="prefeitura"
        options={{
          title: 'Área da Prefeitura',
        }}
      />

      <Stack.Screen
        name="cadastro"
        options={{
          title: 'Novo Problema',
        }}
      />

      <Stack.Screen
        name="editar"
        options={{
          title: 'Editar Problema',
        }}
      />

    </Stack>
  );
}