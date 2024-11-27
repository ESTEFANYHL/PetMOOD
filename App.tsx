import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Generar posiciones aleatorias para las huellas
const generateFootprints = () => {
  const footprints = [];
  for (let i = 0; i < 80; i++) {
    // Generar las huellas con propiedades aleatorias
    footprints.push({
      left: Math.random() * width, // Posición horizontal aleatoria dentro del ancho de la pantalla
      top: Math.random() * height, // Posición vertical aleatoria dentro de la altura de la pantalla
      size: 20 + Math.random() * 30, // Tamaño de la huella, entre 20 y 50
      opacity: Math.random() * 0.15 + 0.6, // Opacidad aleatoria entre 0.6 y 0.75
    });
  }
  return footprints; // Devolver el array con las huellas generadas
};

const App = () => {
  // Estado para almacenar las huellas generadas al azar
  const [footprints] = useState(generateFootprints());

  // Referencias animadas para controlar la animación de cada huella y del icono del perro
  const animatedValues = useRef(footprints.map(() => new Animated.Value(0))).current;
  const iconBounce = useRef(new Animated.Value(0)).current; // Valor animado para el rebote del ícono del perro
  const scaleAnim = useRef(new Animated.Value(1)).current; // Valor animado para el botón de la cámara

  useEffect(() => {
    // Animar las huellas
    animatedValues.forEach((animatedValue) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1, // Animar al valor 1
            duration: 10000 + Math.random() * 5000, // Duración aleatoria entre 10 y 15 segundos
            easing: Easing.inOut(Easing.ease), // Efecto de suavizado de entrada y salida
            useNativeDriver: true, // Usar el controlador nativo para mejor rendimiento
          }),
          Animated.timing(animatedValue, {
            toValue: 0, // Volver al valor 0
            duration: 10000 + Math.random() * 5000, // Duración aleatoria entre 10 y 15 segundos
            easing: Easing.inOut(Easing.ease), // Efecto de suavizado de entrada y salida
            useNativeDriver: true, // Usar el controlador nativo para mejor rendimiento
          }),
        ]),
      ).start(); // Iniciar la animación en bucle
    });

    // Animación continua de rebote del ícono del perro sin reinicio abrupto
    const bounceAnimation = () => {
      Animated.sequence([
        Animated.timing(iconBounce, {
          toValue: 8, // Desplazarse hacia arriba
          duration: 1900, // Duración de 1.9 segundos
          easing: Easing.inOut(Easing.ease), // Suavizado de entrada y salida
          useNativeDriver: true, // Usar el controlador nativo
        }),
        Animated.timing(iconBounce, {
          toValue: -8, // Desplazarse hacia abajo
          duration: 1900, // Duración de 1.9 segundos
          easing: Easing.inOut(Easing.ease), // Suavizado de entrada y salida
          useNativeDriver: true, // Usar el controlador nativo
        }),
      ]).start(() => {
        // Reiniciar la animación para un movimiento continuo
        bounceAnimation();
      });
    };

    bounceAnimation(); // Iniciar la animación de rebote
  }, [animatedValues]);

  // Animación al presionar el botón
  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Reducir ligeramente el tamaño
      useNativeDriver: true, // Usar el controlador nativo
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Volver al tamaño original
      friction: 3, // Fricción para controlar el rebote
      tension: 40, // Tensión para controlar la velocidad
      useNativeDriver: true, // Usar el controlador nativo
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Renderizar las huellas */}
      {footprints.map((footprint, index) => (
        <Animated.Text
          key={index} // Clave única para cada huella
          style={[
            styles.footprint,
            {
              left: footprint.left, // Posición horizontal de la huella
              top: footprint.top, // Posición vertical de la huella
              fontSize: footprint.size, // Tamaño de la huella
              opacity: footprint.opacity, // Opacidad de la huella
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
          🐾{/* Emoji de huella */}
        </Animated.Text>
      ))}

      {/* Frame blanco translúcido */}
      <View style={styles.frame}>
        {/* Título sin animación, con sombra */}
        <Text style={styles.title}>LAIKA</Text>

        {/* Eslogan con sombra */}
        <Text style={styles.subtitle}>Conectando corazones, entendiendo emociones</Text>

        {/* Ícono central del perro con animación de rebote continua */}
        <Animated.View style={{ transform: [{ translateY: iconBounce }] }}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🐕{/* Emoji de perro */}</Text>
          </View>
        </Animated.View>

        {/* Botón de Cámara con animación de pulso */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.button}
            onPressIn={onPressIn} // Animar cuando se presiona el botón
            onPressOut={onPressOut} // Animar cuando se suelta el botón
          >
            <Text style={styles.buttonText}>ABRIR CÁMARA</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Aviso de privacidad y derechos reservados */}
        <View style={styles.footerContainer}>
          <Text style={styles.privacyNotice}>AVISO DE PRIVACIDAD</Text>
          <Text style={styles.footer}>©LAIKA 2024. TODOS LOS DERECHOS RESERVADOS.</Text>
        </View>
      </View>
    </View>
  );
};

