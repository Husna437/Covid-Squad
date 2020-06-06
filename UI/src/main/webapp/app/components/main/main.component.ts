import { Component, Renderer2, OnInit, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationModalService } from "@cs/common/components/carbon-components/confirmation-modal/confirmation-modal.service";
import { ConfirmationModalComponent } from "@cs/common/components/carbon-components/confirmation-modal/confirmation-modal.component";
import { 
    FullPageLoadingIndicatorComponent, 
    FullPageLoadingIndicatorService
} from "@cs/common";
import { Router } from "@angular/router";

@Component({
    selector: "app-main",
    templateUrl: "main.component.html",
    styleUrls: ["main.component.less"],
})
export class MainComponent implements OnInit {
    @ViewChild("fpli") fpliComponent: FullPageLoadingIndicatorComponent;
    @ViewChild("fpli", { read: ElementRef }) fpliRef: ElementRef;
    @ViewChild("confirmationModal") confirmationModal: ConfirmationModalComponent;

    constructor(private renderer: Renderer2,
        private elementRef: ElementRef,
        private translateService: TranslateService,
        private fpli: FullPageLoadingIndicatorService,
        private confirmationModalService: ConfirmationModalService,
        private router: Router) {}

    ngOnInit() {
        this.fpli.register(this.fpliComponent); // register the full page loading indicator
        this.fpliRef.nativeElement.focus();
        this.confirmationModalService.register(this.confirmationModal);
    }
}
