import { Component, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ElementRef} from "@angular/core";
import { Subject } from "rxjs";
import { APP_URLS } from "@cs/consts";
import { ProgressIndicator } from "carbon-components";

@Component({
    selector: "app-progress-bar",
    templateUrl: "progress-bar.component.html",
    styleUrls: ["progress-bar.component.less"]
})

export class ProgressBarComponent implements OnDestroy, AfterViewInit {
    constructor(private el: ElementRef) {
        this.pointClicked = new EventEmitter<any>();
    }

    @Input() points: string[] = [];
    @Output() pointClicked: EventEmitter<any>;
    progressPoints = [];
    private progressIndicatorInstance;
    private ngUnsubscribe: Subject<any> = new Subject();

    ngAfterViewInit() {
        const progressBarElement = this.el.nativeElement.querySelector("[data-progress]");
        this.progressIndicatorInstance = ProgressIndicator.create(progressBarElement);
        this.progressIndicatorInstance.setCurrent(0);
    }

    progressPointClick(index) {
        this.progressIndicatorInstance.setCurrent(index);
        this.pointClicked.emit(this.points[index]);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