// Estilos de la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible
    backgroundColor: '#FFFFFF', // Fondo blanco
    alignItems: 'center', // Alinear elementos horizontalmente al centro
    justifyContent: 'center', // Alinear elementos verticalmente al centro
    paddingHorizontal: 20, // Relleno horizontal
  },
  footprint: {
    position: 'absolute', // Posicionar cada huella de forma absoluta
    color: '#293855', // Azul oscuro para las huellas
  },
  frame: {
    width: '95%', // Ancho del frame
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Frame blanco translúcido más transparente
    borderRadius: 25, // Bordes redondeados
    padding: 30, // Relleno interno del frame
    alignItems: 'center', // Alinear elementos horizontalmente al centro
    shadowColor: '#000', // Sombra para el frame
    shadowOffset: { width: 0, height: 5 }, // Offset de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 10, // Radio de difusión de la sombra
  },
  title: {
    fontSize: 45, // Tamaño de fuente del título
    fontWeight: 'bold', // Negrita
    color: '#4165D5', // Azul claro
    marginBottom: 15, // Margen inferior
    textAlign: 'center', // Alinear texto al centro
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Sombra al título
    textShadowOffset: { width: 2, height: 2 }, // Offset de la sombra
    textShadowRadius: 4, // Radio de la sombra
    zIndex: 1, // Asegura que el título esté por encima
  },
  subtitle: {
    fontSize: 26, // Tamaño de fuente del subtítulo
    color: '#4165D5', // Azul claro
    marginBottom: 50, // Margen inferior
    textAlign: 'center', // Alinear texto al centro
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // Hacer la sombra más oscura para resaltar el texto
    textShadowOffset: { width: 3, height: 3 }, // Offset de la sombra
    textShadowRadius: 6, // Radio de la sombra
    zIndex: 1, // Asegura que el subtítulo esté por encima
  },
  iconContainer: {
    width: 180, // Ancho del contenedor del icono
    height: 180, // Alto del contenedor del icono
    borderRadius: 90, // Bordes redondeados para formar un círculo
    borderWidth: 7, // Grosor del borde
    borderColor: '#4165D5', // Color del borde
    alignItems: 'center', // Alinear icono horizontalmente al centro
    justifyContent: 'center', // Alinear icono verticalmente al centro
    marginBottom: 50, // Margen inferior
    zIndex: 1, // Asegura que el icono esté por encima
  },
  icon: {
    fontSize: 110, // Tamaño del emoji del perro
  },
  button: {
    backgroundColor: '#F1AC20', // Color de fondo del botón
    borderRadius: 35, // Bordes redondeados
    paddingVertical: 20, // Relleno vertical
    paddingHorizontal: 60, // Relleno horizontal
    marginVertical: 25, // Margen vertical
    zIndex: 1, // Asegura que el botón esté por encima
  },
  buttonText: {
    color: '#FFFFFF', // Color del texto del botón
    fontSize: 22, // Tamaño de fuente del texto
    fontWeight: 'bold', // Negrita
    textAlign: 'center', // Alinear texto al centro
  },
  footerContainer: {
    marginTop: 30, // Margen superior
    alignItems: 'center', // Alinear elementos horizontalmente al centro
  },
  privacyNotice: {
    fontSize: 16, // Tamaño de fuente del aviso de privacidad
    color: '#293855', // Color del texto
    textDecorationLine: 'underline', // Subrayado
    marginBottom: 5, // Margen inferior
    textAlign: 'center', // Alinear texto al centro
  },
  footer: {
    fontSize: 14, // Tamaño de fuente del pie de página
    color: '#293855', // Color del texto
    textAlign: 'center', // Centrar el texto de derechos reservados
  },
});

export default App; // Exportar el componente App para su uso en otras partes de la aplicación
