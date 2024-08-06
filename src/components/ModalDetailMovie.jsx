import React, { useState } from 'react';
import { Button, Modal, Image, Skeleton } from 'antd';
import useDetailMovie from '@/hooks/useDetailMovie';

const ModalDetailMovie = ({ imdbID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { movie, loading } = useDetailMovie(imdbID);

  const showModal = () => {
    setIsModalOpen(true);
    console.log(movie);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 rounded"
      >
        Detail
      </Button>
      <Modal
        title={movie?.Title || 'Loading...'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          {movie?.Poster == 'N/A' ? (
            <Skeleton.Image
              style={{ height: '200px', width: '150px' }}
              active={false}
            />
          ) : (
            <Image
              src={movie?.Poster}
              alt={movie?.Title}
              className="h-48 w-36 object-cover shadow-lg"
            />
          )}
          <div className="space-y-2">
            <p className="text-gray-600">
              Actors: <span className="font-medium">{movie?.Actors}</span>
            </p>
            <p className="text-gray-600">
              Country: <span className="font-medium">{movie?.Country}</span>
            </p>
            <p className="text-gray-600">
              Director: <span className="font-medium">{movie?.Director}</span>
            </p>
            <p className="text-gray-600">
              Genre: <span className="font-medium">{movie?.Genre}</span>
            </p>
            <p className="text-gray-600">
              Language: <span className="font-medium">{movie?.Language}</span>
            </p>
            <p className="text-gray-600">
              Released: <span className="font-medium">{movie?.Released}</span>
            </p>
            <p className="text-gray-600">
              Runtime: <span className="font-medium">{movie?.Runtime}</span>
            </p>
            <p className="text-gray-600">
              Year: <span className="font-medium">{movie?.Year}</span>
            </p>
            <p className="text-gray-600">
              Rating: <span className="font-medium">{movie?.imdbRating}</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailMovie;
