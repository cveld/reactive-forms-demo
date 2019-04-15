import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: '[character-counter]',
    template: `Nog {{remaining}} karakters over.`,
    host: { 'class': 'maxChars' }
})
export class CharacterCounterComponent implements OnChanges {
    @Input()
    maxlength: number;

    @Input()
    value: string;

    remaining:number;
    constructor() {

    }

    ngOnChanges() {
        if (!this.value) {
            this.remaining = this.maxlength;
        }
        
        this.remaining = this.maxlength - this.value.length;
        if (this.remaining < 0) {
            this.remaining = 0;
        }
    }
}