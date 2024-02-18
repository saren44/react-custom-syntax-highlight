import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CodeBox } from './components/codeBox/CodeBox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CodeBox />
      </header>
    </div>
  );
}

export default App;
