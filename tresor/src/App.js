import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login"

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />}/>
                    <Route path="/Login" element={<Login />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;
