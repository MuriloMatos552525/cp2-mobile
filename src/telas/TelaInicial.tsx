import React, { useState, useEffect } from 'react';
import { ScrollView, Image, StyleSheet, SafeAreaView, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = '157c8aa1011d8ee27cbdbe624298e4a6';

const TelaInicial: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const popularResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const popularData = popularResponse.data.results;
      setPopularMovies(popularData);

      const topRatedResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      const topRatedData = topRatedResponse.data.results;
      setTopRatedMovies(topRatedData);

      const upcomingResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
      );
      const upcomingData = upcomingResponse.data.results;
      setUpcomingMovies(upcomingData);

      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setLoading(false);
    }
  };

  const handleMoviePress = (movieId: number) => {
    navigation.navigate('Detalhes', { movieId });
  };

  const renderMovieItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
    </TouchableOpacity>
  );

  const renderSection = (title: string, data: any[]) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((movie) => (
            <View key={movie.id} style={{ marginRight: 15 }}>
              <TouchableOpacity onPress={() => handleMoviePress(movie.id)}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                  style={styles.poster}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.emptyMessage}>Nenhum filme disponível no momento</Text>
      )}
    </View>
  );

  const handleLogoPress = () => {
    navigation.navigate('Desenvolvedores');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogoPress}>
          <Text style={styles.appName}>MovieMu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Pesquisa')}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        ) : (
          <>
            {renderSection('Filmes Populares', popularMovies)}
            {renderSection('Filmes Mais Bem Avaliados', topRatedMovies)}
            {renderSection('Próximos Lançamentos', upcomingMovies)}
          </>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.favoritesButton} onPress={() => navigation.navigate('Favoritos')}>
        <Ionicons name="heart" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 10,
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#fff',
  },
  favoritesButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#f44336',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TelaInicial;
