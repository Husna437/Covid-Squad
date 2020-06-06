import { NgModule } from "@angular/core";
import {    
    HomeComponent,
    RationDetailsComponent,
    LandingPageComponent,
    AboutUsComponent,
    ContactUsComponent
} from "@cs/main";
import { HomeRoutingModule } from "@cs/main/home/home-routing.module";
import { SharedModule } from "@cs/common/shared.module";


@NgModule({
    imports: [
        HomeRoutingModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        RationDetailsComponent,
        LandingPageComponent,
        AboutUsComponent,
        ContactUsComponent        
    ],
    providers: [
        
    ],
    entryComponents: [
        ContactUsComponent     
    ]
})
export class HomeModule {}
