//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { Uploader } from 'angular2-http-file-upload';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//services
import { AuthService } from './auth.service';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';

//Authentication
import { AuthGuard } from './auth/auth.guard';
import { SearchUserComponent } from './search-user/search-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    SearchUserComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService,AuthGuard,Uploader],
  bootstrap: [AppComponent]
})
export class AppModule { }
