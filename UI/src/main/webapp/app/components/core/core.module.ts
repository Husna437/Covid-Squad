import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import {
    ConfirmationModalService,
    FullPageLoadingIndicatorService,
    ModalService,
    NotificationsService,
    UtilService,
    SVGIconService
} from "@cs/common";
import { HttpClientModule } from "@angular/common/http";

import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [],
    exports: []
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error("CoreModule is already loaded. Import it in AppModule only.");
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                ConfirmationModalService,
                FullPageLoadingIndicatorService,
                ModalService,
                NotificationsService,
                UtilService,
                SVGIconService
            ]
        };
    }
}
