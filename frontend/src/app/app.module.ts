import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './features/public/pages/login/login.component';
import { RegisterComponent } from './features/public/pages/register/register.component'

@NgModule({
    declarations: [AppComponent, LoginComponent, RegisterComponent],
    imports: [BrowserModule, AppRoutingModule, NgbModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
