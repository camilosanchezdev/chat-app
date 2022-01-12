import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'
import { UserService } from 'src/app/common/services/user.service'
import { AVATARS } from 'src/app/core/config/user.config'

@Component({
    selector: 'change-avatar',
    templateUrl: './change-avatar.component.html',
    styleUrls: ['./change-avatar.component.css'],
})
export class ChangeAvatarComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    avatars: Array<number>
    constructor(private userService: UserService, private activeModal: NgbActiveModal) {}
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.avatars = Array(AVATARS)
            .fill(null)
            .map((x, i) => i + 1)
    }
    onChange(avatarId: number): void {
        this.subscriptions.add(
            this.userService
                .changeAvatar({ avatar: avatarId })
                .pipe(
                    tap(() => {
                        return this.activeModal.close({})
                    })
                )
                .subscribe()
        )
    }
}
