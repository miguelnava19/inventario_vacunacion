import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import swal from "sweetalert2";
import {AuthService} from "../../components/usuarios/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    let roles_allowed = route.data['roles'];
    console.log(roles_allowed);
    for (let role of roles_allowed) {
      if (this.authService.hasRole(role)) {
        return true;
      }
    }


    swal('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
    if (this.authService.hasRole('ROLE_ADMIN'))
      this.router.navigate(['/empleados']);
    else
      this.router.navigate(['/empleados/create', this.authService.usuario.empleado.id]);
    return false;
  }

}
