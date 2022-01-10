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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeAvatarComponent } from './components/change-avatar/change-avatar.component'

@NgModule({
    declarations: [MainComponent, ContactsComponent, OnlineComponent, ConversationComponent, ContactComponent, SidebarComponent, ProfileComponent, ChangeAvatarComponent],
    imports: [CommonModule, MainRoutingModule, FormsModule, ReactiveFormsModule],
})
export class MainModule {}
