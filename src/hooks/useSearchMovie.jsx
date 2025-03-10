import { useState } from 'react';
import axios from 'axios';

const useSearchMovie = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apikey = 'd40e95d5';

  const searchMovie = async () => {
    if (!title) {
      setError('Please enter a movie title.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://www.omdbapi.com/', {
        params: {
          t: title,
          y: year,
          plot: 'full',
          apikey: apikey,
        },
      });

      if (response.data.Response === 'True') {
        setMovie(response.data);
      } else {
        setError(response.data.Error);
      }
    } catch (error) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    year,
    setYear,
    movie,
    loading,
    error,
    searchMovie,
  };
};

export default useSearchMovie;
