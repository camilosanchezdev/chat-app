import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PublicComponent } from './public.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { PublicRoutingModule } from './public-routing.module';
import { FormLayoutComponent } from './components/form-layout/form-layout.component'

@NgModule({
    declarations: [PublicComponent, LoginComponent, RegisterComponent, FormLayoutComponent],
    imports: [CommonModule, PublicRoutingModule],
})
export class PublicModule {}
