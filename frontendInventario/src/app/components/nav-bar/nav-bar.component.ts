import {Component, OnInit} from '@angular/core';
import {AuthService} from "../usuarios/auth.service";
import swal from "sweetalert2";
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  title: string = 'Frontend';

  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }


}
