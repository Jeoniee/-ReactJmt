// src/App.tsx
import React from 'react';
import Login from '../src/Components/Login';

const App: React.FC = () => {
  return (
      <div className="App">
        <header className="App-header">
          <Login />
        </header>
      </div>
  );
};

export default App;
