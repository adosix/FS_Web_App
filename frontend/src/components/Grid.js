import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Square from './Tile';
import '../style/Grid.css';
import { updateUserPosition } from '../actions/user';

const Grid = ({ users, userId, gridWidth, updateUserPosition }) => {
  const [userPosition, setUserPosition] = useState([0, 0]);

  useEffect(() => {
    update();
  }, [userId, users]);

  const update = () => {
    // Check if users is defined and has length
    if (!users || users.length === 0 || !userId) {
      return;
    }

    const user = users.find((user) => user.id === userId);

    // Check if user is defined
    if (user) {
      setUserPosition({
        x: user.x,
        y: user.y,
      });
    }
  };

  const makeSquares = () => {
    const tiles = ['red', 'blue', 'yellow', 'purple', 'green'];
    let arr = [];
    let key = 0;

    // Check if users is defined and has length
    if (!users || !Array.isArray(users) || users.length === 0) {
      console.log('No users or invalid users data:', users);
      return null; // or an empty array if you want to render nothing
    }

    const userPositions = users.map(user => [user.x, user.y]);


    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridWidth; j++) {
        arr.push(
          <Square
            x={j}
            y={i}
            key={key++}
            tile={tiles[Math.floor(Math.random() * tiles.length)]}
            selectedSquare={userPositions}
          />
        );
      }
    }
    return arr;
  };

  const handleKeyPress = (e) => {
    // Handle key press to update user position and dispatch the action
    // You can customize this logic based on your requirements

    switch (e.which) {
      case 87: // W key
        updateUserPosition(userId, [0, - 1]);
        break;
      case 68: // D key
        updateUserPosition(userId, [1, 0]);
        break;
      case 83: // S key
        updateUserPosition(userId, [0, 1]);
        break;
      case 65: // A key
        updateUserPosition(userId, [-1, 0]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    update();
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [userId, users]); // Add dependencies for useEffect

  return (
    <div className="grid-box" style={{ width: gridWidth * 150, height: gridWidth * 150 }}>
      {makeSquares()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  userId: state.user.userId,
});

const mapDispatchToProps = {
  updateUserPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
