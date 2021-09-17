import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario} from "./usuario";
import {EmpleadoService} from "../administrador/empleado/index/empleado.service";
import {Empleado} from "../administrador/empleado/empleado";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient, private empleadoService: EmpleadoService) {
  }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const url: string = "http://localhost:8080/oauth/token";
    const credenciales = btoa('app' + ':' + '12345');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(url, params.toString(), {headers: headers})
  }

  guardarUsuario(accessToken: string): void {
    let objPayload = this.obtenerPayload(accessToken);
    console.info("objPayload ", objPayload)
    this._usuario = new Usuario();
    this._usuario.username = objPayload.user_name;
    this._usuario.roles = objPayload.authorities;

    if (objPayload.empleado_id) {
      console.log("empleado id --> ", objPayload.empleado_id);
      sessionStorage.setItem('empleado_id', JSON.stringify(objPayload.empleado_id));
      this.empleadoService.getEmpleado(objPayload.empleado_id).subscribe(
        (empleado) => {
          console.log("empleado -> ", empleado);
          this._usuario.empleado = empleado;
          console.log("_usuario --> ", this._usuario)
          sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
        }
      );
    } else
      sessionStorage.setItem('usuario', JSON.stringify(this._usuario));


  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerPayload(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerPayload(this.token);
    return payload != null && payload.user_name && payload.user_name.length > 0;
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
  }
}
