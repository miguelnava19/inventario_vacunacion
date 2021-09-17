import {Component, OnInit} from '@angular/core';
import {Empleado} from '../empleado';
import {EmpleadoService} from './empleado.service';
import swal from 'sweetalert2';
import {AuthService} from "../../../usuarios/auth.service";
import {Router} from "@angular/router";
import {ModalService} from "../detalle/modal.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  empleadosList: Empleado[];
  title: string = 'Lista empleados';
  empleadoSeleccionado: Empleado;
  filtros: any = {
    dosis: '',
    estadoVacunacion: '',
    tipoVacuna: ''
  }

  constructor(private empleadoService: EmpleadoService,
              private authService: AuthService,
              private router: Router,
              private modalService: ModalService) {
  }

  hasRole(role: string) {
    return this.authService.hasRole(role);
  }

  ngOnInit(): void {
    if (!this.hasRole('ROLE_ADMIN')) {
      this.router.navigate(['/enpleados/create',])
    }
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.empleadosList = empleados
    );
  }

  limpiar() {
    this.filtros.dosis = ''
    this.filtros.estadoVacunacion = '';
    this.filtros.tipoVacuna = '';
  }

  delete(empleado: Empleado): void {
    swal({
      title: '¿Está seguro?',
      text: `¿Seguro desea eliminar el empleado ${empleado.nombres} ${empleado.apellidos}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.empleadoService.delete(empleado.id).subscribe(
          response => {
            this.empleadosList = this.empleadosList.filter(emp => emp !== empleado);
            swal(
              'Eliminado!',
              `Empleado ${empleado.nombres} ${empleado.apellidos} eliminado correctamente`,
              'success'
            )
          }
        )
      }
    })
  }

  abrirModal(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.modalService.abrirModal();
  }

}
