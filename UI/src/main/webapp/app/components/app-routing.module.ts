import { MainComponent } from "@cs/core";
import { RouterModule, Routes } from "@angular/router";
import { APP_URLS } from "@cs/consts";
import { NgModule } from "@angular/core";
import { CustomPreloadingStrategy } from "@cs/components/app-custom-preloading-strategy";

const appRoutes: Routes = [
    {
    path: "", component: MainComponent,
    children: [
        {
            path: APP_URLS.DASHBOARD, loadChildren: "./main/home/home.module#HomeModule", data: {preload: true}
        },
        {
            path: "", pathMatch: "full", redirectTo: APP_URLS.DASHBOARD
        }
    ]
    },
    {
        path: "redirectToRoot", redirectTo: ""
    },
    {
        path: "**", redirectTo: ""
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule],
    providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule {
}