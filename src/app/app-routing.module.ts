import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './views/home/home.component';
import { RegistrationComponent } from './views/registration/registration.component';


const routes: Routes = [
  {
    path: 'auth', children: [
      { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
