import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'quotation', component: FormComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
