import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivacyNotice = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aviso de Privacidad</Text>
      <Text style={styles.text}>
        Este es el aviso de privacidad de LAIKA. Aquí explicaremos cómo usamos los datos...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PrivacyNotice;