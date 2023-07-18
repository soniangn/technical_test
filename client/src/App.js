import './App.css';
/*import CreateUser from './Components/CreateUser';
import EditUser from './Components/EditUser';
import DeleteUser from './Components/DeleteUser';
import GetUser from './Components/GetUser';*/
import AppRouter from './AppRouter';


function App() {
  return (
    <div>
      <ul>
        <li><a href="http://localhost:3000/home">Home</a></li>
        <li><a href="http://localhost:3000/register">Register</a></li>
        <li><a href="http://localhost:3000/login">Login</a></li>
      </ul>
      <AppRouter />
    </div>
  );
}

export default App;

/*
<Route path="/create-user" element={< CreateUser />} />
      <Route path="/edit-user" element={< EditUser />} />
      <Route path="/delete-user" element={< DeleteUser />} />
      <Route path="/get-user" element={< GetUser />} />
*/