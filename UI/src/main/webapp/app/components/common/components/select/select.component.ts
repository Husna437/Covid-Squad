import { 
    Component, 
    Input, 
    OnInit, 
    ViewChild, 
    ElementRef, 
    HostListener, 
    Renderer2, 
    Output, 
    EventEmitter, 
    OnChanges, 
    SimpleChanges,
    HostBinding, 
} from "@angular/core";

@Component({
    selector: "app-select",
    templateUrl: "select.component.html",
    styleUrls: ["select.component.less"],
})
export class SelectComponent implements OnInit, OnChanges {
    // tslint:disable-next-line:no-input-rename
    @Input() invalid: string;
    @Input() required: string;
    @Input() describedby: string;
    @Input() label: string;
    @Input() defaultOption: string;
    @Input() options: string[] = [];

    @Output() optionSelected: EventEmitter<string> = new EventEmitter();

    @ViewChild("dropdown") dropdown: ElementRef;
    @ViewChild("listbox") listbox: ElementRef;
    @ViewChild("button") button: ElementRef;

    randomNumber: number = (window.crypto || (<any>window).msCrypto).getRandomValues(new Uint32Array(1))[0];
    isListboxVisible: boolean = false;
    activeOptionLabel: string;

    private expandedByEnter: boolean = false;
    currentOption: HTMLLIElement;
    private optionToSearchFor: string = "";
    private optionToSearchTimeout: any;
    private lastEmittedOption: string;

    constructor(
        private renderer: Renderer2,
    ) {}

    ngOnInit() {
        this.activeOptionLabel = this.defaultOption || this.options[0];
        this.lastEmittedOption = this.activeOptionLabel;
        this.listbox.nativeElement.addEventListener("keyup", (event: any) => {
            if ( (event.key === "Escape" ||  event.keyCode === 27) && this.isListboxVisible ) {
                event.stopPropagation();
                this.button.nativeElement.focus();
                this.toggleOptions();
            }
        }, true);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.options && !changes.options.firstChange) {
            this.activeOptionLabel = this.defaultOption || this.options[0];
            this.lastEmittedOption = this.activeOptionLabel;
            this.currentOption = null;
        }
    }

    toggleOptions() {
        this.isListboxVisible = !this.isListboxVisible;
        if ( this.isListboxVisible ) {
            this.listbox.nativeElement.focus();
            if ( !this.currentOption ) {
                this.currentOption = this.listbox.nativeElement.firstElementChild;
                this.currentOption.setAttribute("aria-selected", "true");
                this.renderer.addClass(this.currentOption, "focused");
                this.activeOptionLabel = this.currentOption.textContent.trim();
            }
        } else {
            if ( this.options.length ) {
                setTimeout(() => {
                    if ( this.lastEmittedOption !== this.activeOptionLabel ) {
                        this.optionSelected.emit(this.activeOptionLabel.trim());
                        this.lastEmittedOption = this.activeOptionLabel;
                    }
                });
                this.expandedByEnter = false;
            }
        }
    }

    optionClicked(event) {
        this.button.nativeElement.focus();
        this.handleSelectedOption(event.target);
        this.toggleOptions();
    }

    buttonKeyDown(event: any) {

        if ( (event.key === "Enter" ||  event.keyCode === 13) && !this.isListboxVisible ) {
            this.expandedByEnter = true;
        }

        if ( event.key === "ArrowUp" ||  event.keyCode === 38 ) {
            event.preventDefault();
            if ( this.currentOption ) {
                this.toggleOptions();
                this.handlePreviousOption();
            } else {
                this.toggleOptions();
            }
        } else if ( event.key === "ArrowDown" ||  event.keyCode === 40 ) {
            event.preventDefault();
            if ( this.currentOption ) {
                this.toggleOptions();
                this.handleNextOption();
            } else {
                this.toggleOptions();
            }
        }
    }

    listBoxKeyUp(event: any) {
        if ( (event.key === "Enter" || event.keyCode === 13) ) {
            if ( !this.expandedByEnter ) {
                this.button.nativeElement.focus();
                this.toggleOptions();
            } else {
                this.expandedByEnter = false;
            }
        }
    }

    listBoxKeyDown(event: any) {
        if ( event.key === "ArrowUp" || event.keyCode === 38 ) {
            this.handlePreviousOption();
        } else if ( event.key === "ArrowDown" || event.keyCode === 40 ) {
            this.handleNextOption();
        } else if ( event.key === "Tab" || event.keyCode === 9 ) {
            this.toggleOptions();
        } else {
            clearTimeout(this.optionToSearchTimeout);
            this.optionToSearchFor += String.fromCharCode(event.keyCode);
            let optionFound;
            if ( optionFound = this.options.find( o => {
                return o.indexOf(this.optionToSearchFor) === 0 && o.toUpperCase().includes(this.optionToSearchFor);
            }) ) {
                this.handleSelectedOption(this.listbox.nativeElement.children[this.options.indexOf(optionFound)]);
            }
            this.optionToSearchTimeout = setTimeout(() => {
                this.optionToSearchFor = "";
            }, 500);
        }
    }

    handlePreviousOption() {
        this.handleSelectedOption(this.currentOption.previousElementSibling as HTMLLIElement);
    }

    handleNextOption() {
        this.handleSelectedOption(this.currentOption.nextElementSibling as HTMLLIElement);
    }

    handleSelectedOption(currentOption: HTMLLIElement) {
        if ( currentOption ) {
            this.renderer.removeClass(this.currentOption, "focused");
            this.currentOption.removeAttribute("aria-selected");
            this.currentOption = currentOption;
            this.currentOption.setAttribute("aria-selected", "true");
            this.renderer.addClass(this.currentOption, "focused");
            setTimeout(() => {
                this.activeOptionLabel = this.currentOption.textContent.trim();
            });
        }
    }

    @HostListener("document:click", ["$event"]) clickOutside(event: MouseEvent) {
        if ( this.isListboxVisible && !this.dropdown.nativeElement.contains(event.target) ) {
            this.toggleOptions();
        }
    }

    @HostListener("document:keydown", ["$event"]) onDocumentKeydown(event: any) {
        const isArrowKey = ((event.key === "ArrowUp" ||  event.keyCode === 38) || (event.key === "ArrowDown" ||  event.keyCode === 40));
        if ( this.isListboxVisible && isArrowKey ) {
            event.preventDefault();
        }
    }
    
}
