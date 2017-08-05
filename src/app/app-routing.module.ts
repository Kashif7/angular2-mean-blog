//modules
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

//components
import { AppComponent } from './app.component';

//routing urls
const routes: Routes = [
    //default route
    {path:'',redirectTo:'home',pathMatch:'full'},
    //feature routes
    {path:'home',component: AppComponent}
]

@NgModule({
    //initializing the root routing-module with the routing urls
    imports:[RouterModule.forRoot(routes)],
    //exporting the initialized routing-module
    exports: [RouterModule]
})
export class AppRoutingModule{}