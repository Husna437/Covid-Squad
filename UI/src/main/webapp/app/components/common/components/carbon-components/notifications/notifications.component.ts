import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "./notifications.service";

export interface NotificationInterface {
    type: string;	
    genre: string;
    content: string;
    timeoutID?: any;
}

@Component({
    selector: "app-notifications",
    templateUrl: "notifications.component.html",
    styleUrls: ["notifications.component.less"]
})
export class NotificationsComponent implements OnInit {

    notifications: NotificationInterface[] = [];

    constructor(private notificationsService: NotificationsService) {}

    ngOnInit() {
        const { removalTime }  = this.notificationsService;
        this.notificationsService.renderNotification$.subscribe((notification: NotificationInterface) => {
            const duplicate = this.notifications.filter( n => n.content === notification.content)[0];
            if ( duplicate ) {
                notification = duplicate;
            }
            if ( removalTime ) {
                notification.timeoutID = setTimeout(() => {
                    if ( this.notifications.includes(notification) ) {
                        this.removeNotification(notification);
                    }
                }, removalTime);
            }
            if ( duplicate ) {
                this.removeNotification(notification);
                this.notifications.push(notification);
            } else {
                this.notifications.push(notification);
            }
        });
    }

    removeNotification(notification: NotificationInterface) {
        const {	notifications } = this;
        const index = notifications.indexOf(notification);
        clearTimeout(notification.timeoutID);
        this.notifications = [...notifications.slice(0, index), ...notifications.slice(index + 1)];
    }
}
