import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  jwtAuthService,
  startSessionJwt,
} from "../api/todo/AuthenticationService";

export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailedFlag, setLoginFailedFlag] = useState(false);
  const navigate = useNavigate();

  function loginClicked() {
    jwtAuthService(username, password)
      .then((response) => {
        startSessionJwt(username, response.data.token);
        navigate(`/welcome`, { replace: true });
      })
      .catch(() => {
        setLoginFailedFlag(true);
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <div className="container">
        {loginFailedFlag && (
          <div className="alert alert-warning">Invalid Credentials</div>
        )}
        Username:{" "}
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        Password:{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button className="btn btn-success" onClick={loginClicked}>
          Login
        </button>
      </div>
    </div>
  );
}
