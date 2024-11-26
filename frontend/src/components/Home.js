import React from 'react';
import Carousel from './Carousel';
import ProductList from './ProductList';

const Home = () => {
  return (
    <div className="home">
      {/* Componente del carrusel */}
      <Carousel />

      {/* Componente de la lista de productos */}
      <ProductList />
    </div>
  );
};

export default Home;
