import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './datos.json';

function CursoForm() {
  const [cursos, setCursos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [nombreAsignatura, setNombreAsignatura] = useState('');
  const [cantidadEstudiantes, setCantidadEstudiantes] = useState('');
  const [seccion, setSeccion] = useState('');
  const [rutProfesor, setRutProfesor] = useState('');
  const [profesores, setProfesores] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cursoIdEditar, setCursoIdEditar] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    const storedCursos = JSON.parse(localStorage.getItem('cursos')) || data.cursos;
    const storedProfesores = JSON.parse(localStorage.getItem('profesores')) || data.profesores;
    setCursos(storedCursos);
    setProfesores(storedProfesores);

    console.log('Cursos:', storedCursos);
    console.log('Profesores:', storedProfesores);
  }, []);

  const agregarCurso = () => {
    if (nombre.trim() === '' || nombreAsignatura.trim() === '' || cantidadEstudiantes.trim() === '' || seccion.trim() === '' || rutProfesor.trim() === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    let cursosActualizados;
    if (modoEdicion && cursoIdEditar) {
      cursosActualizados = cursos.map((curso) => {
        if (curso.id === cursoIdEditar) {
          return { ...curso, nombre, nombreAsignatura, cantidadEstudiantes: parseInt(cantidadEstudiantes), seccion, rutProfesor };
        }
        return curso;
      });
      setModoEdicion(false);
      setCursoIdEditar(null);
    } else {
      const nuevoCurso = {
        id: cursos.length + 1,
        nombre,
        nombreAsignatura,
        cantidadEstudiantes: parseInt(cantidadEstudiantes),
        seccion,
        rutProfesor
      };
      cursosActualizados = [...cursos, nuevoCurso];
    }

    setCursos(cursosActualizados);
    localStorage.setItem('cursos', JSON.stringify(cursosActualizados));

    console.log('Cursos actualizados:', cursosActualizados);

    setNombre('');
    setNombreAsignatura('');
    setCantidadEstudiantes('');
    setSeccion('');
    setRutProfesor('');
  };

  const editarCurso = (id) => {
    const cursoEditar = cursos.find((curso) => curso.id === id);
    if (cursoEditar) {
      setNombre(cursoEditar.nombre);
      setNombreAsignatura(cursoEditar.nombreAsignatura);
      setCantidadEstudiantes(cursoEditar.cantidadEstudiantes.toString());
      setSeccion(cursoEditar.seccion);
      setRutProfesor(cursoEditar.rutProfesor);
      setModoEdicion(true);
      setCursoIdEditar(id);
    }
  };

  const eliminarCurso = (id) => {
    const cursosActualizados = cursos.filter((curso) => curso.id !== id);
    setCursos(cursosActualizados);
    localStorage.setItem('cursos', JSON.stringify(cursosActualizados));

    console.log('Cursos después de eliminar:', cursosActualizados);
  };

  const buscarCurso = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  const cursosFiltrados = cursos.filter((curso) =>
    curso.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    curso.nombreAsignatura.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <a className="navbar-brand" href="#">Gestión de Cursos</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <h4 className="text-center mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Lista de Cursos</h4>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar curso por nombre o asignatura"
                value={terminoBusqueda}
                onChange={buscarCurso}
              />
            </div>
            <div className="row">
              {cursosFiltrados.map((curso) => {
                const profesorNombre = profesores.find(prof => prof.rut === curso.rutProfesor)?.nombre || 'Sin profesor';
                return (
                  <div key={curso.id} className="col-md-6 mb-3">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title">{curso.nombre}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{curso.nombreAsignatura}</h6>
                        <p className="card-text">
                          <small>Cantidad de Estudiantes: {curso.cantidadEstudiantes}</small> <br />
                          <small>Sección: {curso.seccion}</small> <br />
                          <small>Profesor: {profesorNombre}</small>
                        </p>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => editarCurso(curso.id)}>Editar</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarCurso(curso.id)}>Eliminar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {modoEdicion ? 'Editar Curso' : 'Agregar Curso'}
                </h2>
                <div className="mb-3">
                  <label htmlFor="curso-nombre" className="form-label">Nombre del Curso</label>
                  <input
                    type="text"
                    className="form-control"
                    id="curso-nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="curso-asignatura" className="form-label">Nombre de la Asignatura</label>
                  <input
                    type="text"
                    className="form-control"
                    id="curso-asignatura"
                    value={nombreAsignatura}
                    onChange={(e) => setNombreAsignatura(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="curso-cantidad" className="form-label">Cantidad de Estudiantes</label>
                  <input
                    type="number"
                    className="form-control"
                    id="curso-cantidad"
                    value={cantidadEstudiantes}
                    onChange={(e) => setCantidadEstudiantes(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="curso-seccion" className="form-label">Sección</label>
                  <input
                    type="text"
                    className="form-control"
                    id="curso-seccion"
                    value={seccion}
                    onChange={(e) => setSeccion(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="curso-profesor" className="form-label">Nombre del Profesor</label>
                  <select
                    className="form-control"
                    id="curso-profesor"
                    value={rutProfesor}
                    onChange={(e) => setRutProfesor(e.target.value)}
                  >
                    <option value="">Selecciona un profesor</option>
                    {profesores.map((prof) => (
                      <option key={prof.rut} value={prof.rut}>
                        {prof.nombre} {prof.apellido}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={agregarCurso}>
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

export default CursoForm;
