import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { ListComponent } from './ledger/list/list.component'
import { InfoComponent } from './ledger/info/info.component'
import { CreateComponent } from "./bank/create/create.component"
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: ':pp/:p', redirectTo: 'ledger/info/:p/:pp', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'ledger/list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'ledger/info/:p/:pp', component: InfoComponent, canActivate: [AuthGuard] },

  { path: 'bank/create', component: CreateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
