import React from 'react';

const Navbar = ({ setView }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Gestion Educativa</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => setView('ProfesoresForm')}>Profesores</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => setView('CursosForm')}>Cursos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => setView('EstudiantesForm')}>Estudiantes</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
