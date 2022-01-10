import { Component, OnInit } from '@angular/core'
import { AVATARS } from 'src/app/core/config/user.config'

@Component({
    selector: 'change-avatar',
    templateUrl: './change-avatar.component.html',
    styleUrls: ['./change-avatar.component.css'],
})
export class ChangeAvatarComponent implements OnInit {
    avatars: Array<number>
    constructor() {}

    ngOnInit(): void {
        this.avatars = Array(AVATARS)
            .fill(null)
            .map((x, i) => i)
    }
}
