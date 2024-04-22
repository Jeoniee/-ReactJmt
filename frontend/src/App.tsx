// src/App.tsx
import React from 'react';
import { JmtRouters } from "./routers/JmtRouters";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {JmtRouters.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </Router>
    );
};

export default App;
