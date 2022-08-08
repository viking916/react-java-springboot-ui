import { Link } from "react-router-dom";
import { endSession, authState } from "../api/todo/AuthenticationService";

export default function HeaderComponent() {
  const isUserLoggedIn = authState();
  console.log(isUserLoggedIn);
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div>
          <a className="navbar-brand">ToDo App</a>
        </div>
        <ul className="navbar-nav">
          <li>
            {isUserLoggedIn && (
              <Link className="nav-link" to="/welcome">
                Home
              </Link>
            )}
          </li>
          <li>
            {isUserLoggedIn && (
              <Link className="nav-link" to="/todos">
                Todos
              </Link>
            )}
          </li>
        </ul>
        <ul className="navbar-nav navbar-collapse justify-content-end">
          <li>
            {!isUserLoggedIn && (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
          </li>
          <li>
            {isUserLoggedIn && (
              <Link className="nav-link" to="/logout" onClick={endSession}>
                Logout
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
