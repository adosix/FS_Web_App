// bar.js
import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import UserRow from './UserRow_new';

export default function Bar() {
  const [user, setUser] = useState(null);
  const [gridState, setGridState] = useState({ selectedSquare: [0, 0] });
  const id = 1;

  useEffect(() => {
    fetchUser();
  }, []); // empty dependency array means this effect runs once when the component mounts

  function fetchUser() {
    fetch(`http://127.0.0.1:8080/user?id=1`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
        updateGridState(data.x, data.y);
      })
      .catch(() => {
        console.log('Something failed');
      });
  }

  function updateGridState(x, y) {
    setGridState({ selectedSquare: [x, y] });
  }

  function handleKeyPress(e) {
    switch (e.which) {
      case 87:
        move(1, -1);
        break;
      case 68:
        move(0, 1);
        break;
      case 83:
        move(1, 1);
        break;
      case 65:
        move(0, -1);
        break;
      default:
        break;
    }
  }

  function move(dir, change) {
    let coords = [...gridState.selectedSquare];
    if (coords[dir] + change > -1 && coords[dir] + change < 10) {
      coords[dir] += change;
      setGridState({
        selectedSquare: coords,
      });
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gridState]);

  return (
    <div className="App">
      <div>
        <button onClick={fetchUser}>Fetch User</button>
        {user ? (
          <div>
            <UserRow
              id={user.id}
              name={user.name}
              email={user.email}
              status={user.status}
              x={user.x}
              y={user.y}
              viewMode={true}
              deleteUser={(user) => console.log('Delete', user)}
              updateUser={(id, name, email, status) =>
                console.log('Update', id, name, email, status)
              }
              editModeChange={(id) => console.log('Edit mode change', id)}
            />
            <Grid gridWidth={10} updateGridState={gridState.selectedSquare} />
          </div>
        ) : (
          'No user fetched. Click "Fetch User" button.'
        )}
      </div>
    </div>
  );
}