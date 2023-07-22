import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import ProjectDashboard from './Components/ProjectDashboard';
import NavBar from './Components/NavBar';
import TaskDashboard from './Components/TaskDashboard';
import Gantt from './Components/Gantt';
import { AuthProvider } from './AuthContext';
import RequireAuth from './RequireAuth.js';


const App = () => {
  return (
    <div>
      <AuthProvider>
      < NavBar />
        <Routes>
          <Route path="/" element={< Home />} />
            <Route path="/register" element={< Register />} />
            <Route path="/login" element={< Login />} />
            <Route 
              path="/users-dashboard" 
              element={
              <RequireAuth>
                < Dashboard />
              </RequireAuth>
              } 
            />
            <Route 
              path="/projects-dashboard" 
              element={
                <RequireAuth>
                  <ProjectDashboard />
                </RequireAuth>
              } 
            />
            <Route 
              path="/tasks-dashboard/:id"
              element={
                <RequireAuth>
                  <TaskDashboard />
                </RequireAuth>
              } 
            />
            <Route 
              path="/gantt/:id" 
              element={
                <RequireAuth>
                  <Gantt />
                </RequireAuth>
              } 
            />
        </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;