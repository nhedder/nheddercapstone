import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

export default function ProfileComponent(props) {
  const [firstName, setFirstName] = useState(props.currentUser.firstName);
  const [lastName, setLastName] = useState(props.currentUser.lastName);
  const [password, setPassword] = useState(props.currentUser.password);
  const [vPassword, setVPassword] = useState(props.currentUser.password);
  const [count, setCount] = useState(false);
  const currentUser = props.currentUser;
  const updateUser = {
    firstName: firstName,
    lastName: lastName,
    password: password,
  };

  const handleSubmit = () => {
    axios
      .put("http://localhost:8080/api/users/" + currentUser.id, updateUser)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:8080/api/users/" + currentUser.id)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="userInfo">
        {currentUser.firstName ? (
          <>
            <h3>{currentUser.firstName}</h3>
            {/* <h5>You currently owe: ${currentUser.total}</h5> */}
            <form>
              <div>
                <TextField
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  defaultValue={currentUser.firstName}
                  label="Name"
                ></TextField>
              </div>
              <br></br>
              <div>
                <TextField
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  defaultValue={currentUser.lastName}
                  label="last name"
                ></TextField>
              </div>
              <br></br>
              <div>
                <TextField
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                ></TextField>
              </div>
              <br></br>
              <div>
                <TextField
                  type="password"
                  onChange={(e) => setVPassword(e.target.value)}
                  label="Verify Password"
                ></TextField>
              </div>
              <br></br>
              <Button
                onClick={
                  password === vPassword
                    ? handleSubmit
                    : () => alert("These passwords do not match.")
                }
              >
                Update
              </Button>
              <Button onClick={handleDelete} color="error">
                Delete Profile
              </Button>
            </form>
          </>
        ) : (
          <p> User: {currentUser.username} not found</p>
        )}
      </div>
    </>
  );
}
