'use client';
import React, { useEffect } from 'react';
import { Carousel, Image, Skeleton } from 'antd';

const getHighestRatedMovie = (movies) => {
  return movies.reduce((highest, movie) => {
    const rating = parseFloat(movie.imdbRating);
    return rating > (highest.imdbRating || 0) ? movie : highest;
  }, {});
};

const MovieList = ({ movies, loadingPopular }) => {
  return (
    <div className="mx-auto">
      {loadingPopular ? (
        <div className="min-h-[600px] text-white shadow-lg overflow-hidden bg-gray-800">
          <div className="h-full sm:mt-20 mt-2 p-4">
            <div className="h-full flex justify-center sm:items-start items-center sm:gap-10 gap-2">
              <Skeleton.Image
                active={true}
                style={{ width: 350, height: 450 }}
              />
              <Skeleton style={{ width: 500, color: 'white' }} active />
            </div>
          </div>
        </div>
      ) : (
        <Carousel
          autoplay
          className="min-h-[600px] text-white shadow-lg overflow-hidden bg-gray-800"
        >
          {Object.keys(movies).map((genre) => {
            const highestRatedMovie = getHighestRatedMovie(movies[genre]);
            return highestRatedMovie.Title ? (
              <div key={genre} className="h-full sm:mt-20 mt-2 p-4">
                <div className="h-full flex flex-wrap justify-center sm:items-start items-center sm:gap-10 gap-2">
                  <Image
                    src={highestRatedMovie.Poster}
                    alt={highestRatedMovie.Title}
                    width={350}
                    height={450}
                  />
                  <div className="sm:w-auto w-[350px] p-4">
                    <h2 className="sm:text-lg text-md font-semibold mb-1">
                      Popular Movie 2024 in {genre}
                    </h2>
                    <h3 className="sm:text-4xl text-lg font-medium sm:line-clamp-none line-clamp-1 mb-2">
                      {highestRatedMovie.Title}
                    </h3>
                    <p className="max-w-[500px] hidden sm:block text-md mb-2">
                      {highestRatedMovie.Plot}
                    </p>
                    <p className="text-gray-300">
                      Rating: {highestRatedMovie.imdbRating}
                    </p>
                  </div>
                </div>
              </div>
            ) : null;
          })}
        </Carousel>
      )}
    </div>
  );
};

export default MovieList;
