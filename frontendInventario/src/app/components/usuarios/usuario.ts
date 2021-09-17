import {Empleado} from "../administrador/empleado/empleado";

export class Usuario {
  id: number;
  username: string;
  password: string;
  roles: string[] = [];
  empleado: Empleado = null;
}
