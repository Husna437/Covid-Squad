/*Common angular modules */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/* Routing module */
import { RouterModule } from "@angular/router";
/* Forms module */
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/*Translation module */
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
/*Http modules*/
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
/*Application modules */
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";
import {
    HeaderComponent,
    MainComponent,
    LaunchMenuComponent

} from "@cs/core";
import { SharedModule } from "@cs/common/shared.module";
import { CoreModule } from "@cs/components/core/core.module";
import { AppRoutingModule } from "@cs/components/app-routing.module";
import { CustomHttpInterceptor } from "@cs/common";

/**
 * We must use an exported function since we"re doing AOT compilation.
 * @param {HttpClient} http
 * @returns {TranslateHttpLoader}
 */
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/lang/", ".json");
}

@NgModule({
    declarations: [  
                    AppComponent, 
                    MainComponent, 
                    HeaderComponent,  
                    LaunchMenuComponent
                ],
    imports: [ BrowserModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        CoreModule.forRoot(),
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [ 
        AppService, 	
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
            multi: true
        },
        {
            provide: "Window",
            useValue: window
        }
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }

