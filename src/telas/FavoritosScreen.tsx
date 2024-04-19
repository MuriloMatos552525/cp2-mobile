import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Movie {
  id: number;
  poster_path?: string; // Optional property for poster image URL
  title: string;
}

const FavoritosScreen: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const loadFavoriteMovies = async () => {
    try {
      const data = await AsyncStorage.getItem('favoriteMovies');
      if (data !== null) {
        const parsedData = JSON.parse(data); // Parse retrieved data
        setFavoriteMovies(parsedData);
      }
    } catch (error) {
      console.error('Erro ao carregar filmes favoritos:', error);
    } finally {
      setIsLoading(false); // Always set loading to false after operation
    }
  };

  const saveFavoriteMovies = async (movies: Movie[]) => {
    try {
      const stringifiedData = JSON.stringify(movies);
      await AsyncStorage.setItem('favoriteMovies', stringifiedData);
    } catch (error) {
      console.error('Erro ao salvar filmes favoritos:', error);
    }
  };

  const handleAddFavoriteMovie = (movie: Movie) => {
    const updatedFavorites = [...favoriteMovies, movie];
    setFavoriteMovies(updatedFavorites);
    saveFavoriteMovies(updatedFavorites);
  };

  const handleRemoveFavoriteMovie = (movieId: number) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);
    saveFavoriteMovies(updatedFavorites);
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity style={styles.movieContainer}>
      {item?.poster_path && ( // Optional rendering for poster image
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.poster}
        />
      )}
      <Text style={styles.title}>{item?.title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    loadFavoriteMovies(); // Fetch data on component mount
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Carregando filmes favoritos...</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          renderItem={renderItem}
          keyExtractor={(item) => (item ? item.id.toString() : '')}
          horizontal
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  movieContainer: {
    marginRight: 15,
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoritosScreen;
