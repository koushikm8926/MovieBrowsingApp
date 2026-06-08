import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { searchMovies } from '../services/api';
import colors from '../theme/colors';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const performSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const data = await searchMovies(searchQuery);
      setResults(data);
    } catch (error) {
      console.error('Search error', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const imageUrl = item.poster_path 
      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
      : null;

    return (
      <TouchableOpacity 
        style={styles.resultItem} 
        onPress={() => navigation.navigate('Detail', { movieId: item.id })}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.poster} />
        ) : (
          <View style={styles.posterPlaceholder} />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>{item.title || item.original_title}</Text>
          <Text style={styles.year}>
            {item.release_date ? item.release_date.split('-')[0] : 'N/A'}
          </Text>
          <Text style={styles.overview} numberOfLines={2}>{item.overview}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          autoFocus={true}
        />
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            query.trim() && !loading ? (
              <Text style={styles.emptyText}>No results found for "{query}"</Text>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 50, // For safe area if not using header
    backgroundColor: colors.surface,
  },
  searchInput: {
    backgroundColor: colors.background,
    color: colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  },
  loader: {
    marginTop: 40,
  },
  listContainer: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: {
    width: 80,
    height: 120,
  },
  posterPlaceholder: {
    width: 80,
    height: 120,
    backgroundColor: colors.border,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  overview: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default SearchScreen;
