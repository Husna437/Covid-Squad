import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IConfirmationModal } from "@cs/common/components/carbon-components/confirmation-modal/confirmation-modal.interface";
import { take } from "rxjs/operators";
import { toggleInertElements } from "@cs/common/utils/functions";
import { TrapFocus } from "@cs/common/utils/trap-focus";

@Component({
    selector: "app-confirmation-modal",
    templateUrl: "./confirmation-modal.component.html",
    styleUrls: ["./confirmation-modal.component.less"]
})
export class ConfirmationModalComponent extends TrapFocus {
    @ViewChild("modal", {read: ElementRef}) modal: ElementRef;
    @ViewChild("primaryButtonRef") private primaryButtonRef: ElementRef;
    @ViewChild("ariaLiveRef") private ariaLiveRef: ElementRef;
    @ViewChild("messageRef") private messageRef: ElementRef;
    private close: Subject<boolean>;
    private lastActiveElem: any;

    subtitle: string;
    title: string;
    message: string;
    primaryButtonLabel: string;
    secondaryButtonLabel: string;
    isDanger: boolean = false;
    primaryButtonAction: Function;
    secondaryButtonAction: Function;
    hideCloseButton: boolean = false;
    notificationsElement = document.querySelector("app-notifications");

    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer2,
    ) {
        super();
    }

    show(obj: IConfirmationModal): Observable<boolean> {
        this.build(obj);
        this.renderer.addClass(this.modal.nativeElement, "is-visible");
        this.lastActiveElem = document.activeElement;
        this.elementRef.nativeElement.removeAttribute("inert");
        toggleInertElements(true, this.elementRef.nativeElement, this.notificationsElement);
        setTimeout(() => { // wait for the fade transition to be fulfilled
            if ( this.primaryButtonRef ) {
                this.primaryButtonRef.nativeElement.focus();
                this.renderer.setProperty(this.ariaLiveRef.nativeElement, "textContent", this.messageRef.nativeElement.textContent);
            } else {
                this.messageRef.nativeElement.focus();
            }
         }, 200);
        if (this.close) {
            this.close.complete();
            this.close.unsubscribe();
        }
        this.close = new Subject<boolean>();
        this.close.subscribe(() => this.conceal());
        return this.close.asObservable().pipe(take(1));
    }

    conceal() {
        this.renderer.removeClass(this.modal.nativeElement, "is-visible");
        toggleInertElements(false, this.elementRef.nativeElement, this.notificationsElement);
        setTimeout(() => {
            this.lastActiveElem.focus();
        }); // wait for the next event loop to remove the inert attribute
        this.ariaLiveRef.nativeElement.textContent = "";
    }

    onPrimaryButtonClick() {
        if (typeof this.primaryButtonAction === "function") {
            this.primaryButtonAction();
        }
        this.close.next(true);
    }

    onSecondaryButtonClick() {
        if (typeof this.secondaryButtonAction === "function") {
            this.secondaryButtonAction();
        }
        this.close.next(false);
    }

    onCloseButtonClick() {
        this.close.next(false);
    }

    private build(obj: IConfirmationModal) {
        this.title = obj && obj.title || "";
        this.message = obj && obj.message || "";
        this.primaryButtonLabel = obj && obj.primaryButtonLabel || "";
        this.secondaryButtonLabel = obj && obj.secondaryButtonLabel || "";
        this.isDanger = obj && obj.isDanger || false;
        this.primaryButtonAction = obj && obj.primaryButtonAction || undefined;
        this.secondaryButtonAction = obj && obj.secondaryButtonAction || undefined;
        this.hideCloseButton = obj && obj.hideCloseButton || false;
    }

    setMessage(message: string): void {
        this.message = message;
    }

    isVisible(): boolean {
        return this.modal.nativeElement.classList.contains("is-visible");
    }
}
