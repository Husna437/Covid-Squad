import { Component, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NotificationsService } from "./notifications.service";

class MockComponent {}
const componentDetails = {};

describe("NotificationsService", () => {

    let notificationsService: NotificationsService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                NotificationsService
            ]
        });

        notificationsService = TestBed.get(NotificationsService);

    });

    it("should send an success notification", (done) => {
        notificationsService.renderNotification$.subscribe((notification) => {
            expect(notification).toEqual({
                type: "success",
                genre: "polite",
                content: "Test"
            });
            done();
        });
        notificationsService.success("Test");
    });

    it("should send an info notification", (done) => {
        notificationsService.renderNotification$.subscribe((notification) => {
            expect(notification).toEqual({
                type: "info",
                genre: "polite",
                content: "Test"
            });
            done();
        });
        notificationsService.info("Test");
    });
    
    it("should send an warning notification", (done) => {
        notificationsService.renderNotification$.subscribe((notification) => {
            expect(notification).toEqual({
                type: "warning",
                genre: "alert",
                content: "Test"
            });
            done();
        });
        notificationsService.warning("Test");
    });

    it("should send an error notification", (done) => {
        notificationsService.renderNotification$.subscribe((notification) => {
            expect(notification).toEqual({
                type: "error",
                genre: "alert",
                content: "Test"
            });
            done();
        });
        notificationsService.error("Test");
    });
});
