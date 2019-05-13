import { Component, Input, OnInit } from '@angular/core';
import { ValidationMessageService } from '../../shared/validation-message.service';

@Component({
    selector: 'validation-message',
    template: `<ng-content *ngIf="visible"></ng-content>`
})
export class ValidationMessageComponent implements OnInit {
    @Input()
    public error: string;
    public visible: boolean = false;

    constructor(private messageService: ValidationMessageService) {
    }

    ngOnInit() {
        this.messageService.addMessage(this);
    }
}
