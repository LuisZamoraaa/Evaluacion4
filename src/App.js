import React, { useState } from 'react';
import CursosForm from './components/CursosForm';
import ProfesoresForm from './components/ProfesoresForm';
import EstudiantesForm from './components/EstudiantesForm';
import Navbar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [view, setView] = useState('ProfesorForm');

  let content;
  switch (view) {
    case 'ProfesoresForm':
      content = <ProfesoresForm />;
      break;
    case 'CursosForm':
      content = <CursosForm />;
      break;
    case 'EstudiantesForm':
      content = <EstudiantesForm />;
      break;
    default:
      content = <ProfesoresForm />;
  }

  return (
    <div className="App">
      <Navbar setView={setView} />
      {content}
    </div>
  );
}


export default App;
