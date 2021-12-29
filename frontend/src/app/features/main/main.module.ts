import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { OnlineComponent } from './pages/online/online.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ContactComponent } from './components/contact/contact.component'

@NgModule({
    declarations: [MainComponent, ContactsComponent, OnlineComponent, ConversationComponent, ContactComponent],
    imports: [CommonModule],
})
export class MainModule {}
