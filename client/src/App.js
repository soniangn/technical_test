import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home.jsx';
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';
import Dashboard from './Components/Dashboard.jsx';
import ProjectDashboard from './Components/ProjectDashboard.jsx';
import NavBar from './Components/NavBar.jsx';
import TaskDashboard from './Components/TaskDashboard.jsx';
import Gantt from './Components/Gantt.jsx';
import { AuthProvider } from './AuthContext.js';
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