import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { forkJoin, Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { StatusModel } from 'src/app/common/models/status.model'
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
    statusId: number
    avatarId: number
    statuses: Array<StatusModel>
    formGroup: FormGroup
    constructor(private userService: UserService, private modalService: NgbModal, private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            statuses: [null],
        })
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.userService
                .getUserLogged()
                .pipe(
                    switchMap((state) => {
                        this.username = state.app.username
                        this.statusId = state.app.statusId
                        this.avatarId = state.app.avatarId

                        return this.userService.getStatuses()
                    })
                )
                .subscribe((statuses) => {
                    this.statuses = statuses
                    if (this.statusId) this.formGroup.controls.statuses.setValue(statuses.find((x) => x.id === this.statusId).id)
                })
        )
    }
    getStatuses(): void {
        this.subscriptions.add(
            this.userService.getStatuses().subscribe((statuses) => {
                this.statuses = statuses
            })
        )
    }
    changeAvatar(): void {
        this.modalService
            .open(ChangeAvatarComponent, { centered: true, size: 'l' })
            .closed.pipe(
                switchMap((avatar) => {
                    return this.userService.getUserLogged()
                })
            )
            .subscribe((state) => {
                this.avatarId = state.app.avatarId
            })
    }
}
