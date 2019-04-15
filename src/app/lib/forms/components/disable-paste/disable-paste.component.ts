import { Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[disable-paste]'
})
export class DisablePasteComponent {
    constructor(private _elementRef: ElementRef) {
        this._elementRef.nativeElement.onpaste = (e: any) => {
            e.preventDefault();
        }
    }
}