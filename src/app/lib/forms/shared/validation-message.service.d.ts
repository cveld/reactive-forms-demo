import { ValidationMessageComponent } from '../components/validation-message/validation-message.component';
export declare class ValidationMessageService {
    messages: ValidationMessageComponent[];
    addMessage(message: ValidationMessageComponent): void;
    getMessages(): ValidationMessageComponent[];
}
