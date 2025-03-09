import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/Home/index";
import LoginPage from "./components/Login/Login";
import SignUpPage from "./components/Login/Register";
import Details from "./components/product/Details";

//import TempBody from "./components/Body/tempbody";
// Remove unused imports
// import TempBody from "./components/Body/tempbody";
// import LoginPage from "./components/Login/Login";
// import SignUpPage from "./components/Login/Register";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="Details" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;

/*
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import LoginPage from "./components/Login/Login";
import SignUpPage from "./components/Login/Register";
import TempBody from "./components/Body/tempbody";
import { Outlet } from "react-router-dom";
import { Home } from "@mui/icons-material";
import home from "./pages/Home/index";

/*!const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);*/

//const App = () => {
//return (
//<Router>
//<Header />
//<Routes>
//<Route exact="true" path="/" element={<home />} />
//</Routes>
//</Router>

/* <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TempBody />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </Router>*/
//);
//};

//export default App*/
