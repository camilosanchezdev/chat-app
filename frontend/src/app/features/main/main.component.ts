import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/common/services/user.service'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styles: [],
})
export class MainComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        // this.userService.getContacts().subscribe(console.log)
    }
}
