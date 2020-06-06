import { Component, HostListener, ElementRef, Renderer2,
            Input, ViewChild } from "@angular/core";
import { IconSrc } from "../icon-src";

@Component({
    selector: "app-panel",
    templateUrl: "panel.component.html",
    styleUrls: ["panel.component.less"]
})
export class AppPanelComponent extends IconSrc {
    @Input() iconPath: string; // local SVG icons
    @Input() iconURL: string; // external images/icons
    @Input() buttonText: string;
    @Input() hideOnClick: boolean = false;
    @Input() ariaLabel: string;
    @Input() panelHeight: false;
    @ViewChild("panelbutton") private panelbutton: ElementRef;
    panelIsVisible: boolean = false;

    constructor(
        private elementRef: ElementRef, 
        private renderer: Renderer2
    ) {
    super();
    }

    toggleVisibility() {
        this.panelIsVisible = !this.panelIsVisible;
        if ( this.panelIsVisible ) {
            this.renderer.addClass(this.elementRef.nativeElement, "open");
            this.elementRef.nativeElement.focus();
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, "open");
        }
    }

    onPanelClick() {
        if (this.hideOnClick) {
            this.hidePanel();
            this.panelbutton.nativeElement.focus();
        }
    }

    @HostListener("document:click", ["$event"])
    clickOutside(event) {
        if ( this.panelIsVisible && !this.elementRef.nativeElement.contains(event.target) ) {
            this.hidePanel();
        }
    }

    @HostListener("document:keyup", ["$event"]) onKeyUp(event) {
        if ( this.panelIsVisible && event.keyCode === 27 ) { // ESC key
            this.panelbutton.nativeElement.blur();
            this.hidePanel();
            this.panelbutton.nativeElement.focus();
        }
    }

    private hidePanel() {
        this.panelIsVisible = false;
        this.renderer.removeClass(this.elementRef.nativeElement, "open");
    }
}
