import {Component, OnInit} from '@angular/core';
import {Empleado} from "../empleado";
import {EmpleadoService} from "../index/empleado.service";
import {Router, ActivatedRoute} from "@angular/router";
import swal from 'sweetalert2';
import {Observable} from "rxjs";
import {AuthService} from "../../../usuarios/auth.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  empleado: Empleado = new Empleado();
  title: string = 'Crear empleado';
  errores: string[];

  constructor(private empleadoService: EmpleadoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadEmpleado();
  }

  loadEmpleado(): void {
    console.log("loadEmpleado -> ")
    this.activatedRoute.params.subscribe(params => {
      console.info("params --> ", params)
      let id = params['id']
      if (id) {
        if (this.authService.hasRole('ROLE_ADMIN'))
          this.title = 'Actualizar empleado';
        else
          this.title = 'Actualizar información';
        this.empleadoService.getEmpleado(id).subscribe(
          (empleado) => this.empleado = empleado
        )
      }
    })
  }

  create(): void {
    this.empleadoService.create(this.empleado).subscribe(
      empleado => {
        this.router.navigate(['/empleados']);
        swal('Nuevo empleado', `El empleado ${empleado.nombres} ha sido creado correctamente`, 'success');
      },
      err => {
        console.error('Código del error desde el backend: ', err);
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    if (this.empleado.estadoVacunacion != 'Vacunado') {
      this.empleado.tipoVacuna = '';
      this.empleado.numeroDosis = '';
      this.empleado.fechaVacunacion = '';
    }

    this.empleadoService.update(this.empleado).subscribe(
      json => {
        if (this.authService.hasRole('ROLE_ADMIN')) {
          this.router.navigate(['/empleados']);
          swal('Empleado Actualizado', `${json.mensaje}: ${json.empleado.nombres}`, 'success');
        } else {
          this.router.navigate(['/empleados/create', this.authService.usuario.empleado.id]);
          swal('Información Actualizada', `${json.mensaje}: ${json.empleado.nombres}`, 'success');
        }

      },
      err => {
        console.error('Código del error desde el backend: ', err);
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
      }
    );
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

}
