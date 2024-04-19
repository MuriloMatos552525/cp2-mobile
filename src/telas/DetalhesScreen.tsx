import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = '157c8aa1011d8ee27cbdbe624298e4a6';

interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

const DetalhesScreen: React.FC<any> = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );
      const data = response.data;
      const details: MovieDetails = {
        title: data.title,
        overview: data.overview,
        poster_path: data.poster_path,
        release_date: data.release_date,
      };
      setMovieDetails(details);
    } catch (error) {
      console.error('Erro ao buscar os detalhes do filme:', error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const favoriteMovies = await AsyncStorage.getItem('favoriteMovies');
      const parsedFavoriteMovies: MovieDetails[] = favoriteMovies ? JSON.parse(favoriteMovies) : [];
      const isAlreadyFavorite = parsedFavoriteMovies.some((movie: MovieDetails) => movie.title === movieDetails?.title);
      
      if (isAlreadyFavorite) {
        Alert.alert('Aviso', 'Este filme já está nos favoritos.');
      } else {
        parsedFavoriteMovies.push(movieDetails);
        await AsyncStorage.setItem('favoriteMovies', JSON.stringify(parsedFavoriteMovies));
        Alert.alert('Sucesso', 'O filme foi adicionado aos favoritos.');
      }
    } catch (error) {
      console.error('Erro ao adicionar filme aos favoritos:', error);
      Alert.alert('Erro', 'Houve um erro ao adicionar o filme aos favoritos. Por favor, tente novamente mais tarde.');
    }
  };

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movieDetails.title}</Text>
      <Text style={styles.releaseDate}>Lançamento: {movieDetails.release_date}</Text>
      <Text style={styles.overview}>{movieDetails.overview}</Text>
      <TouchableOpacity style={styles.addToFavoritesButton} onPress={handleAddToFavorites}>
        <Text style={styles.addToFavoritesButtonText}>Adicionar aos Favoritos</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  poster: {
    width: 300,
    height: 450,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  addToFavoritesButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  addToFavoritesButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetalhesScreen;
