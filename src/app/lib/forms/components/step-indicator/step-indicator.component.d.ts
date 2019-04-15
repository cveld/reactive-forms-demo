import { EventEmitter } from '@angular/core';
export declare class StepIndicatorComponent {
    steps: string[];
    currentStep: number;
    currentStepChange: EventEmitter<number>;
    constructor();
    goToStep($event: any, step: number): void;
    getCurrentStep(): string;
}
