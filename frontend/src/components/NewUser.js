import React from "react";
import { useState } from "react";
import "../App.css";

export default function UserRow(probs) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    let newUser = { name: name, email: email, status: status, x: x, y: y };

    fetch("backend:8080/create-user", {
      method: "POST",
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        probs.deleteUser(probs.id);
        probs.updateNewUser({
          id: data,
          name: name,
          email: email,
          status: status,
          x: x,
          y: y,
          viewMode: true,
        });
      })
      .catch(() => {
        console.log("Somthing failed");
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="NewUser">
        <div className="InputBox">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="InputBox">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="InputBox">
          <label>Status:</label>
          <input
            type="text"
            name="status"
            onChange={(event) => setStatus(event.target.value)}
          />
        </div>
        <div className="InputBox">
          <label>X:</label>
          <input
            type="number"
            name="X"
            onChange={(event) => setX(event.target.value)}
          />
        </div>
        <div className="InputBox">
          <label>Y:</label>
          <input
            type="number"
            name="Y"
            onChange={(event) => setY(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <button onClick={() => probs.deleteUser(probs.id)}>Delete</button>
      </div>
    </form>
  );
}
