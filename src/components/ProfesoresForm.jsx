import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ProfesorForm() {
  const [profesores, setProfesores] = useState([]);
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [seccion, setSeccion] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [profesorIdEditar, setProfesorIdEditar] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/profesores/import');
        setProfesores(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const agregarProfesor = () => {
    if (rut.trim() === '' || nombre.trim() === '' || apellido.trim() === '' || edad.trim() === '' || asignatura.trim() === '' || seccion.trim() === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    let profesoresActualizados;
    if (modoEdicion && profesorIdEditar) {
      profesoresActualizados = profesores.map((prof) => {
        if (prof.id === profesorIdEditar) {
          return { ...prof, rut, nombre, apellido, edad, asignatura, seccion };
        }
        return prof;
      });
      setModoEdicion(false);
      setProfesorIdEditar(null);
    } else {
      const nuevoProfesor = {
        id: profesores.length + 1,
        rut,
        nombre,
        apellido,
        edad,
        asignatura,
        seccion
      };
      profesoresActualizados = [...profesores, nuevoProfesor];
    }

    setProfesores(profesoresActualizados);

    setRut('');
    setNombre('');
    setApellido('');
    setEdad('');
    setAsignatura('');
    setSeccion('');
  };

  const editarProfesor = (id) => {
    const profesorEditar = profesores.find((prof) => prof.id === id);
    if (profesorEditar) {
      setRut(profesorEditar.rut);
      setNombre(profesorEditar.nombre);
      setApellido(profesorEditar.apellido);
      setEdad(profesorEditar.edad);
      setAsignatura(profesorEditar.asignatura);
      setSeccion(profesorEditar.seccion);
      setModoEdicion(true);
      setProfesorIdEditar(id);
    }
  };

  const eliminarProfesor = (id) => {
    const profesoresActualizados = profesores.filter((prof) => prof.id !== id);
    setProfesores(profesoresActualizados);
  };

  const buscarProfesor = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  const profesoresFiltrados = profesores.filter((profesor) =>
    profesor.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    profesor.apellido.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    profesor.rut.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <a className="navbar-brand" href="#">Gestión de Profesores</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <h4 className="text-center mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Lista de Profesores</h4>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar profesor por RUT, nombre o apellido"
                value={terminoBusqueda}
                onChange={buscarProfesor}
              />
            </div>
            <div className="row">
              {profesoresFiltrados.map((profesor) => (
                <div key={profesor.id} className="col-md-6 mb-3">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{profesor.nombre} {profesor.apellido}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{profesor.rut}</h6>
                      <p className="card-text">
                        <small>Edad: {profesor.edad}</small> <br />
                        <small>Asignatura: {profesor.asignatura}</small> <br />
                        <small>Sección: {profesor.seccion}</small>
                      </p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => editarProfesor(profesor.id)}>Editar</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarProfesor(profesor.id)}>Eliminar</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {modoEdicion ? 'Editar Profesor' : 'Agregar Profesor'}
                </h2>
                <div className="mb-3">
                  <label htmlFor="prof-rut" className="form-label">RUT del Profesor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="prof-rut"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="prof-nombre" className="form-label">Nombre del Profesor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="prof-nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="prof-apellido" className="form-label">Apellido del Profesor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="prof-apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="prof-edad" className="form-label">Edad del Profesor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="prof-edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="prof-asignatura" className="form-label">Asignatura del Profesor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="prof-asignatura"
                    value={asignatura}
                    onChange={(e) => setAsignatura(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="prof-seccion" className="form-label">Sección del Profesor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="prof-seccion"
                    value={seccion}
                    onChange={(e) => setSeccion(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={agregarProfesor}>
                  {modoEdicion ? 'Guardar Cambios' : 'Agregar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfesorForm;
