import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs'
import { UserService } from 'src/app/common/services/user.service'
import { ChangeAvatarComponent } from '../change-avatar/change-avatar.component'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    username: string
    constructor(private userService: UserService, private modalService: NgbModal) {}
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.userService.getUserLogged().subscribe((x) => {
                this.username = x.app.username
            })
        )
    }
    changeAvatar(): void {
        this.modalService.open(ChangeAvatarComponent, { centered: true, size: 'l' })
    }
}
