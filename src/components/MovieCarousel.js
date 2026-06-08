import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';
import colors from '../theme/colors';

const MovieCarousel = ({ title, movies, onMoviePress }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={onMoviePress} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginLeft: 16,
    marginBottom: 12,
  },
  listContainer: {
    paddingLeft: 16,
    paddingRight: 4, // 16 - 12 (marginRight of card)
  },
});

export default MovieCarousel;
