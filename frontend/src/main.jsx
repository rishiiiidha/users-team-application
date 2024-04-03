import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx';
import { store } from "./redux/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import EditUser from './pages/EditUser.jsx';
import AddUser from './pages/AddUser.jsx';
import CreateTeam from './pages/CreateTeam.jsx';
import ViewTeam from './pages/ViewTeam.jsx';
import Team from './pages/Team.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/api/users" element={<Users />} />
      <Route path="/api/users/edit/:id" element={<EditUser />} />
      <Route path="/api/users/add" element={<AddUser />} />
      <Route path="/api/users/team" element={<Team />} />
      <Route path="/api/users/team/create" element={<CreateTeam />} />
      <Route path="/api/users/team/view" element={<ViewTeam />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

