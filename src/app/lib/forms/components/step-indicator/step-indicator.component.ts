import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'step-indicator', 
    templateUrl: 'step-indicator.component.html'
})
export class StepIndicatorComponent {

    @Input() steps: string[] = [];

    @Input() currentStep: number = 1; 

    @Output() currentStepChange = new EventEmitter<number>();

    constructor() { }

    goToStep($event: any, step: number) {
        $event.preventDefault();
        this.currentStep = step;
        this.currentStepChange.emit(step);
    }

    getCurrentStep(): string {
        return this.steps[this.currentStep - 1];
    }

}