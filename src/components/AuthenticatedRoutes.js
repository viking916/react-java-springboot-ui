import { Component } from "react";
import { Navigate, Route } from "react-router-dom";
import { authState } from "../api/todo/AuthenticationService";

class AuthenticatedRoutes extends Component {
  render() {
    if (authState) {
      return { ...this.props.children };
    } else {
      return <Navigate to="/login" />;
    }
  }
}

export default AuthenticatedRoutes;
