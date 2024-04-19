import React, { useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated } from 'react-native';

const SobreScreen = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sobre o App</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipe de Desenvolvimento</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Gerente de Projeto:</Text>
          <Text style={styles.value}>Giovanna Alvarez</Text>
          <Text style={styles.value}>RMxxxxxx</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Desenvolvedor Frontend:</Text>
          <Text style={styles.value}>Murilo Matos</Text>
          <Text style={styles.value}>RM552525</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Funcionamento do App</Text>
        <Text style={styles.description}>
          O MovieMu é um aplicativo para visualização de informações sobre filmes, 
          incluindo detalhes sobre lançamentos populares, avaliações de usuários e 
          informações sobre os filmes mais bem avaliados. Os usuários podem pesquisar 
          por filmes específicos, visualizar detalhes como sinopse, elenco, data de 
          lançamento e muito mais. Além disso, o aplicativo permite que os usuários 
          salvem seus filmes favoritos para acessá-los facilmente posteriormente.
        </Text>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]}>
          <Text style={styles.buttonText}>Clique Aqui</Text>
        </Animated.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
    backgroundColor: '#222', // Cor de fundo
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Montserrat', // Fonte moderna
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Sombra
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Montserrat', // Fonte moderna
  },
  item: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#aaa',
    fontFamily: 'Montserrat', // Fonte moderna
  },
  value: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Montserrat', // Fonte moderna
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
    fontFamily: 'Montserrat', // Fonte moderna
  },
  button: {
    backgroundColor: '#3f51b5',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20, // Bordas arredondadas
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Montserrat', // Fonte moderna
  },
});

export default SobreScreen;
