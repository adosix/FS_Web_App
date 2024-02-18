import React, { useState } from 'react';

export default function UserRow(probs) {
  const [id, setId] = useState(probs.id); // Corrected from probs.user.id
  const [name, setName] = useState(probs.name);
  const [email, setEmail] = useState(probs.email);
  const [status, setStatus] = useState(probs.status);
  const [x, setX] = useState(probs.x);
  const [y, setY] = useState(probs.y);

  if (probs.viewMode) { // Corrected from probs.user.viewMode
    return (
      <div className="User">
        <p style={{ margin: 20 }}>{id}</p>
        <p style={{ margin: 20 }}>{name}</p>
        <p style={{ margin: 20 }}>{email}</p>
        <p style={{ margin: 20 }}>{status}</p>
        <p style={{ margin: 20 }}>{x}</p>
        <p style={{ margin: 20 }}>{y}</p>
        <button onClick={() => probs.deleteUser(probs)}>Delete</button>
        <button onClick={() => probs.editModeChange(id)}>Edit</button>
      </div>
    );
  } else {
    return (
      <div className="User">
        <div className="NewUser">
          <p style={{ margin: 20 }}>{id}</p>
          <div className="InputBox">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="InputBox">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="InputBox">
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            />
          </div>
          <div className="InputBox">
            <label>X:</label>
            <input
              type="text"
              name="x"
              value={status}
              onChange={(event) => setX(event.target.value)}
            />
          </div>
          <div className="InputBox">
            <label>Y:</label>
            <input
              type="text"
              name="y"
              value={status}
              onChange={(event) => setY(event.target.value)}
            />
          </div>
        </div>
        <button onClick={() => probs.updateUser(id, name, email, status,x, y)}>
          Update
        </button>
        <button onClick={() => probs.editModeChange(id)}>Restore</button>
      </div>
    );
  }
}
