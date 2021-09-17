import { Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer-bar.component.html'
})
export class FooterBarComponent {
  autor: any = { nombre: 'Miguel', apellido: 'Nava', email: 'miguelnava1917@gmail.com' }
}
