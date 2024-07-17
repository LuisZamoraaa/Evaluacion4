import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function CursosForm() {
  const [cursos, setCursos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [nombreAsignatura, setNombreAsignatura] = useState('');
  const [cantidadEstudiantes, setCantidadEstudiantes] = useState('');
  const [seccion, setSeccion] = useState('');
  const [rutProfesor, setRutProfesor] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cursoIdEditar, setCursoIdEditar] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/cursos/import');
        setCursos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
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
          return { ...curso, nombre, nombreAsignatura, cantidadEstudiantes, seccion, rutProfesor };
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
        cantidadEstudiantes,
        seccion,
        rutProfesor
      };
      cursosActualizados = [...cursos, nuevoCurso];
    }

    setCursos(cursosActualizados);

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
      setCantidadEstudiantes(cursoEditar.cantidadEstudiantes);
      setSeccion(cursoEditar.seccion);
      setRutProfesor(cursoEditar.rutProfesor);
      setModoEdicion(true);
      setCursoIdEditar(id);
    }
  };

  const eliminarCurso = (id) => {
    const cursosActualizados = cursos.filter((curso) => curso.id !== id);
    setCursos(cursosActualizados);
  };

  const buscarCurso = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  const cursosFiltrados = cursos.filter((curso) =>
    curso.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    curso.nombreAsignatura.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    curso.rutProfesor.toLowerCase().includes(terminoBusqueda.toLowerCase())
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
                placeholder="Buscar curso por nombre, asignatura o RUT del profesor"
                value={terminoBusqueda}
                onChange={buscarCurso}
              />
            </div>
            <div className="row">
              {cursosFiltrados.map((curso) => (
                <div key={curso.id} className="col-md-6 mb-3">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{curso.nombre}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{curso.nombreAsignatura}</h6>
                      <p className="card-text">
                        <small>Cantidad de Estudiantes: {curso.cantidadEstudiantes}</small> <br />
                        <small>Sección: {curso.seccion}</small> <br />
                        <small>Profesor: {curso.rutProfesor}</small>
                      </p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => editarCurso(curso.id)}>Editar</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarCurso(curso.id)}>Eliminar</button>
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
                  <label htmlFor="curso-nombreAsignatura" className="form-label">Nombre de la Asignatura</label>
                  <input
                    type="text"
                    className="form-control"
                    id="curso-nombreAsignatura"
                    value={nombreAsignatura}
                    onChange={(e) => setNombreAsignatura(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="curso-cantidadEstudiantes" className="form-label">Cantidad de Estudiantes</label>
                  <input
                    type="text"
                    className="form-control"
                    id="curso-cantidadEstudiantes"
                    value={cantidadEstudiantes}
                    onChange={(e) => setCantidadEstudiantes(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="curso-seccion" className="form-label">Sección del Curso</label>
                  <input
                    type="text"
                    className="form-control"
                    id="curso-seccion"
                    value={seccion}
                    onChange={(e) => setSeccion(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="curso-rutProfesor" className="form-label">RUT del Profesor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="curso-rutProfesor"
                    value={rutProfesor}
                    onChange={(e) => setRutProfesor(e.target.value)}
                  />
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

export default CursosForm;
