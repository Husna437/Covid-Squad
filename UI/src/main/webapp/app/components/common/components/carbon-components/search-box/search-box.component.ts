import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Search } from "carbon-components";
import { FormControl } from "@angular/forms";

@Component({
    selector: "app-search-box",
    templateUrl: "search-box.component.html",
    styleUrls: ["search-box.component.less"],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    @Output() textChanged: EventEmitter<string>;
    @Output() textSubmit: EventEmitter<string>;
    uniqueID: number = Date.now();
    searchControl = new FormControl();

    private instance: any;

    constructor(private el: ElementRef) {
        this.textChanged = new EventEmitter<string>();
        this.textSubmit = new EventEmitter<string>();
    }

    ngOnInit() {
        const searchElement = this.el.nativeElement.querySelector("[data-search]");
        this.instance = Search.create(searchElement);

        this.searchControl.valueChanges
            .subscribe((text: string) => {
                let searchText = text.trim();
                this.textChanged.emit(searchText);
            });
    }

    ngOnDestroy() {
        this.instance.release();
    }

    onClear() {
        this.searchControl.setValue("");
    }

    submitSearch() {
        this.textSubmit.emit(this.searchControl.value); 
    }
}
