import React, { useState } from 'react';
import { Card, Modal, Box } from '@mui/material';

const movies = [
  {
    title: 'AiДа',
    rating: 5.5,
    img: 'https://manascinema.com/files/default/image?hash=58d551e32a374ca1a48272f6651892ef&width=980&webp=0',
    counter: 'Кыргызстан',
  },
  {
    title: 'Карачач',
    rating: 7.8,
    img: 'https://alatoocinema.com/files/default/image?hash=547ee3aa465ba3da1e00d4c6b1f0a9dd&width=400&webp=0',
    counter: 'Кыргызстан',
  },
  {
    title: 'Перегонщик',
    rating: 6.9,
    img: 'https://ic.p24.app/unsafe/540x800/cdn.p24.app/r/ps/ru/14/14642bd7-eb7e-4811-a967-1d622d7d2df0/c800c552-8973-428a-b30e-6431a89429a2.jpg',
    counter: 'Кыргызстан',
  },
  {
    title: 'Мамаша',
    rating: 8.2,
    img: 'https://ic.p24.app/unsafe/540x800/cdn.p24.app/r/ps/ru/fa/fac9a781-21c0-43ec-8d68-34f7f88fbcef/73be512b-c4a0-4a71-a4ca-0263b087fb23.jpg',
    counter: 'Кыргызстан',
  }
];

const popularMovies = [
  {
    title: 'Красный шёлк',
    rating: 7.5,
    img: 'https://upload.wikimedia.org/wikipedia/ru/thumb/8/82/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D1%8B%D0%B9_%D1%88%D1%91%D0%BB%D0%BA.jpg/250px-%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D1%8B%D0%B9_%D1%88%D1%91%D0%BB%D0%BA.jpg',
    counter: 'Россия',
  },
  {
    title: 'Мстители',
    rating: 8.0,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBjtfX6KunSA3SH38uW-yT_fNA2daGgub8Tw&s',
    counter: 'Америка',
  },
  {
    title: 'Один Дома 2',
    rating: 7.2,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtj6-tBYyxQIcpRq4-VMFWYNEwNRLpYIvIqw&s',
    counter: 'Америка',
  },
  {
    title: 'Час Пик 3',
    rating: 6.9,
    img: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/c86217c1-33f8-4752-87d8-7c9b47eea598/150x225',
    counter: 'США, Германия',
  },
];

type MovieType = {
  title: string;
  rating: number;
  img: string;
  counter: string;
};

type MainProps = {
  searchInput: string;
};

const Main: React.FC<MainProps> = ({ searchInput }) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredPopular = popularMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleClose = () => setSelectedMovie(null);

  return (
    <>
      <h1 style={titleStyle}>В тренде:</h1>
      <div style={cardWrapStyle}>
        {filteredMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
      </div>

      <h1 style={{ ...titleStyle, marginTop: '60px' }}>Популярные:</h1>
      <div style={cardWrapStyle}>
        {filteredPopular.map((movie, index) => (
          <MovieCard key={index} movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
      </div>

      <Modal open={!!selectedMovie} onClose={handleClose}>
        <Box sx={modalStyle}>
          {selectedMovie && (
            <>
              <img
                src={selectedMovie.img}
                alt={selectedMovie.title}
                style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: '10px' }}
              />
              <h2>{selectedMovie.title}</h2>
              <p><strong>Рейтинг:</strong> {selectedMovie.rating} ⭐</p>
              <p><strong>Страна:</strong> {selectedMovie.counter}</p>
              <button onClick={handleClose} style={closeButtonStyle}>Закрыть</button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

const MovieCard: React.FC<{ movie: MovieType; onClick: () => void }> = ({ movie, onClick }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 300,
      boxShadow: '0 0px 20px',
      borderRadius: '15px',
      padding: '20px',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
      },
    }}
    onClick={onClick}
  >
    <img
      src={movie.img}
      alt={movie.title}
      style={{
        width: '100%',
        borderRadius: '10px',
        marginBottom: '15px',
        objectFit: 'cover',
        height: 400,
      }}
    />
    <h2 style={{ margin: '0 0 10px 0' }}>{movie.title}</h2>
    <div style={{ display: 'flex', gap: '10px', fontWeight: 'bold', color: '#555' }}>
      <p>Рейтинг:</p>
      <p>{movie.rating}⭐</p>
    </div>
    <p>Страна: {movie.counter}</p>
  </Card>
);

const titleStyle: React.CSSProperties = {
  marginTop: '30px',
  marginBottom: '30px',
  textAlign: 'center',
  color: 'black',
  backgroundColor: '#39FF0',
  width: '200px',
  height: '50px',
  padding: '5px',
  marginLeft: '35px',
  fontSize: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px',
  boxShadow: '0px 0px 20px rgba(0,0,0,0.5)',
};

const cardWrapStyle: React.CSSProperties = {
  display: 'flex',
  gap: '30px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: '0 20px',
  marginBottom: '40px',
};

const modalStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '15px',
  width: '90%',
  maxWidth: '500px',
  boxShadow: '0 5px 30px rgba(0,0,0,0.3)',
  textAlign: 'center',
  outline: 'none',
  objectFit: 'cover',
};

const closeButtonStyle: React.CSSProperties =  {
  marginTop: '20px',
  padding: '10px 20px',
  border: 'none',
  backgroundColor: '#1976d2',
  color: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
};

export default Main;