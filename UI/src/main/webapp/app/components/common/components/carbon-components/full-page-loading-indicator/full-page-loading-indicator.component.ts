import { Component, ElementRef, Renderer2 } from "@angular/core";

@Component({
    selector: "app-full-page-loading-indicator",
    templateUrl: "full-page-loading-indicator.component.html",
    styleUrls: ["full-page-loading-indicator.component.less"]
})
export class FullPageLoadingIndicatorComponent {
    isVisible: boolean = true;
    constructor(private el: ElementRef,
        private renderer: Renderer2) {
    }

    show() {
        this.renderer.addClass(this.el.nativeElement, "visible");
        this.isVisible = true;
        // document.querySelector(".container").setAttribute("inert", "true"); // disabled for now -> inert polyfill bug
    }

    conceal() {
        this.renderer.removeClass(this.el.nativeElement, "visible");
        this.isVisible = false;
        // document.querySelector(".container").removeAttribute("inert"); // disabled for now -> inert polyfill bug
    }
}
