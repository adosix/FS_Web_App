// bar.js
import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import UserRow from './UserRow_new';
import { connect } from 'react-redux';
import { setUserId, setUsers} from '../actions/user'; 

function Bar({ users, userId, setUserId, setUsers }) {
  const [inputUserId, setInputUserId] = useState('');

  const handleUserIdChange = (e) => {
    setInputUserId(e.target.value);
  };

  const handleSetUserId = () => {
    setUserId(inputUserId);
    
  };

  useEffect(() => {
    // Set up interval to call updateUser every 5 seconds
    const updateUserInterval = setInterval(updateUser, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(updateUserInterval);
  }, [userId, users]); // empty dependency array means this effect runs once when the component mounts

  function fetchUsers() {
    fetch(`http://backend:8080/users`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data); // dispatch an action to update Redux state with users
      })
      .catch(() => {
        console.log('Something failed');
      });
  }
  function updateUser() {
    console.log("id usera ktoreho chcem updatovat" + userId)
    let user= users.find(user => String(user.id) === String(userId));
    console.log("user ktore chcem updatovat"  + JSON.stringify(user))
    let userForUpdate = { name: user.name, email: user.email, status: user.status, x: user.x, y: user.y};
    console.log("update user body" + JSON.stringify(userForUpdate))
    fetch("http://backend:8080/update-user?id=" + userId, {
      method: "PUT",
      body: JSON.stringify(userForUpdate),
    }).then(() => {
      fetchUsers()
    });
  }

  return (
    <div className="App">
      <div>
        <button onClick={fetchUsers}>Fetch Users</button>
        <button onClick={updateUser}>update User</button>
        <h1>Bar Component</h1>
        <p>User ID: {userId}</p>
        <input type="text" value={inputUserId} onChange={handleUserIdChange} />
        <button onClick={handleSetUserId}>Set User ID</button>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <UserRow
                id={user.id}
                name={user.name}
                email={user.email}
                status={user.status}
                x={user.x}
                y={user.y}
                viewMode={true}
                deleteUser={(user) => updateUser(user.id)}
                updateUser={(user) => updateUser(user.id)
                }
                editModeChange={(user) => updateUser(user.id)}
              />
            </div>
          ))
        ) : (
          'No users fetched. Click "Fetch Users" button.'
        )}

      <Grid gridWidth={10} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log('Redux state users:', state.user.users);
  return {
    userId: state.user.userId,
    users: state.user.users || [], // Ensure users is an array
  };
};

const mapDispatchToProps = {
  setUserId,
  setUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bar);