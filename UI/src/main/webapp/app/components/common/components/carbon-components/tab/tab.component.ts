import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Input } from "@angular/core";
import { Tab } from "carbon-components";

@Component({
    selector: "app-tab",
    templateUrl: "tab.component.html",
    styleUrls: ["tab.component.less"],
})
export class TabComponent implements OnInit, OnDestroy {
    private tabInstance: any;
    @Input() tabItems = [];
    
    constructor(private el: ElementRef) {
        
    }

    ngOnInit() {
        const tabElement = this.el.nativeElement.querySelector("[data-tabs]");
        this.tabInstance = Tab.create(tabElement);
    }

    ngOnDestroy() {
        this.tabInstance.release();
    }
}
