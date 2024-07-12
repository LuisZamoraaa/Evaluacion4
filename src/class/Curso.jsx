class Curso{
    constructor(idcurso, nombre,cantestud, seccion, rutprof){
        this.idcurso=idcurso;
        this.nombre=nombre;
        this.cantestud=cantestud;
        this.seccion=seccion;
        this.rutprof=rutprof;
    }

    mostarCurso(){
        return "Id Curso: "+this.idcurso+" Nombre: "+this.nombre+" Cantidad Estudiantes: "+this.cantestud+" Seccion: "+this.seccion+" Rut Profesor: "+this.rutprof;
    }
}
export default Curso;