import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { APP_URLS } from "@cs/consts";
import { AppService } from "./app.service";

@Component ({
    selector : "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"]
})

export class AppComponent implements OnInit {
    constructor(private appService: AppService,
                private router: Router) {}

    ngOnInit() { // Route to dashboard by default
        this.router.navigateByUrl(APP_URLS.DASHBOARD);
    }
}