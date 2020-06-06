import { HostListener, ElementRef } from "@angular/core";

const isInertElem = (elem: HTMLElement) => {
    const appRootElement = document.querySelector("app-root");
    let isInert = false;
    let currentElement = elem;
    let parentElement = currentElement.parentElement;
    while (parentElement && parentElement !== appRootElement ) {
        if (parentElement.hasAttribute("inert")) {
            isInert = true;
            parentElement = null;
        } else {
            currentElement = parentElement;
            parentElement = parentElement.parentElement;
        }
    }
    return isInert;
};

export class TrapFocus {
    public elementRef: ElementRef;

    @HostListener("document:keydown", ["$event"]) onKeyDown(event) {
        if (event.keyCode === 9 && this.isVisible()) {
            const focusableItems: any[] = Array.from(
            this.elementRef.nativeElement.querySelectorAll(
                `a[href], 
                area[href], 
                input:not([disabled]), 
                select:not([disabled]), 
                textarea:not([disabled]), 
                button:not([disabled]):not([tabindex="-1"]), 
                iframe, 
                *[tabindex="0"], *[contenteditable]`
            )
            ).filter((elem: HTMLElement) => {
                return !isInertElem(elem);
            });
            const numberOfFocusableItems = focusableItems.length;
            const focusedItemIndex = focusableItems.indexOf(document.activeElement);
            if (!numberOfFocusableItems) {
                return;
            }
            if (event.shiftKey) {
                if (focusedItemIndex === 0) {
                    focusableItems[numberOfFocusableItems - 1].focus();
                    event.preventDefault();
                }
            } else {
                if (focusedItemIndex === numberOfFocusableItems - 1) {
                    focusableItems[0].focus();
                    event.preventDefault();
                }
            }
        }
    }
    isVisible() { return true; }
}
