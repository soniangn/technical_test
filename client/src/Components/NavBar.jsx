import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


const NavBar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    navigate('/')
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/users-dashboard">Users Dashboard</Link>
        </li>
        <li>
          <Link to="/projects-dashboard">Projects Dashboard</Link>
        </li>
      </ul>
      {auth && <button onClick={logOut}>Log Out</button>}
    </nav>
  )
}

export default NavBar;