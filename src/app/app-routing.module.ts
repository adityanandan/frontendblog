import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogDashboardComponent } from './components/blog-dashboard/blog-dashboard.component';
import { AuthGuard } from './auth-guards/auth.guard';


const routes: Routes = [{ path: "", redirectTo: "login", pathMatch: "full" },
{ path: "login", component: LoginComponent },
{ path: "register", component: RegisterComponent },
{
  path: "home", component: BlogDashboardComponent,
  canActivate: [AuthGuard],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
