import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CodeBox, mockData } from './components/codeBox/CodeBox';
import { SyntaxGroupBox } from './components/SyntaxGroupBox/SyntaxGroupBox';
import { newGroupTemplate } from './components/SyntaxGroupBox/types';

function App() {
  return (
    <div className="App">
      <pre className='pageHeader'> react custom syntax highlighting </pre>
      <div className='pageContent'>
        <CodeBox syntaxGroups={mockData.sort((a, b) => b.priority - a.priority)}/>
        <SyntaxGroupBox initialDisplay={newGroupTemplate}/>
      </div>

    </div>
  );
}

export default App;
