import { Component, OnInit, Input, ElementRef, HostListener, HostBinding, Attribute, ViewChild, AfterViewInit } from "@angular/core";
import { ModalService } from "./modal.service";
import { TrapFocus } from "@cs/common/utils/trap-focus";

@Component({
    selector: "app-modal-content",
    templateUrl: "modal-content.component.html",
    styleUrls: ["modal-content.component.less"]
})
export class ModalContentComponent extends TrapFocus implements OnInit, AfterViewInit {
    @Input() closeText: string;
    @Input() hasCloseButton: boolean = false;
    @Input() title: string;
    @ViewChild("closeBtn") closeBtn: ElementRef;

    constructor(
        private modalService: ModalService,
        public elementRef: ElementRef,
        @Attribute("aria-label") private ariaLabel: string
    ) {
        super();
    }
    @HostBinding("attr.aria-label") arialLabel;

    ngOnInit() {
        this.elementRef.nativeElement.setAttribute("role", "dialog");
        this.arialLabel =  this.title || this.ariaLabel || "";
        this.elementRef.nativeElement.setAttribute("aria-modal", "true");
        this.modalService.showModal();
    }

    ngAfterViewInit() {
        this.closeBtn.nativeElement.focus();
    }

    closeModal() {
        this.modalService.closeModal();
    }

    @HostListener("document:keyup", ["$event"]) onKeyUp(event) {
        if (event.keyCode === 27 || event.key === "Escape" ) { // ESC key
            this.closeModal();
        }
    }
}
