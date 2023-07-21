import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import ProjectDashboard from './Components/ProjectDashboard';
import NavBar from './Components/NavBar';
import TaskDashboard from './Components/TaskDashboard';


const App = () => {
  return (
    <div>
      < NavBar />
        <Routes>
          <Route path="/" element={< Home />} />
            <Route path="/register" element={< Register />} />
            <Route path="/login" element={< Login />} />
            <Route path="/users-dashboard" element={< Dashboard />} />
            <Route path="/projects-dashboard" element={< ProjectDashboard />} />
            <Route path="/tasks-dashboard/:id" element={< TaskDashboard />} />
        </Routes>
    </div>
  );
}

export default App;