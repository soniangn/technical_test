import Login from "./Components/Login.jsx";
import { useAuth } from "./AuthContext.js";

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();

  if (!auth) {
    return <Login/>;
  }
  return children;
}

export default RequireAuth;