'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apikey = 'd40e95d5';
const url = `https://www.omdbapi.com/?apikey=${apikey}`;

const useDetailMovie = (imdbID) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(url, {
        params: {
          i: imdbID,
          plot: 'short',
        },
      });

      if (response.data.Response === 'True') {
        setMovie(response.data);
        setLoading(false);
      } else {
        console.error(
          `Error fetching details for ${imdbID}: ${response.data.Error}`,
        );
      }
    } catch (error) {
      console.error(`Error fetching details for ${imdbID}:`, error.message);
    }
  };

  useEffect(() => {
    fetchMovieDetails(imdbID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imdbID]);

  return { movie, loading };
};

export default useDetailMovie;
