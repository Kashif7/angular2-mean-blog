//modules
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
//Authentication
import { AuthGuard } from './auth/auth.guard';
//routing urls
const routes: Routes = [
    //default route
    {path:'',component: HomeComponent,canActivate: [AuthGuard]},
    //feature routes
    {path:'login',component: LoginComponent},
    {path:'register',component: RegistrationComponent},
    {path:'home',component: AppComponent}
]

@NgModule({
    //initializing the root routing-module with the routing urls
    imports:[RouterModule.forRoot(routes)],
    //exporting the initialized routing-module
    exports: [RouterModule]
})
export class AppRoutingModule{}