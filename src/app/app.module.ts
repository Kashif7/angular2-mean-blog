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
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
//services
import { AuthService } from './auth.service';
import { PostService } from './post.service';
import { UserService } from './user.service';

import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    DashboardComponent,
    SearchUserComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2CompleterModule
  ],
  providers: [AuthService,AuthGuard,PostService,Uploader,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
