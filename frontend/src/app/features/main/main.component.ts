import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth.service'
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
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
