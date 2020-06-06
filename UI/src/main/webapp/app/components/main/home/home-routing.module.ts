import { RouterModule, Routes } from "@angular/router";
import {
    HomeComponent,
    RationDetailsComponent,
    LandingPageComponent,
    AboutUsComponent
} from "@cs/main";
import { APP_URLS } from "@cs/consts";
import { NgModule } from "@angular/core";

const homeRoutes: Routes = [
    {
        path: "", component: HomeComponent, children: [
            {
                path: "", component: LandingPageComponent
            },
            {
                path: APP_URLS.HOME, component: LandingPageComponent                 
            },
            {
                path: APP_URLS.RATION_DETAILS, component: RationDetailsComponent
            },
            {
                path: APP_URLS.ABOUT_US, component: AboutUsComponent
            },
            {
                path: "", pathMatch: "full", redirectTo: APP_URLS.DASHBOARD
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule {}
