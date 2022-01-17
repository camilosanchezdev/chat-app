import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainComponent } from './main.component'
import { ContactsComponent } from './pages/contacts/contacts.component'
import { OnlineComponent } from './pages/online/online.component'

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: OnlineComponent,
            },
            {
                path: 'contacts',
                component: ContactsComponent,
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
