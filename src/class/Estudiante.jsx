class Estudiante{
    constructor(rut, nombre, apellido, edad, carrera, seccion, rutprof, idcurso){
        this.rut=rut;
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.carrera=carrera;
        this.seccion=seccion;
        this.rutprof=rutprof;
        this.idcurso=idcurso;
    }

    mostarEstudiante(){
        return "Rut: "+this.rut+" Nombre: "+this.nombre+" "+this.apellido+" Edad: "+this.edad+" Carrera: "+this.carrera+" Seccion: "+this.seccion+" Rut Profesor: "+this.rutprof+" Id Curso: "+this.idcurso;
    }
}
export default Estudiante;