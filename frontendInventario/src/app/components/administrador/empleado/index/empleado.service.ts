import {Injectable} from '@angular/core';
import {Empleado} from '../empleado';
import {of, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, catchError} from "rxjs/operators";
import swal from "sweetalert2";
import {Router} from "@angular/router";
import {AuthService} from "../../../usuarios/auth.service";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private url: string = "http://localhost:8080/api/empleados"


  constructor(private http: HttpClient, private router: Router) {
  }


  getEmpleados(): Observable<Empleado[]> {
    // return of(EMPLEADOS);
    return this.http.get<Empleado[]>(this.url).pipe(
      catchError(e => {
        return throwError(e);
      })
    );

  }

  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post(this.url, empleado).pipe(
      map((response: any) => response.empleado as Empleado),
      catchError(e => {
        console.error("create error", e);
        if (e.status === 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getEmpleado(id): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/empleados'])
        console.error("getEmpleado error", e);
        swal('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(empleado: Empleado): Observable<any> {
    return this.http.put<any>(`${this.url}/${empleado.id}`, empleado).pipe(
      catchError(e => {
        console.error("update error", e);
        if (e.status === 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id): Observable<Empleado> {
    return this.http.delete<Empleado>(`${this.url}/${id}`).pipe(
      catchError(e => {
        console.error("delete error", e);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }))
  }
}
