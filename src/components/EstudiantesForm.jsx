import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './datos.json'; // Asegúrate de que la ruta sea correcta

function EstudianteForm() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [seccion, setSeccion] = useState('');
  const [rutProfesor, setRutProfesor] = useState('');
  const [idCurso, setIdCurso] = useState('');
  const [profesores, setProfesores] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [estudianteIdEditar, setEstudianteIdEditar] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    const storedProfesores = JSON.parse(localStorage.getItem('profesores')) || data.profesores;
    const storedCursos = JSON.parse(localStorage.getItem('cursos')) || data.cursos;
    const storedEstudiantes = JSON.parse(localStorage.getItem('estudiantes')) || data.estudiantes;

    setProfesores(storedProfesores);
    setCursos(storedCursos);
    setEstudiantes(storedEstudiantes);

    console.log('Profesores:', storedProfesores);
    console.log('Cursos:', storedCursos);
    console.log('Estudiantes:', storedEstudiantes);
  }, []);

  const agregarEstudiante = () => {
    if (rut.trim() === '' || nombre.trim() === '' || apellido.trim() === '' || edad.trim() === '' || asignatura.trim() === '' || seccion.trim() === '' || rutProfesor.trim() === '' || idCurso.trim() === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    let estudiantesActualizados;
    if (modoEdicion) {
      estudiantesActualizados = estudiantes.map((estudiante) => {
        if (estudiante.id === estudianteIdEditar) {
          return {
            ...estudiante,
            rut,
            nombre,
            apellido,
            edad,
            asignatura,
            seccion,
            rutProfesor,
            idCurso: parseInt(idCurso)
          };
        }
        return estudiante;
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
        idCurso: parseInt(idCurso)
      };
      estudiantesActualizados = [...estudiantes, nuevoEstudiante];
    }

    setEstudiantes(estudiantesActualizados);
    localStorage.setItem('estudiantes', JSON.stringify(estudiantesActualizados));

    console.log('Estudiantes actualizados:', estudiantesActualizados);

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
    const estudianteEditar = estudiantes.find((estudiante) => estudiante.id === id);
    if (estudianteEditar) {
      setRut(estudianteEditar.rut);
      setNombre(estudianteEditar.nombre);
      setApellido(estudianteEditar.apellido);
      setEdad(estudianteEditar.edad);
      setAsignatura(estudianteEditar.asignatura);
      setSeccion(estudianteEditar.seccion);
      setRutProfesor(estudianteEditar.rutProfesor);
      setIdCurso(estudianteEditar.idCurso.toString());
      setModoEdicion(true);
      setEstudianteIdEditar(id);
    }
  };

  const eliminarEstudiante = (id) => {
    const estudiantesActualizados = estudiantes.filter((estudiante) => estudiante.id !== id);
    setEstudiantes(estudiantesActualizados);
    localStorage.setItem('estudiantes', JSON.stringify(estudiantesActualizados));

    console.log('Estudiantes después de eliminar:', estudiantesActualizados);
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
              {estudiantesFiltrados.map((estudiante) => {
                const profesorNombre = profesores.find(prof => prof.rut === estudiante.rutProfesor)?.nombre || 'Sin profesor';
                const cursoNombre = cursos.find(curso => curso.id === estudiante.idCurso)?.nombre || 'Sin curso';
                return (
                  <div key={estudiante.id} className="col-md-6 mb-3">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title">{estudiante.nombre} {estudiante.apellido}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{estudiante.rut}</h6>
                        <p className="card-text">
                          <small>Edad: {estudiante.edad}</small> <br />
                          <small>Asignatura: {estudiante.asignatura}</small> <br />
                          <small>Sección: {estudiante.seccion}</small> <br />
                          <small>Profesor: {profesorNombre}</small> <br />
                          <small>Curso: {cursoNombre}</small>
                        </p>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => editarEstudiante(estudiante.id)}>Editar</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarEstudiante(estudiante.id)}>Eliminar</button>
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
                  <label htmlFor="est-asignatura" className="form-label">Asignatura</label>
                  <input
                    type="text"
                    className="form-control"
                    id="est-asignatura"
                    value={asignatura}
                    onChange={(e) => setAsignatura(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="est-seccion" className="form-label">Sección</label>
                  <input
                    type="text"
                    className="form-control"
                    id="est-seccion"
                    value={seccion}
                    onChange={(e) => setSeccion(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="est-rut-profesor" className="form-label">Nombre del Profesor</label>
                  <select
                    className="form-control"
                    id="est-rut-profesor"
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
                <div className="mb-3">
                  <label htmlFor="est-curso" className="form-label">Curso</label>
                  <select
                    className="form-control"
                    id="est-curso"
                    value={idCurso}
                    onChange={(e) => setIdCurso(e.target.value)}
                  >
                    <option value="">Selecciona un curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </select>
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

export default EstudianteForm;

