import { Component, OnInit, Injector, ComponentFactoryResolver} from "@angular/core";
import { UtilService, ModalService } from "@cs/common";
import { Router } from "@angular/router";
import { APP_URLS } from "@cs/components/core/consts";
import { ContactUsComponent } from "@cs/components/main/home/contact-us/contact-us.component";

@Component({
    selector: "app-launch-menu",
    templateUrl: "./launch-menu.component.html",
    styleUrls: ["./launch-menu.component.less"]
})
export class LaunchMenuComponent implements OnInit {

    
  constructor(private utilService: UtilService,
    private router: Router,
    private modal : ModalService,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

    ngOnInit() {
   
}
    getRation() {
        this.router.navigateByUrl(APP_URLS.DASHBOARD + "/" + APP_URLS.RATION_DETAILS);
    }
    getHome() {
        this.router.navigateByUrl(APP_URLS.DASHBOARD + "/" + APP_URLS.HOME);    
    }

    getAboutUs() {
        this.router.navigateByUrl(APP_URLS.DASHBOARD + "/" + APP_URLS.ABOUT_US);
    }

    getContactUs() {
        alert("Contact Details\n +918890342676 \n 1800-212-5512 \n 0651-712-2723\n 0896-958-3111");
    }

}
