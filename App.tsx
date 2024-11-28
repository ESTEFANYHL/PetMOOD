// Importamos los módulos necesarios de React y React Native
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, // Componente para crear una vista contenedora
  Text, // Componente para mostrar texto
  StyleSheet, // Herramienta para estilizar los componentes
  TouchableOpacity, // Componente que hace un área táctil que responde a toques
  Dimensions, // Herramienta que permite obtener las dimensiones de la pantalla
  Animated, // Herramienta para crear animaciones fluidas
  Easing, // Función que facilita transiciones suaves en las animaciones
  Modal, // Componente para crear un modal (ventana emergente)
  ScrollView, // Componente para habilitar desplazamiento en vistas largas
  Image // Componente para mostrar imágenes
} from 'react-native';

// Extraemos las dimensiones de la pantalla del dispositivo
const { width, height } = Dimensions.get('window');

// Función para generar posiciones aleatorias para las huellas
const generateFootprints = () => {
  const footprints = []; // Creamos un array vacío donde guardaremos las huellas
  
  // Generamos 80 huellas con posiciones y tamaños aleatorios
  for (let i = 0; i < 80; i++) {
    footprints.push({
      left: Math.random() * width, // Posición horizontal aleatoria dentro del ancho de la pantalla
      top: Math.random() * height, // Posición vertical aleatoria dentro del alto de la pantalla
      size: 20 + Math.random() * 30, // Tamaño aleatorio entre 20 y 50
      opacity: Math.random() * 0.15 + 0.6, // Opacidad aleatoria entre 0.6 y 0.75 (para hacer las huellas más sutiles)
    });
  }
  return footprints; // Retornamos el array de huellas generadas
};

