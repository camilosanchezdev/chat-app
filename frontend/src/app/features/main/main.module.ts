import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main.component'
import { ContactsComponent } from './pages/contacts/contacts.component'
import { OnlineComponent } from './pages/online/online.component'
import { ConversationComponent } from './components/conversation/conversation.component'
import { ContactComponent } from './components/contact/contact.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { MainRoutingModule } from './main-routing.module'
import { ProfileComponent } from './components/profile/profile.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ChangeAvatarComponent } from './components/change-avatar/change-avatar.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component'
@NgModule({
    declarations: [
        MainComponent,
        ContactsComponent,
        OnlineComponent,
        ConversationComponent,
        ContactComponent,
        SidebarComponent,
        ProfileComponent,
        ChangeAvatarComponent,
        ConfirmationModalComponent,
    ],
    imports: [CommonModule, MainRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgbModule],
})
export class MainModule {}
