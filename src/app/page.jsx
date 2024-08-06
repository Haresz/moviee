'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoviesByGenre } from '../redux/moviesSlice';
import useSearchMovie from '@/hooks/useSearchMovie';
import MovieList from '../components/MovieList';
import SearchMovie from '../components/SearchMovie';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const loadingPopular = useSelector((state) => state.movies.loading);

  useEffect(() => {
    dispatch(fetchMoviesByGenre());
  }, [dispatch]);
  const { title, setTitle, year, setYear, movie, loading, error, searchMovie } =
    useSearchMovie();

  return (
    <>
      <MovieList movies={movies} loadingPopular={loadingPopular} />
      <SearchMovie
        title={title}
        setTitle={setTitle}
        year={year}
        setYear={setYear}
        movie={movie}
        loading={loading}
        error={error}
        searchMovie={searchMovie}
      />
    </>
  );
};

export default Home;