const App = () => {
  const [footprints] = useState(generateFootprints());
  const [modalVisible, setModalVisible] = useState(true); // Controla la visibilidad del modal
  const animatedValues = useRef(footprints.map(() => new Animated.Value(0))).current;
  const iconBounce = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    animatedValues.forEach((animatedValue) => {
      Animated.loop(
        Animated.sequence([ 
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 10000 + Math.random() * 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 10000 + Math.random() * 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    const bounceAnimation = () => {
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
      ]).start(() => {
        bounceAnimation();
      });
    };

    bounceAnimation();
  }, [animatedValues]);

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

  const handleAccept = () => {
    setModalVisible(false); // Cerrar el modal al aceptar
  };

  return (
    <View style={styles.container}>
      {/* Renderizar las huellas */}
      {footprints.map((footprint, index) => (
        <Animated.Text
          key={index}
          style={[styles.footprint, {
            left: footprint.left,
            top: footprint.top,
            fontSize: footprint.size,
            opacity: footprint.opacity,
            transform: [
              { translateY: animatedValues[index].interpolate({ inputRange: [0, 1], outputRange: [0, 20] }) },
              { translateX: animatedValues[index].interpolate({ inputRange: [0, 1], outputRange: [0, 15] }) },
            ],
          }]}>
          🐾
        </Animated.Text>
      ))}

      {/* Frame blanco translúcido */}
      <View style={styles.frame}>
        <Text style={styles.title}>LAIKA</Text>
        <Text style={styles.subtitle}>Entendiendo emociones, conectando corazones</Text>

        <Animated.View style={{ transform: [{ translateY: iconBounce }] }}>
          <View style={styles.iconContainer}>
            {/* Reemplazar el emoji con una imagen */}
            <Image 
              source={require('./LOGOO.png')} // Ruta de tu logo
              style={styles.iconImage}
            />
          </View>
        </Animated.View>

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
          <Text style={styles.footer}>
            ©LAIKA 2024. TODOS LOS DERECHOS RESERVADOS.
          </Text>
        </View>
      </View>

      {/* Modal con los Términos y Condiciones */}
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
                <Text style={{ fontWeight: 'bold' }}>TÉRMINOS Y CONDICIONES Y AVISO DE PRIVACIDAD DE LAIKA{'\n\n'}</Text>
                <Text style={{ fontWeight: 'bold' }}>CONECTANDO CORAZONES, ENTENDIENDO EMOCIONES{'\n\n'}</Text>
                En LAIKA valoramos y respetamos la privacidad de nuestros usuarios. Estos Términos y Condiciones junto con nuestro Aviso de Privacidad describen cómo recopilamos, utilizamos y protegemos la información personal que nos proporcionas a través de nuestra aplicación.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>1. Responsable del Tratamiento de Datos Personales{'\n'}</Text>
                LAIKA es una aplicación desarrollada para mejorar la calidad de vida de las mascotas y la interacción entre ellas y sus dueños. Somos responsables del tratamiento de los datos personales que recabamos de los usuarios. Nuestro objetivo principal es brindar un servicio que facilite la comprensión del comportamiento emocional y las necesidades de las mascotas, siempre respetando la privacidad y la protección de los datos.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>2. Información Recabada{'\n'}</Text>
                No almacenamos datos personales como nombres, correos electrónicos ni contraseñas. LAIKA no cuenta con un sistema de registro o autenticación de usuarios, y no recabamos datos para crear perfiles personales. Únicamente recopilamos información de las imágenes cargadas en la aplicación para brindar nuestros servicios.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>3. Finalidades del Tratamiento de Datos{'\n'}</Text>
                Los datos serán utilizados para los siguientes propósitos:{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>Finalidades Primarias:{'\n'}</Text>
                - Proveer los servicios de interpretación del comportamiento y emociones de la mascota.{'\n'}
                - Emitir recomendaciones personalizadas para mejorar la calidad de vida de tu mascota.{'\n'}
                - Generar reportes sobre el estado emocional de tu mascota.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>Finalidades Secundarias:{'\n'}</Text>
                - Realizar encuestas de satisfacción para mejorar el servicio.{'\n'}
                - Utilizar las imágenes que subas a la aplicación para entrenar y mejorar nuestra Inteligencia Artificial, con el fin de mejorar la precisión de la interpretación de emociones de las mascotas. Estas imágenes se emplearán exclusivamente para fines de entrenamiento y mejora del modelo.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>4. Protección de la Información{'\n'}</Text>
                Nos comprometemos a mantener la confidencialidad y seguridad de tu información. Hemos implementado medidas técnicas y organizativas adecuadas para proteger la información contra pérdida, mal uso, acceso no autorizado, alteración y destrucción.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>5. Transferencia de Datos{'\n'}</Text>
                No transferimos tus datos personales a terceros sin tu consentimiento previo, salvo para cumplir con obligaciones legales. En caso de realizar transferencias, siempre se te notificará con antelación.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>6. Derechos ARCO (Acceso, Rectificación, Cancelación, Oposición){'\n'}</Text>
                Dado que no recabamos información personal, los derechos ARCO no son aplicables en esta plataforma. Sin embargo, si tienes preguntas sobre el uso de las imágenes proporcionadas, puedes contactarnos en: privacidad@laika.app.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>7. Condiciones de Uso{'\n'}</Text>
                - <Text style={{ fontWeight: 'bold' }}>Uso de la Aplicación:</Text> LAIKA está diseñada para ayudar a los dueños de mascotas a interpretar el comportamiento emocional de sus mascotas. Al utilizar la aplicación, aceptas que cualquier sugerencia o información proporcionada es únicamente de referencia y no sustituye la atención veterinaria profesional.{'\n'}
                - <Text style={{ fontWeight: 'bold' }}>Prohibiciones:</Text> Está prohibido el uso de la aplicación con fines ilícitos o que puedan dañar a terceros. La manipulación malintencionada de las imágenes o el uso no autorizado del contenido de la aplicación está estrictamente prohibido.{'\n'}
                - <Text style={{ fontWeight: 'bold' }}>Responsabilidad del Usuario:</Text> Al utilizar la aplicación, el usuario se compromete a hacer un uso responsable y adecuado de la misma. La precisión del análisis de las emociones de las mascotas puede depender de varios factores, como la calidad de la imagen y el entorno en el que se encuentre la mascota.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>8. Modificaciones al Aviso de Privacidad y Términos y Condiciones{'\n'}</Text>
                Este aviso de privacidad y los términos y condiciones pueden sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales, de nuestras propias necesidades, de los servicios que ofrecemos, de nuestras prácticas de privacidad o de otros motivos. Te notificaremos a través de la aplicación o de nuestro sitio web sobre cualquier cambio significativo.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>9. Contacto{'\n'}</Text>
                Si tienes preguntas o necesitas mayor información sobre nuestros Términos y Condiciones o nuestro Aviso de Privacidad, no dudes en contactarnos al correo: privacidad@laika.app.
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
    color: '#293855',
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
    fontSize: 45,
    fontWeight: 'bold',
    color: '#4165D5',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 26,
    color: '#4165D5',
    marginBottom: 50,
    textAlign: 'center',
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
  },
  iconImage: {
    width: 150, // Incrementado para hacer el logo más grande
    height: 150, // Incrementado para hacer el logo más grande
    resizeMode: 'contain', // Para que la imagen se ajuste bien dentro del círculo
  },
  button: {
    backgroundColor: '#F1AC20',
    borderRadius: 35,
    paddingVertical: 20,
    paddingHorizontal: 60,
    marginVertical: 25,
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
  footer: {
    fontSize: 14,
    color: '#293855',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#293855',
    textAlign: 'justify',
  },
  acceptButton: {
    backgroundColor: '#4165D5',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
