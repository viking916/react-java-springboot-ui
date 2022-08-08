import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "./LoginComponent.js";
import WelcomeComponent from "./WelcomeComponent.js";
import withNavigation from "./WithNavigation.js";
import ErrorComponent from "./ErrorComponent.js";
import ListTodosComponent from "./ListTodosComponent.js";
import HeaderComponent from "./HeaderComponent.js";
import FooterComponent from "./FooterComponent.js";
import LogoutComponent from "./LogoutComponent.js";
import AuthenticatedRoutes from "./AuthenticatedRoutes.js";
import TodoComponent from "./TodoComponent.js";

export default function TodoApp() {
  const LoginComponentWithNavigation = withNavigation(LoginComponent);
  return (
    <div className="TodoApp">
      <Router>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginComponentWithNavigation />}></Route>
          <Route
            path="/login"
            element={<LoginComponentWithNavigation />}
          ></Route>
          <Route
            path="/welcome"
            element={
              <AuthenticatedRoutes>
                <WelcomeComponent />
              </AuthenticatedRoutes>
            }
          ></Route>
          <Route
            path="/todo/:id"
            element={
              <AuthenticatedRoutes>
                <TodoComponent />
              </AuthenticatedRoutes>
            }
          ></Route>
          <Route
            path="/todos"
            element={
              <AuthenticatedRoutes>
                <ListTodosComponent />
              </AuthenticatedRoutes>
            }
          ></Route>
          <Route
            path="/logout"
            element={
              <AuthenticatedRoutes>
                <LogoutComponent />
              </AuthenticatedRoutes>
            }
          ></Route>
          <Route path="*" element={<ErrorComponent />}></Route>
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}
