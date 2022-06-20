import './App.css';
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Portfolios from './Portfolios'
import Register from "./Register";
import Reset from "./Reset";
import Menu from "./Menu";
import Entrant from "./Entrant";
import Contact from "./Contact";
import MyData from "./MyData";
import Home from "./Home";
import Admin from "./Admin";
import AdminUsers from "./AdminUsers";
import MyPortfolio from "./MyPortfolio";
import MyProfile from "./MyProfile";
import Footer from "./Footer";

function App() {
  if (window.location.pathname == "/admin"){
    return (
      <Router>  
        <Routes>
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/adminusers" element={<AdminUsers />} />
        </Routes>
    </Router> 
    )
    
  } else {
  
  return (
      <div className="App">
        <Router>  
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <div className='background-box'>
              <div className='content-box'>
                <Routes>
                  <Route exact path="/portfolios" element={<Portfolios />} />
                  <Route exact path="/entrant" element={<Entrant />} />
                  <Route exact path="/contact" element={<Contact />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/reset" element={<Reset />} />
                  <Route exact path="/mydata" element={<MyData />} />
                  <Route exact path="/myportfolio" element={<MyPortfolio />} />
                  <Route exact path="/myprofile" element={<MyProfile />} />
                </Routes>
                <Footer/>
              </div>
              </div>
        </Router>
      </div>
    );
  }
}

export default App;
