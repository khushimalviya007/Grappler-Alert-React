import './App.css';
import Rules from './Component/Rules';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Component/Home';
import SignIn from './Component/SignIn';
import Test from './Component/test';
import ShowRules from './Component/showRules';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import PrivateRoute from './Component/PrivateRoute';
import Notification from './Component/Notification';
import Project from './Component/Project';
import Ticket from './Component/Ticket';
import Alert from './Component/AlertList';
import AlertComponent from './Component/AlertComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes path="/">
          <Route path="signin" element={<SignIn />}></Route>
          <Route path="users" element={<PrivateRoute />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rules" element={<Rules />}></Route>
            <Route path="showrules" element={<ShowRules />}></Route>
            <Route path="notification" element={<Notification />}></Route>
            <Route path="projects/:id" element={<Project />}></Route>
            <Route path="tickets/:id" element={<Ticket />}></Route>
            <Route path="alert" element={<Alert />}></Route>
            <Route path="alertcomponent" element={<AlertComponent />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;