import { Injectable } from "@angular/core";
import { FullPageLoadingIndicatorComponent } from "./full-page-loading-indicator.component";

@Injectable()
export class FullPageLoadingIndicatorService {
    private fpliComponent: FullPageLoadingIndicatorComponent;
    private configFetched: boolean = false;

    constructor(
    ) {}

    register(fpliComponent: FullPageLoadingIndicatorComponent) {
        this.fpliComponent = fpliComponent;
    }

    show() {
        this.fpliComponent.show();
    }

    conceal() {
        this.fpliComponent.conceal();
    }
}