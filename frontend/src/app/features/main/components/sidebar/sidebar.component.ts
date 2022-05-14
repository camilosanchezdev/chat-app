import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { EMPTY, Subscription } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { UserModel } from 'src/app/common/models/user.model'
import { UserService } from 'src/app/common/services/user.service'
import { AuthService } from 'src/app/core/services/auth.service'
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    userId: number
    usersOnline: UserModel[]
    constructor(private authService: AuthService, private modalService: NgbModal, private userService: UserService) {}
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.userService.getOnlineUsers().subscribe((users) => {
                if (users) {
                    this.usersOnline = users
                }
            })
        )
        this.subscriptions.add(
            this.userService.getOnline().subscribe((userSocket: { userId: number; isOnline: boolean }) => {
                // console.log(message)
                const users = this.usersOnline.map((user) => {
                    if (user.id === userSocket.userId) {
                        return { ...user, isOnline: userSocket.isOnline }
                    } else {
                        return user
                    }
                })
                this.userService.setOnlineUsers(users)
            })
        )
        this.subscriptions.add(
            this.userService
                .getUserLoggedId()
                .pipe(
                    tap((userId) => {
                        if (userId) this.userService.setUserStatus(userId, true)
                    })
                )
                .subscribe((userId) => {
                    this.userId = userId
                })
        )
    }
    logout(): void {
        this.subscriptions.add(
            this.modalService.open(ConfirmationModalComponent, { centered: true, size: 'l' }).closed.subscribe((response) => {
                if (response) {
                    this.authService.logout(this.userId).subscribe()
                }
            })
        )
        // this.subscriptions.add(
        //     this.modalService.open(ConfirmationModalComponent, { centered: true, size: 'l' }).closed.subscribe((value) => {
        //         if (value) {
        //             this.authService.logout().subscribe()
        //         }
        //     })
        // )
    }
}
