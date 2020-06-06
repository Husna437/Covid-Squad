import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "app-input-with-tags",
    templateUrl: "input-with-tags.component.html",
    styleUrls: ["input-with-tags.component.less"],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputWithTagsComponent),
        multi: true
    }]
})
export class InputWithTagsComponent implements ControlValueAccessor {
    @Output() add: EventEmitter<string> = new EventEmitter();
    @Output() remove: EventEmitter<string> = new EventEmitter();
    @Output() addError: EventEmitter<any> = new EventEmitter();

    @Input() disabled: boolean = false;
    @Input() allowDuplicates: boolean = false;
    @Input() minTagLength: number;
    @Input() maxTagLength: number;
    @Input() placeholder: string = "";
    @Input() inputId: string = "";
    @Input() inputStyle: any;
    @Input() inputStyleClass: any;
    @Input() tagsStyle: any;
    @Input() tagsStyleClass: any;
    @Input() style: any;
    @Input() styleClass: any;

    @ViewChild("domInput", {read: ElementRef}) domInput: ElementRef;
    input: string;
    tags: any[] = [];
    onChange: any = () => {};
    onTouched: any = () => {};

    @HostListener("click") onHostClick() {
        if (this.domInput) {
            this.domInput.nativeElement.focus();
        }
    }

    constructor() {}

    onInputKeyupEnter(event) {
        event.stopPropagation();
        try {
            const value = this.input.replace(/\s+/g, " ").trim();
            this.addTag(value);
        } catch (e) {
        }
        setTimeout(() => this.input = "");
    }

    onInputPaste(ev: ClipboardEvent) {
        try {
            const value = ev.clipboardData.getData("text/plain");
            const tokens = value.split(/\r+|\n+/g).filter(tok => tok);
            tokens.forEach((tok: string) => {
                this.addTag(tok.replace(/\s+/g, " ").trim());
            });
        } catch (e) {
        }
        setTimeout(() => this.input = "");
    }

    onTagRemove(index: number) {
        try {
            const tag = this.tags[index];
            this.tags.splice(index, 1);
            this.remove.emit(tag);
            this.onChange(this.tags);
        } catch (e) {
        }
    }

    writeValue(arr: any): void {
        if (arr) {
            this.tags = arr;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        // empty
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private addTag(word: string) {
        if (!word) {
            return;
        }

        if (this.minTagLength && word.length < this.minTagLength) {
            this.addError.emit(this.generateError("minTagLength"));
            return;
        }
        if (this.maxTagLength && word.length > this.maxTagLength) {
            this.addError.emit(this.generateError("maxTagLength"));
            return;
        }
        if (this.isPresent(word) && !this.allowDuplicates) {
            this.addError.emit(this.generateError("duplicate"));
            return;
        }

        this.addError.emit(null);
        this.tags.push(word);
        this.add.emit(word);
        this.onChange(this.tags);
    }

    private isPresent(word: string) {
        return this.tags.includes(word);
    }

    private generateError(name: string): any {
        const err = {};
        err[name] = {value: true};
        return err;
    }
}
