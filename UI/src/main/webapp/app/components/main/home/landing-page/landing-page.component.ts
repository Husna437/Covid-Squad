import { Component, OnInit } from '@angular/core';
import { FullPageLoadingIndicatorService, UtilService, ModalService, NotificationsService } from "@cs/common";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.less']
})
export class LandingPageComponent implements OnInit {

  constructor(private fpli: FullPageLoadingIndicatorService,
    ) { }

  ngOnInit() {
      this.fpli.conceal();
  }

}
