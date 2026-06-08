import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { fetchMovieDetails } from '../services/api';
import colors from '../theme/colors';

const { width } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie details', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load movie details.</Text>
      </View>
    );
  }

  // Find the first youtube trailer
  const trailer = movie.videos?.results?.find(
    (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
  );

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <ScrollView style={styles.container} bounces={false}>
      {trailer ? (
        <View style={styles.playerContainer}>
          <YoutubePlayer
            height={220}
            play={false}
            videoId={trailer.key}
          />
        </View>
      ) : backdropUrl ? (
        <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
      ) : (
        <View style={styles.placeholderBackdrop} />
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movie.title || movie.original_title}</Text>
        
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</Text>
          <Text style={styles.metaSeparator}>•</Text>
          <Text style={styles.metaText}>{movie.runtime} min</Text>
          <Text style={styles.metaSeparator}>•</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.metaText}>{movie.vote_average?.toFixed(1)}/10</Text>
          </View>
        </View>

        <View style={styles.genresContainer}>
          {movie.genres?.map((genre) => (
            <View key={genre.id} style={styles.genreBadge}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Plot Summary</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.textPrimary,
  },
  playerContainer: {
    width: '100%',
    backgroundColor: '#000',
    marginTop: 50, // safe area spacing if no header
  },
  backdrop: {
    width: '100%',
    height: 220,
    marginTop: 50,
  },
  placeholderBackdrop: {
    width: '100%',
    height: 220,
    backgroundColor: colors.surface,
    marginTop: 50,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  metaSeparator: {
    color: colors.textSecondary,
    marginHorizontal: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    color: colors.rating,
    marginRight: 4,
    fontSize: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  genreBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  genreText: {
    color: colors.textPrimary,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  overview: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
});

export default DetailScreen;
