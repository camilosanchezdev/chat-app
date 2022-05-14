import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { EMPTY, Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { MessageModel } from 'src/app/common/models/message.model'
import { UserModel } from 'src/app/common/models/user.model'
import { UserService } from 'src/app/common/services/user.service'
import { AuthService } from 'src/app/core/services/auth.service'
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    messages: Array<MessageModel>
    receiver: UserModel
    constructor(private authService: AuthService, private modalService: NgbModal, private userService: UserService) {}
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.userService
                .getCurrentReceiver()
                .pipe(
                    switchMap((user) => {
                        if (user) {
                            return this.userService.getConversation(user.id)
                        } else {
                            return EMPTY
                        }
                    })
                )
                .subscribe((messages) => {
                    this.messages = messages
                })
        )
    }
    logout(): void {
        this.subscriptions.add(
            this.modalService.open(ConfirmationModalComponent, { centered: true, size: 'l' }).closed.subscribe((value) => {
                if (value) {
                    // this.authService.logout().subscribe()
                }
            })
        )
    }
}
