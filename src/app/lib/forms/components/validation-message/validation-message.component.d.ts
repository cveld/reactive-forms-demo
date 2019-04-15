import { OnInit } from '@angular/core';
import { ValidationMessageService } from '../../shared/validation-message.service';
export declare class ValidationMessageComponent implements OnInit {
    private messageService;
    error: string;
    visible: boolean;
    constructor(messageService: ValidationMessageService);
    ngOnInit(): void;
}
