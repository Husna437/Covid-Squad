import { environment } from "@cs/environments/environment";
import { Input, OnInit } from "@angular/core";

export class IconSrc implements OnInit {
    @Input() iconSrc: string;
    @Input() iconPath: string;
    @Input() carbonIcon: string;
    ngOnInit() {
        if ( !this.iconSrc && ( this.iconPath || this.carbonIcon ) ) {
            this.iconSrc = this.iconPath || (environment.iconPath + "/assets/icons/carbon-icons.svg#icon--" + this.carbonIcon);
        }
    }
}
