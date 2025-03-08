import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManageAdd from "./Admin/AdManageMent/ManageAdd";
import ManageLogo from "./Admin/AdManageMent/ManageLogo";
import HomeAdmin from "./Admin/Dashboard/Home";
import { default as Setting } from "./Admin/Dashboard/Setting";
import Team from "./Admin/Dashboard/Team";
import OrderHistory from "./Admin/HelpDesk/OrderHistory";
import SupportRequest from "./Admin/HelpDesk/SupportRequest";
import HomePage from "./Admin/HomePage";
import AdminDashboard from "./Admin/Layout/AdminDashboard";
import AdminLoginPage from "./Admin/Login/AdminLoginPage";
import AddProduct from "./Admin/Product/AddProduct";
import StockView from "./Admin/Product/StockView";
import UpdateProduct from "./Admin/Product/UpdateProduct";
import ViewProduct from "./Admin/Product/ViewProduct";
import AboutUs from "./components/aboutUs/about";
import Contact from "./components/contact/contact";
import LoginPage from "./components/Login/Login";
import SignUpPage from "./components/Login/Register";
import Details from "./components/product/Details";
import Home from "./pages/Home/index";

// Remove unused imports
// import TempBody from "./components/Body/tempbody";
// import LoginPage from "./components/Login/Login";
// import SignUpPage from "./components/Login/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="AdminLogin" element={<AdminLoginPage />} />
        <Route path="AdminHome" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="Details" element={<Details />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="home" element={<HomeAdmin />} />
          <Route path="team" element={<Team />} />
          <Route path="setting" element={<Setting />} />

          <Route path="Product/add" element={<AddProduct />} />
          <Route path="Product/update" element={<UpdateProduct />} />
          <Route path="Product/view" element={<ViewProduct />} />
          <Route path="Product/stock" element={<StockView />} />

          <Route path="AddManagement/Add" element={<ManageAdd />} />
          <Route path="AddManagement/Logo" element={<ManageLogo />} />
          {/* <Route path="HelpDesk/OrderManagement" element={<OrderManagement />} /> */}
          <Route path="HelpDesk/Orderhistory" element={<OrderHistory />} />
          <Route path="HelpDesk/SupportRequest" element={<SupportRequest />} />
        </Route>
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
