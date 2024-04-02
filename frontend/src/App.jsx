import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./componenets/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
