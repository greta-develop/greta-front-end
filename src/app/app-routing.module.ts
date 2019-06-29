import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { ListComponent } from './ledger/list/list.component'
import { InfoComponent } from './ledger/info/info.component'
import { CreateComponent } from "./bank/create/create.component"
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'ledger/list', component: ListComponent },
  { path: 'ledger/info', component: InfoComponent },

  { path: 'bank/create', component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
