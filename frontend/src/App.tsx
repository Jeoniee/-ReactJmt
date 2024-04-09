// src/App.tsx
import React from 'react';
import LoginContainer from "./ui/LoginContainer";

const App: React.FC = () => {
  return (
      <div className="App">
        <header className="App-header">
          <LoginContainer />
        </header>
      </div>
  );
};

export default App;
