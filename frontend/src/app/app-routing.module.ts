import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthUserGuard } from './common/guards/auth-user.guard'
import { AuthGuard } from './common/guards/auth.guard'

const routes: Routes = [
    { path: '', loadChildren: () => import('./features/main/main.module').then((m) => m.MainModule), canActivate: [AuthGuard] }, //, canActivate: [AuthGuard]
    { path: 'user', loadChildren: () => import('./features/public/public.module').then((m) => m.PublicModule), canActivate: [AuthUserGuard] }, //, canActivate: [AuthUserGuard]
    { path: '**', redirectTo: 'user' },
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
