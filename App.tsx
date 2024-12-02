import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Modal, ScrollView, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

// Función para generar posiciones aleatorias para las huellas
const generateFootprints = () => {
  const footprints = [];
  for (let i = 0; i < 80; i++) {
    footprints.push({
      left: Math.random() * width,
      top: Math.random() * height,
      size: 20 + Math.random() * 30,
      opacity: Math.random() * 0.15 + 0.6,
    });
  }
  return footprints;
};

const App = () => {
  const [footprints] = useState(generateFootprints());
  const [modalVisible, setModalVisible] = useState(true);

  const recommendations = [
    "Juega con él para liberar energía.",
    "Dale un baño relajante y acaricia su pelaje.",
    "Prueba con un paseo al aire libre para cambiar de ambiente.",
    "Ofrece sus golosinas favoritas para levantar su ánimo.",
    "Bríndale compañía, los perros se sienten mejor cuando están acompañados."
  ];

  const handleAccept = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {footprints.map((footprint, index) => (
        <Animated.Text
          key={index}
          style={[styles.footprint, {
            left: footprint.left,
            top: footprint.top,
            fontSize: footprint.size,
            opacity: footprint.opacity,
          }]}
        >
          🐾
        </Animated.Text>
      ))}

      <View style={styles.frame}>
        <Text style={styles.title}>¡Haz Sonreír a Tu Perro!</Text>
        <Text style={styles.subtitle}>Recomendaciones para mejorar su estado de ánimo</Text>

        <View style={styles.recommendationsContainer}>
          {recommendations.map((recommendation, index) => (
            <Text key={index} style={styles.recommendation}>
              - {recommendation}
            </Text>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAccept}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Términos y Condiciones</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.termsText}>
                <Text style={{ fontWeight: 'bold' }}>TÉRMINOS Y CONDICIONES{'\n\n'}</Text>
                En nuestra aplicación, valoramos y protegemos la privacidad de los usuarios y sus mascotas. Utilizamos la información proporcionada para mejorar la experiencia y el bienestar de los animales.{' '}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}
            >
              <Text style={styles.acceptButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footprint: {
    position: 'absolute',
    fontFamily: 'monospace',
    color: 'rgba(0, 0, 0, 0.3)',
  },
  frame: {
    width: '95%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e2e2e',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  recommendationsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  recommendation: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  footer: {
    fontSize: 12,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  scrollViewContent: {
    maxHeight: 400,
  },
  termsText: {
    fontSize: 14,
    color: '#555',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 20,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;

