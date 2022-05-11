import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth.service'
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    constructor(private authService: AuthService, private modalService: NgbModal) {}
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {}
    logout(): void {
        this.subscriptions.add(
            this.modalService.open(ConfirmationModalComponent, { centered: true, size: 'l' }).closed.subscribe((value) => {
                if (value) {
                    this.authService.logout()
                }
            })
        )
    }
}
