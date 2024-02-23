import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CodeBox, mockData } from './components/codeBox/CodeBox';
import { SyntaxGroupBox } from './components/SyntaxGroupBox/SyntaxGroupBox';
import { CodeBoxReturnMessage, newGroupTemplate } from './components/SyntaxGroupBox/types';
import { SyntaxGroupType } from './components/codeBox/types';
import { SyntaxGroupsList } from './components/syntaxGroupList/SyntaxGroupsList';
import { isNull } from 'util';

function App() {
  const [sgs, setSgs] = React.useState<SyntaxGroupType[]>(mockData);
  const [currentlyEdited, setCurrentlyEdited] = React.useState<SyntaxGroupType | null>(null);

  const addSyntaxGroup = (sg: SyntaxGroupType | CodeBoxReturnMessage) => {
    if (typeof sg === 'string') {
      if (sg === 'CANCEL') {
        setCurrentlyEdited(null);
        return;
      }
      else if (sg === 'DELETE') {
        let newSgs = [...sgs];
        newSgs.splice(newSgs.findIndex(el => el.name === currentlyEdited?.name), 1);
        setSgs([...newSgs])
        setCurrentlyEdited(null);
        return;
      }
    }
    if (sg.name === '') {
      alert('syntax group name has to be not empty');
    }
    else if (sg.regex.source === '(?:)') {
      alert('regex source cannot be empty')
    }
    else {
      console.log(sg.regex.source)
      let newSgs = [...sgs];
      if (currentlyEdited?.name !== '') {
        newSgs.splice(newSgs.findIndex(el => el.name === currentlyEdited?.name), 1);
      }
      newSgs = newSgs.concat(sg);
      //console.log(sgs.findIndex(el => el.name === currentlyEdited?.name))
      setSgs([...newSgs]);
      setCurrentlyEdited(null)
    }
  }

  return (
    <div className="App">
      <pre className='pageHeader'> react custom syntax highlighting </pre>
      <div className='pageContent'>
        <CodeBox syntaxGroups={sgs.sort((a, b) => b.priority - a.priority)}/>
        <SyntaxGroupsList data={sgs.sort((a, b) => b.priority - a.priority)} callback={(sg) => setCurrentlyEdited(sg)} highlightName={currentlyEdited?.name}/>
        {!currentlyEdited && <button onClick={() => setCurrentlyEdited(newGroupTemplate)} style={{marginBottom: 10}}> new group </button>}
        {currentlyEdited && <SyntaxGroupBox initialDisplay={currentlyEdited} callback={addSyntaxGroup} /> }
      </div>

    </div>
  );
}

export default App;
