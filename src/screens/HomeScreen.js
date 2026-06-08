import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { fetchTrendingMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../services/api';
import HeroSection from '../components/HeroSection';
import MovieCarousel from '../components/MovieCarousel';
import colors from '../theme/colors';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [trendingData, topRatedData, upcomingData] = await Promise.all([
        fetchTrendingMovies(),
        fetchTopRatedMovies(),
        fetchUpcomingMovies(),
      ]);

      setTrending(trendingData);
      setTopRated(topRatedData);
      setUpcoming(upcomingData);
      
      if (trendingData.length > 0) {
        setHeroMovie(trendingData[0]);
      }
    } catch (error) {
      console.error('Error fetching home screen data', error);
    } finally {
      setLoading(false);
    }
  };

  const onMoviePress = (movie) => {
    navigation.navigate('Detail', { movieId: movie.id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {heroMovie && (
        <HeroSection 
          movie={heroMovie} 
          onPlay={() => navigation.navigate('Detail', { movieId: heroMovie.id })} 
        />
      )}
      
      <View style={styles.carouselsContainer}>
        <MovieCarousel 
          title="Trending Now" 
          movies={trending} 
          onMoviePress={onMoviePress} 
        />
        <MovieCarousel 
          title="Top Rated" 
          movies={topRated} 
          onMoviePress={onMoviePress} 
        />
        <MovieCarousel 
          title="Upcoming Releases" 
          movies={upcoming} 
          onMoviePress={onMoviePress} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  carouselsContainer: {
    paddingBottom: 20,
  }
});

export default HomeScreen;
