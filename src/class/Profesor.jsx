class Profesor{
    constructor(rut, nombre, apellido, edad, asignatura, seccion){
    this.rut=rut;
    this.nombre=nombre;
    this.apellido=apellido;
    this.edad=edad;
    this.asignatura=asignatura;
    this.seccion=seccion;
    }

    mostarDatos(){
        return "Rut: "+this.rut+" Nombre: "+this.nombre+" "+this.apellido+" Edad: "+this.edad+" Asignatura: "+this.asignatura+" Seccion: "+this.seccion;
    }
}
export default Profesor;