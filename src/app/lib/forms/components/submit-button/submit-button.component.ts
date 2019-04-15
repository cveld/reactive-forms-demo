import { Component, Input } from '@angular/core';

@Component({
    selector: 'submit-button',
    template: `<button type="submit" class="btn btn-primary" (click)="submit($event)">
                <span *ngIf="showSpinner" class="icon text-hide icon-separator-right icon-loading"></span>
                <ng-content></ng-content>
               </button>`
})
export class SubmitButtonComponent {    
    @Input('show-spinner')
    showSpinner: boolean;  

    submit(event:any) {
        if (this.showSpinner) {
            event.preventDefault();
        }
    }
}