import {Usuario} from "../../usuarios/usuario";

export class Empleado {
  id!: number;
  cedula!: string;
  nombres!: string;
  apellidos!: string;
  email!: string;

  fechaNacimiento: string = '';
  domicilio: string = '';
  telefono: string = '';
  estadoVacunacion: string = '';//Vacunado / No Vacunado
  tipoVacuna: string = '';//Sputnik, AstraZeneca, Pfizer y Jhonson&Jhonson
  numeroDosis: string = '';
  fechaVacunacion:string = '';

  usuario: Usuario = null;
}
