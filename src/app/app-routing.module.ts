import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';

const routes: Routes = [
  {path: 'login', component: AuthComponent},
  // {path: 'create-employee', component: CreateEmployeeComponent},
  // {path: '', redirectTo: 'employees', pathMatch: 'full'},
  // {path: 'update-employee/:id', component: UpdateEmployeeComponent},
  // {path: 'employee-details/:id', component: EmployeeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
