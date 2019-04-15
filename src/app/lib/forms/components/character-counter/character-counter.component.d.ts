import { OnChanges } from '@angular/core';
export declare class CharacterCounterComponent implements OnChanges {
    maxlength: number;
    value: string;
    remaining: number;
    constructor();
    ngOnChanges(): void;
}
