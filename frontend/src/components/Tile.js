import React from 'react';

const Square = ({ x, y, tile, selectedSquare }) => {
  const isSelectedSquare = selectedSquare.some(position => position[0] === x && position[1] === y);

  return (
    <div
      className={`square ${tile} ${isSelectedSquare ? 'selected' : ''}`}
    ></div>
  );
};

export default Square;