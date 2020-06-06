import { 
    Component, 
    Input, 
    ViewChild, 
    ElementRef, 
    HostListener, 
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

interface OptionModel {
    value: string;
    selected: boolean;
}

@Component({
    selector: "app-multi-select",
    templateUrl: "multi-select.component.html",
    styleUrls: ["multi-select.component.less"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: MultiSelectComponent,
            multi: true
        }
    ]
})
export class MultiSelectComponent implements ControlValueAccessor {
    writeValue(value: OptionModel[]): void {
        if ( value ) {
            this.options = value;
            this.dropdownItems = value; // original list values
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(): void {}
    onChange: any = () => {};
    @Input() invalid: string;
    @Input() required: string;
    @Input() describedby: string;
    @Input() label: string;
    @Input() fieldLabel: string;
    @Input() styleClass: string = "";
    @Input() toolTipRequired: boolean = false;
    @Input() idToolTip: any;
    @Input() toolTipPosition: string;
    @Input() toolTipString: string;
    options: OptionModel[] = [];
    dropdownItems: any[] = [];
    @ViewChild("dropdown") dropdown: ElementRef;
    @ViewChild("listbox") listbox: ElementRef;
    @ViewChild("button") button: ElementRef;
    randomNumber: number = (window.crypto || (<any>window).msCrypto).getRandomValues(new Uint32Array(1))[0];
    isListboxVisible: boolean = false;
    public selectedItem;
    public filteredItems: any = "";

    toggleOptions() {
        this.isListboxVisible = !this.isListboxVisible;
        if ( !this.isListboxVisible ) {
            this.listbox.nativeElement.scrollTop = 0;
        }
    }

    onCheck(event: Event, i) {
        this.options[i].selected = (<HTMLInputElement>event.target).checked;
        this.options = this.dropdownItems;
        this.selectedItem = "";
        this.triggerUpdates();
    }

    selectedOptionsLength() {
        return this.dropdownItems.filter(o => o.selected).length;
    }

    clearSelections() {
        this.options.forEach(o => o.selected = false);
        this.triggerUpdates();
        this.button.nativeElement.focus();
    }

    filterList() {
        this.options = this.dropdownItems;
        this.isListboxVisible = true;
        this.filteredItems = this.options.filter(o => o.value.toLowerCase().indexOf(this.selectedItem.toLowerCase()) !== -1);
        if (this.filteredItems.length > 0) {
            this.options = this.filteredItems;
        } else {
            this.options = [];
        }  
    }

    private triggerUpdates() {
        this.writeValue(this.options);
        this.onChange(this.options);
    }

    buttonBoxKeyUp(event: any) {
        if ( this.isListboxVisible && (event.key === "Escape" ||  event.keyCode === 27) ) {
            this.toggleOptions();
        } else if ( event.key === "ArrowUp" ||  event.keyCode === 38 ) {
            event.preventDefault();
            (<HTMLInputElement>Array.from(
                this.listbox.nativeElement.querySelectorAll("input")
            ).reverse()[0]).focus();
        } else if ( event.key === "ArrowDown" ||  event.keyCode === 40 ) {
            event.preventDefault();
            this.listbox.nativeElement.querySelector("input").focus();
        }
    }

    listBoxKeyUp(event: any) {
        const isLeaveKey = (event.key === "Escape" ||  event.keyCode === 27) || (event.key === "Enter" ||  event.keyCode === 13);
        if ( this.isListboxVisible && isLeaveKey ) {
            this.toggleOptions();
            this.button.nativeElement.focus();
        } else if ( event.key === "ArrowUp" ||  event.keyCode === 38 ) {
            event.preventDefault();
            const previousElementSibling = document.activeElement.closest(".bx--dropdown-item").previousElementSibling;
            if ( previousElementSibling ) {
                previousElementSibling.querySelector("input").focus();
            } else {
                (<HTMLInputElement>Array.from(
                    this.listbox.nativeElement.querySelectorAll("input")
                ).reverse()[0]).focus();
            }
        } else if ( event.key === "ArrowDown" ||  event.keyCode === 40 ) {
            event.preventDefault();
            const nextElementSibling = document.activeElement.closest(".bx--dropdown-item").nextElementSibling;
            if ( nextElementSibling ) {
                nextElementSibling.querySelector("input").focus();
            } else {
                this.listbox.nativeElement.querySelector("input").focus();
            }
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
