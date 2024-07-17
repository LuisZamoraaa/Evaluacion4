import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function EstudiantesForm() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [seccion, setSeccion] = useState('');
  const [rutProfesor, setRutProfesor] = useState('');
  const [idCurso, setIdCurso] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [estudianteIdEditar, setEstudianteIdEditar] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/estudiantes/import');
        setEstudiantes(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const agregarEstudiante = () => {
    if (rut.trim() === '' || nombre.trim() === '' || apellido.trim() === '' || edad.trim() === '' || asignatura.trim() === '' || seccion.trim() === '' || rutProfesor.trim() === '' || idCurso.trim() === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    let estudiantesActualizados;
    if (modoEdicion && estudianteIdEditar) {
      estudiantesActualizados = estudiantes.map((est) => {
        if (est.id === estudianteIdEditar) {
          return { ...est, rut, nombre, apellido, edad, asignatura, seccion, rutProfesor, idCurso };
        }
        return est;
      });
      setModoEdicion(false);
      setEstudianteIdEditar(null);
    } else {
      const nuevoEstudiante = {
        id: estudiantes.length + 1,
        rut,
        nombre,
        apellido,
        edad,
        asignatura,
        seccion,
        rutProfesor,
        idCurso
      };
      estudiantesActualizados = [...estudiantes, nuevoEstudiante];
    }

    setEstudiantes(estudiantesActualizados);

    setRut('');
    setNombre('');
    setApellido('');
    setEdad('');
    setAsignatura('');
    setSeccion('');
    setRutProfesor('');
    setIdCurso('');
  };

  const editarEstudiante = (id) => {
    const estudianteEditar = estudiantes.find((est) => est.id === id);
    if (estudianteEditar) {
      setRut(estudianteEditar.rut);
      setNombre(estudianteEditar.nombre);
      setApellido(estudianteEditar.apellido);
      setEdad(estudianteEditar.edad);
      setAsignatura(estudianteEditar.asignatura);
      setSeccion(estudianteEditar.seccion);
      setRutProfesor(estudianteEditar.rutProfesor);
      setIdCurso(estudianteEditar.idCurso);
      setModoEdicion(true);
      setEstudianteIdEditar(id);
    }
  };

  const eliminarEstudiante = (id) => {
    const estudiantesActualizados = estudiantes.filter((est) => est.id !== id);
    setEstudiantes(estudiantesActualizados);
  };

  const buscarEstudiante = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  const estudiantesFiltrados = estudiantes.filter((estudiante) =>
    estudiante.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    estudiante.apellido.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    estudiante.rut.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <a className="navbar-brand" href="#">Gestión de Estudiantes</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <h4 className="text-center mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Lista de Estudiantes</h4>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar estudiante por RUT, nombre o apellido"
                value={terminoBusqueda}
                onChange={buscarEstudiante}
              />
            </div>
            <div className="row">
              {estudiantesFiltrados.map((estudiante) => (
                <div key={estudiante.id} className="col-md-6 mb-3">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{estudiante.nombre} {estudiante.apellido}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{estudiante.rut}</h6>
                      <p className="card-text">
                        <small>Edad: {estudiante.edad}</small> <br />
                        <small>Asignatura: {estudiante.asignatura}</small> <br />
                        <small>Sección: {estudiante.seccion}</small> <br />
                        <small>Profesor: {estudiante.rutProfesor}</small> <br />
                        <small>Curso: {estudiante.idCurso}</small>
                      </p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => editarEstudiante(estudiante.id)}>Editar</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarEstudiante(estudiante.id)}>Eliminar</button>
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
                  {modoEdicion ? 'Editar Estudiante' : 'Agregar Estudiante'}
                </h2>
                <div className="mb-3">
                  <label htmlFor="est-rut" className="form-label">RUT del Estudiante</label>
                  <input
                    type="text"
                    className="form-control"
                    id="est-rut"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="est-nombre" className="form-label">Nombre del Estudiante</label>
                  <input
                    type="text"
                    className="form-control"
                    id="est-nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="est-apellido" className="form-label">Apellido del Estudiante</label>
                  <input
                    type="text"
                    className="form-control"
                    id="est-apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="est-edad" className="form-label">Edad del Estudiante</label>
                  <input
                    type="text"
                    className="form-control"
                    id="est-edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="est-asignatura" className="form-label">Asignatura del Estudiante</label>
                  <input
                    type="text"
                    className="form-control"
                    id="est-asignatura"
                    value={asignatura}
                    onChange={(e) => setAsignatura(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="est-seccion" className="form-label">Sección del Estudiante</label>
                  <input
                    type="text"
                    className="form-control"
                    id="est-seccion"
                    value={seccion}
                    onChange={(e) => setSeccion(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="est-rutProfesor" className="form-label">RUT del Profesor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="est-rutProfesor"
                    value={rutProfesor}
                    onChange={(e) => setRutProfesor(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="est-idCurso" className="form-label">ID del Curso</label>
                  <input
                    type="text"
                    className="form-control"
                    id="est-idCurso"
                    value={idCurso}
                    onChange={(e) => setIdCurso(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={agregarEstudiante}>
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

export default EstudiantesForm;
