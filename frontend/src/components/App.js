import { useEffect, useState } from "react";
import "../App.css";
import UserRow from "./UserRow";
import NewUser from "./NewUser";
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserId } from '../actions/user';


function App({ userId, setUserId }) {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [newUserMaxID, setnewUserMaxID] = useState(0);
  const [inputUserId, setInputUserId] = useState('');

  const handleUserIdChange = (e) => {
    setInputUserId(e.target.value);
  };

  const handleSetUserId = () => {
    setUserId(inputUserId);
  };

  useEffect(() => {
    fetch("http://backend:8080/users")
      .then((response) => response.json())
      .then((data) => {
        for (const element of data) {
          element["viewMode"] = true;
        }
        setUsers(data);
      });
  }, []);

  function deleteUser(value) {
    fetch("http://backend:8080/delete-user?id=" + value.id, {
      method: "DELETE",
    }).then(() => {
      setUsers((oldValues) => {
        return oldValues.filter((user) => user !== value);
      });
    });
  }

  function editModeChange(id) {
    console.log("Changing edit mode");
    for (const element of users) {
      if (element.id == id) {
        element["viewMode"] = !element["viewMode"];
      }
    }
    setUsers((prevUsers) => [...prevUsers]);
  }

  function updateUser(id, name, email, status, x, y) {
    let userForUpdate = { name: name, email: email, status: status, x: x, y: y};
    fetch("http://backend:8080/update-user?id=" + id, {
      method: "PUT",
      body: JSON.stringify(userForUpdate),
    }).then(() => {
      for (const element of users) {
        if (element.id == id) {
          element.name = name;
          element.email = email;
          element.status = status;
          element.x = x;
          element.y = y;
          editModeChange(id);
          break;
        }
      }
    });
  }

  function addNewUserInput() {
    setNewUsers((newUsers) => [...newUsers, newUserMaxID]);
    setnewUserMaxID(() => newUserMaxID + 1);
  }

  function deleteNewUser(id) {
    setNewUsers((oldValues) => {
      return oldValues.filter((user) => user !== id);
    });
  }

  function updateNewUser(newUser) {
    setUsers([...users, newUser]);
  }

  return (
    <div className="App">
      <p>User ID: {userId}</p>
      <input type="text" value={inputUserId} onChange={handleUserIdChange} />
      <button onClick={handleSetUserId}>Set User ID</button>
      <header className="App-header">
        <p>User Dashboard</p>
      </header>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <UserRow
              user={user}
              deleteUser={deleteUser}
              editModeChange={editModeChange}
              updateUser={updateUser}
            />
          </div>
        ))}
      </div>
      {newUsers.map((newUserID) => (
        <div key={newUserID}>
          <NewUser
            id={newUserID}
            deleteUser={deleteNewUser}
            updateNewUser={updateNewUser}
          ></NewUser>
        </div>
      ))}
      <div>
        <button onClick={() => addNewUserInput()}>New User</button>
      </div>
    </div>
  );


}

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
  };
};


const mapDispatchToProps = {
  setUserId
};

export default connect(mapStateToProps, mapDispatchToProps)(App);