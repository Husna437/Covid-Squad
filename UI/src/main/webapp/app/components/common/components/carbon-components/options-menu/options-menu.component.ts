import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ElementRef,
    AfterViewInit,
    ChangeDetectorRef,
    OnDestroy,
    ViewChild
} from "@angular/core";
import { OverflowMenu } from "carbon-components";
// import { IconSrc } from "../icon-src";

@Component({
    selector: "app-options-menu",
    templateUrl: "options-menu.component.html",
    styleUrls: ["options-menu.component.less"],
})
export class OptionsMenuComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() options: Array<any>;
    @Input() flip: boolean;
    @Input() menuDirection: string = "bottom";
    @Input() menuInside: string;
    @Input() ariaLabel: string;
    @Output() actionTrigger = new EventEmitter<string | number>();
    @Input() disableOptionIndex = null;
    @Input() disabledOverflowMenuTitle: string = "";
    @Input() overflowMenuTooltipIndex = null;
    
    @ViewChild("menu") private menuRef: ElementRef;
    listID: string;

    private instance: any;
    private listElem: HTMLUListElement;

    constructor(
        private elemRef: ElementRef,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        const menuElem: HTMLElement = this.menuRef.nativeElement;
        this.listElem = menuElem.querySelector("ul");
        if ( this.menuInside === "true" ) {
            this.elemRef.nativeElement.setAttribute("data-floating-menu-container", "true");
        }
        menuElem.addEventListener("floating-menu-shown", () => {
            const firstButtonInList: HTMLButtonElement = this.listElem.querySelector("li button");
            firstButtonInList.focus();
        });
        menuElem.addEventListener("floating-menu-hidden", () => {
            let clone = this.instance.element.cloneNode(true);
            clone = null;    
        });
        menuElem.addEventListener("keyup", (event: any) => {
            if (event.keyCode === 32 || event.keyCode === 40 ) { // SPACE or DOWN key
                menuElem.click();
            } else if ( event.keyCode === 38 ) { // UP key
                menuElem.click();
                const lastButtonInList: HTMLButtonElement = this.listElem.querySelector("li:last-child button");
                lastButtonInList.focus();
            }
        });
        this.listElem.addEventListener("keyup", (event: any) => {
        const activeButton = document.activeElement as HTMLButtonElement;
            if ( event.keyCode === 27 ) { // ESC key
                menuElem.focus();
            } else if ( event.keyCode === 38 ) { // UP key
                if ( activeButton.parentElement.parentElement.children.length > 1 ) {
                    let prevLiElem  = activeButton.parentElement.previousElementSibling as HTMLUListElement;
                    let lastLiElem = activeButton.parentElement.parentElement.lastElementChild;
                    if (prevLiElem) {
                        (prevLiElem.firstElementChild as HTMLButtonElement).focus();
                    } else if (lastLiElem) {
                        (lastLiElem.firstElementChild as HTMLButtonElement).focus();
                    }
                }
            } else if ( event.keyCode === 40 ) { // DOWN key
                if ( activeButton.parentElement.parentElement.children.length > 1 ) {
                    let nextLiElem  = activeButton.parentElement.nextElementSibling as HTMLUListElement;
                    let firstLiElem = activeButton.parentElement.parentElement.firstElementChild;
                    if ( nextLiElem ) {
                        (nextLiElem.firstElementChild as HTMLButtonElement).focus();
                    } else if (firstLiElem) {
                        (firstLiElem.firstElementChild as HTMLButtonElement).focus();
                    }
                }
            } else if ( event.keyCode === 36 ) { // HOME key
                let firstLiElem = activeButton.parentElement.parentElement.firstElementChild;
                (firstLiElem.firstElementChild as HTMLButtonElement).focus();
            } else if ( event.keyCode === 35 ) { // END key
                let lastLiElem = activeButton.parentElement.parentElement.lastElementChild;
                (lastLiElem.firstElementChild as HTMLButtonElement).focus();
            } else {
                const char = String.fromCharCode(event.keyCode); // resulting char is uppercase
                const filtered = this.options
                .map((option: any, index: number) => ({...option, childIndex: index}))
                .filter((option: any) => option.title.charAt(0).toUpperCase() === char);

                if (filtered.length > 1) {
                    try {
                        let selIndex; // index of the selected item, if the item is from our list of matches
                        const selectedItemIsFromList = filtered.some((option: any, index: number) => {
                            const focusedChild = activeButton.parentElement.parentElement.children[option.childIndex];
                            if (focusedChild.firstElementChild === activeButton) {
                                selIndex = index;
                                return true;
                            }
                            return false;
                        });
                        if (selectedItemIsFromList) {
                        // try to get the next item from list
                            let i;
                            if (filtered[selIndex + 1] === undefined) {
                            // we reached the end, let's start over
                            i = filtered[0].childIndex;
                            } else {
                            // ok, let's get the next item
                            i = filtered[selIndex + 1].childIndex;
                            }
                            const nextChild = activeButton.parentElement.parentElement.children[i];
                            (nextChild.firstElementChild as HTMLButtonElement).focus();
                        } else {
                        // get the first item from list
                            const i = filtered[0].childIndex;
                            const child = activeButton.parentElement.parentElement.children[i];
                            (child.firstElementChild as HTMLButtonElement).focus();
                        }
                    } catch (e) {}
                } else {
                    try {
                        const reqIndex = filtered[0].childIndex;
                        const reqChild = activeButton.parentElement.parentElement.children[reqIndex];
                        (reqChild.firstElementChild as HTMLButtonElement).focus();
                    } catch (e) {}
                }
            }
        });
    }

    callAction(action: string | number) {
        this.menuRef.nativeElement.focus();
        this.actionTrigger.emit(action);
    }

    ngAfterViewInit() {
        this.listID = this.elemRef.nativeElement.id.replace("options-menu", "options-menu-list");
        this.cdRef.detectChanges();
    }
    openMenu() {
        const menuElem: HTMLElement = this.menuRef.nativeElement;
        this.instance = OverflowMenu.create(menuElem);
    }

    ngOnDestroy() {
        if (this.instance) {
            this.instance.release();
        }
        if ( this.listElem ) {
            this.listElem.remove();
            this.listElem = null;
        }
    }
}
