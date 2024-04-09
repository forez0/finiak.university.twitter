import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login"
import Home from './Pages/Home/Home';
import Direct from "./Pages/Direct/Direct"
import About from './Pages/About/About';
import Bookmarks from './Pages/Bookmarks/Bookmarks'
import Notification from './Pages/Notification/Notification'
import Profile from './Pages/Profile/Profile'
import Settings from './Pages/Settings/Settings'
import Trends from './Pages/Trends/Trends'

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />}/>
                    <Route path="/Login" element={<Login />}/>
                    <Route path="/Home" element={<Home />}/>
                    <Route path="/Direct" element={<Direct />}/>
                    <Route path="/About" element={<About />}/>
                    <Route path="/Bookmarks" element={<Bookmarks />}/>
                    <Route path="/Notification" element={<Notification />}/>
                    <Route path="/Profile" element={<Profile />}/>
                    <Route path="/Settings" element={<Settings />}/>
                    <Route path="/Trends" element={<Trends />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;
