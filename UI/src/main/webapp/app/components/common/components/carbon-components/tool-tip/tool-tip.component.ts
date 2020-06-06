import { Component, OnInit, Input, ElementRef, OnDestroy } from "@angular/core";
import { Tooltip } from "carbon-components";

@Component({
    selector: "app-tool-tip",
    templateUrl: "./tool-tip.component.html",
    styleUrls: ["./tool-tip.component.less"]
})
export class ToolTipComponent implements OnInit, OnDestroy {
    private toolTipInstance: any;
    @Input() toolTipInformation: string; 
    @Input() toolTipDirection = "";
    @Input() toolTipLabel: string;
    @Input() toolTipId: any;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        const toolTipElement = this.el.nativeElement.querySelector("[data-tooltip-trigger]");
        this.toolTipInstance = Tooltip.create(toolTipElement);
    }

    showToolTip() {
        this.toolTipInstance.show();
    }

    ngOnDestroy() {
        this.toolTipInstance.release();
    }

}
