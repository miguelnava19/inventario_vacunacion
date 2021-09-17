import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {FooterBarComponent} from './components/footer-bar/footer-bar.component';
import {IndexComponent} from './components/administrador/empleado/index/index.component';
import {CreateComponent} from './components/administrador/empleado/create/create.component';
import {EmpleadoService} from './components/administrador/empleado/index/empleado.service';

import {RouterModule, Routes} from '@angular/router';
import {FiltrosPipe} from './components/administrador/empleado/filtros.pipe';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {LoginComponent} from './components/usuarios/login.component';
import {AuthGuard} from "./usuarios/guards/auth.guard";
import {RoleGuard} from "./usuarios/guards/role.guard";
import {TokenInterceptor} from "./usuarios/interceptors/token.interceptor";
import { DetalleComponent } from './components/administrador/empleado/detalle/detalle.component';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {path: '', redirectTo: '/empleados', pathMatch: 'full'},
  {path: 'empleados', component: IndexComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['ROLE_ADMIN']}},
  {
    path: 'empleados/create',
    component: CreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ROLE_ADMIN']}
  },
  {
    path: 'empleados/create/:id',
    component: CreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['ROLE_ADMIN', 'ROLE_EMPLEADO']}
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    IndexComponent,
    CreateComponent,
    FiltrosPipe,
    LoginComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, MatDatepickerModule, MatMomentDateModule
  ],
  providers: [EmpleadoService, {provide: LOCALE_ID, useValue: 'es'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule {
  title: string = 'Inventario de vacunación';
}
