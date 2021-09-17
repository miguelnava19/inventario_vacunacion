import {Component, Input, OnInit} from '@angular/core';
import {EmpleadoService} from "../index/empleado.service";
import {AuthService} from "../../../usuarios/auth.service";
import {ModalService} from "./modal.service";
import {Empleado} from "../empleado";

@Component({
  selector: 'detalle-empleado',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() empleado: Empleado;

  titulo: string = "Detalle de empleado";

  constructor(private empleadoService: EmpleadoService,
              private authService: AuthService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    console.log("empleado --> ", this.empleado)
  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }

  getModalService() {
    return this.modalService;
  }

}
