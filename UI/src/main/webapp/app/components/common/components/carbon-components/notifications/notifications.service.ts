import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { NotificationInterface } from "./notifications.component";

@Injectable()
export class NotificationsService {

    private renderNotificationSubject: Subject<NotificationInterface> = new Subject();
    renderNotification$: Observable<NotificationInterface> = this.renderNotificationSubject.asObservable();

    removalTime: number | null = 10000;

    success(content: string) {
        this.renderNotificationSubject.next({
            type: "success",
            genre: "polite",
            content
        });
    }

    info(content: string) {
        this.renderNotificationSubject.next({
            type: "info",
            genre: "polite",
            content
        });
    }

    warning(content: string) {
        this.renderNotificationSubject.next({
            type: "warning",
            genre: "alert",
            content
        });
    }

    error(content: string) {
        this.renderNotificationSubject.next({
            type: "error",
            genre: "alert",
            content
        });
    }
}
