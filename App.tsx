import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Generar posiciones aleatorias para las huellas
const generateFootprints = () => {
  const footprints = [];
  for (let i = 0; i < 80; i++) {
    footprints.push({
      left: Math.random() * width,
      top: Math.random() * height,
      size: 20 + Math.random() * 30,
      opacity: Math.random() * 0.15 + 0.6, // Opacidad aleatoria entre 0.6 y 0.75
    });
  }
  return footprints;
};

const App = () => {
  const [footprints] = useState(generateFootprints());
  const animatedValues = useRef(footprints.map(() => new Animated.Value(0))).current;
  const iconBounce = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animar las huellas
    animatedValues.forEach((animatedValue) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 10000 + Math.random() * 5000, // Duración aleatoria más lenta para cada huella
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 10000 + Math.random() * 5000, // Duración aleatoria más lenta para cada huella
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });

    // Animar el rebote del ícono del perro
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconBounce, {
          toValue: 8,
          duration: 1900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(iconBounce, {
          toValue: -8,
          duration: 1900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animatedValues, iconBounce]);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Renderizar las huellas */}
      {footprints.map((footprint, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.footprint,
            {
              left: footprint.left,
              top: footprint.top,
              fontSize: footprint.size,
              opacity: footprint.opacity,
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 20], // Movimiento sutil de arriba a abajo
                  }),
                },
                {
                  translateX: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 15], // Movimiento sutil hacia la derecha e izquierda
                  }),
                },
              ],
            },
          ]}
        >
          🐾
        </Animated.Text>
      ))}

      {/* Frame blanco translúcido */}
      <View style={styles.frame}>
        {/* Título sin animación, con sombra */}
        <Text style={styles.title}>PETMOOD</Text>

        {/* Eslogan con sombra */}
        <Text style={styles.subtitle}>¡Conecta con la alegría de tu mascota!</Text>

        {/* Icono central del perro con animación de rebote */}
        <Animated.View style={{ transform: [{ translateY: iconBounce }] }}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🐕</Text>
          </View>
        </Animated.View>

        {/* Botón de Cámara sin animación de pulso */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.button}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <Text style={styles.buttonText}>ABRIR CÁMARA</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Aviso de privacidad y derechos reservados */}
        <View style={styles.footerContainer}>
          <Text style={styles.privacyNotice}>AVISO DE PRIVACIDAD</Text>
          <Text style={styles.footer}>©PET MOOD 2024. TODOS LOS DERECHOS RESERVADOS.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footprint: {
    position: 'absolute',
    color: '#293855', // Azul oscuro para las huellas
  },
  frame: {
    width: '95%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Frame blanco translúcido más transparente
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000', // Sombra para el frame
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#4165D5', // Azul claro
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Sombra al título
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    zIndex: 1,
  },
  subtitle: {
    fontSize: 26,
    color: '#4165D5',
    marginBottom: 50,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // Hacer la sombra más oscura para resaltar el texto
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    zIndex: 1,
  },
  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 7,
    borderColor: '#4165D5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    zIndex: 1,
  },
  icon: {
    fontSize: 110,
  },
  button: {
    backgroundColor: '#F1AC20',
    borderRadius: 35,
    paddingVertical: 20,
    paddingHorizontal: 60,
    marginVertical: 25,
    zIndex: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  privacyNotice: {
    fontSize: 16,
    color: '#293855',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  footer: {
    fontSize: 14,
    color: '#293855',
  },
});

export default App;
