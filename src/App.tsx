import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CodeBox, mockData } from './components/codeBox/CodeBox';
import { SyntaxGroupBox } from './components/SyntaxGroupBox/SyntaxGroupBox';
import { newGroupTemplate } from './components/SyntaxGroupBox/types';
import { SyntaxGroupType } from './components/codeBox/types';

function App() {
  const [sgs, setSgs] = React.useState<SyntaxGroupType[]>([]);

  return (
    <div className="App">
      <pre className='pageHeader'> react custom syntax highlighting </pre>
      <div className='pageContent'>
        <CodeBox syntaxGroups={sgs.sort((a, b) => b.priority - a.priority)}/>
        <SyntaxGroupBox initialDisplay={newGroupTemplate} callback={(e) => setSgs(sgs.concat(e))}/>
      </div>

    </div>
  );
}

export default App;
