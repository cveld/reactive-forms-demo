import { ValidationMessageComponent } from '../components/validation-message/validation-message.component'; 

export class ValidationMessageService {    
    messages: ValidationMessageComponent[] = [];

    addMessage(message: ValidationMessageComponent): void {        
        this.messages.push(message);          
    }   

    getMessages(): ValidationMessageComponent[] {
        return this.messages;
    }
}