import { Directive, ElementRef, Renderer, AfterViewInit, Input } from "@angular/core";

@Directive({
    selector: "[dpfocus]"
})

export class FocusDirective implements AfterViewInit {
    @Input("dpfocus") value: string;

    constructor(private el: ElementRef, private renderer: Renderer) {}

    // Focus to element: if value 0 = don't set focus, 1 = set focus
    ngAfterViewInit() {
        if (this.value === "0") {
            return;
        }
        this.renderer.invokeElementMethod(this.el.nativeElement, "focus", []);
    }
}