import React from 'react';
import { Input, Button, Image, Skeleton } from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import ModalDetailMovie from '@/components/ModalDetailMovie';

const SearchMovie = ({
  title,
  setTitle,
  year,
  setYear,
  movie,
  loading,
  error,
  searchMovie,
}) => {
  return (
    <div className="sm:mx-20 mx-2 my-8">
      <div className="flex sm:gap-8 gap-1 mb-4">
        <Input
          size="large"
          style={{ borderColor: 'black' }}
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          size="large"
          style={{ width: '300px', borderColor: 'black' }}
          placeholder="Year"
          prefix={<CalendarOutlined />}
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: '#1f2937' }}
          onClick={searchMovie}
          loading={loading}
        >
          Search
        </Button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {movie && (
        <div className="flex sm:justify-start justify-center sm:flex-nowrap flex-wrap items-start p-4 sm:gap-10 gap-2 border border-gray-300 rounded-md">
          {movie.Poster == 'N/A' ? (
            <Skeleton.Image
              style={{ height: '200px', width: '150px' }}
              active={false}
            />
          ) : (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              style={{ height: '200px', width: '150px' }}
            />
          )}
          <div className="sm:mt-8">
            <h2 className="sm:text-xl text-lg font-bold">{movie.Title}</h2>
            <p className="mb-4">{movie.Plot}</p>
            <p>Year: {movie.Year}</p>
            <p>Rating: {movie.imdbRating}</p>
            <ModalDetailMovie imdbID={movie.imdbID} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMovie;
