import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { By } from "@angular/platform-browser";
import { NotificationsComponent, NotificationsService } from "./";

describe("NotificationsComponent", () => {
	let comp: NotificationsComponent;
	let fixture: ComponentFixture<NotificationsComponent>;
	let de: DebugElement;
	let notificationsService: NotificationsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ NotificationsComponent ],
			imports: [
				TranslateModule.forRoot({
					loader: {
						provide: TranslateLoader,
						useClass: TranslateFakeLoader
					}
				}),
			],
			providers: [ NotificationsService ],
			schemas: [ NO_ERRORS_SCHEMA ]
		});

		fixture = TestBed.createComponent(NotificationsComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
		notificationsService = TestBed.get(NotificationsService);
		notificationsService.removalTime = null;
	});

	it("should display 'Test message' as an success notification", () => {
		fixture.detectChanges();
		notificationsService.success("Test message");
		fixture.detectChanges();
		expect(de.query(By.css(".bx--inline-notification__text-wrapper")).nativeElement.textContent.trim()).toBe("Test message");
		const notificationClassName = de.query(By.css(".bx--inline-notification")).nativeElement.getAttribute("class");
		expect(notificationClassName).toBe("bx--inline-notification bx--inline-notification--success");
	});

	it("should display 'Test message' as an info notification", () => {
		fixture.detectChanges();
		notificationsService.info("Test message");
		fixture.detectChanges();
		expect(de.query(By.css(".bx--inline-notification__text-wrapper")).nativeElement.textContent.trim()).toBe("Test message");
		const notificationClassName = de.query(By.css(".bx--inline-notification")).nativeElement.getAttribute("class");
		expect(notificationClassName).toBe("bx--inline-notification bx--inline-notification--info");
	});

	it("should display 'Test message' as an warning notification", () => {
		fixture.detectChanges();
		notificationsService.warning("Test message");
		fixture.detectChanges();
		expect(de.query(By.css(".bx--inline-notification__text-wrapper")).nativeElement.textContent.trim()).toBe("Test message");
		const notificationClassName = de.query(By.css(".bx--inline-notification")).nativeElement.getAttribute("class");
		expect(notificationClassName).toBe("bx--inline-notification bx--inline-notification--warning");
	});

	it("should display 'Test message' as an error notification", () => {
		fixture.detectChanges();
		notificationsService.error("Test message");
		fixture.detectChanges();
		expect(de.query(By.css(".bx--inline-notification__text-wrapper")).nativeElement.textContent.trim()).toBe("Test message");
		const notificationClassName = de.query(By.css(".bx--inline-notification")).nativeElement.getAttribute("class");
		expect(notificationClassName).toBe("bx--inline-notification bx--inline-notification--error");
	});

	it("should display a notification and remove it on close button", () => {
		fixture.detectChanges();
		notificationsService.success("Test message");
		fixture.detectChanges();
		expect(de.query(By.css(".bx--inline-notification")).nativeElement).toBeDefined();
		de.query(By.css(".bx--inline-notification__close-button")).nativeElement.click();
		fixture.detectChanges();
		expect(de.query(By.css(".bx--inline-notification"))).toBeNull();
	});

	it("should automatically remove a notification", (done) => {
		notificationsService.removalTime = 1;
		fixture.detectChanges();
		notificationsService.success("Test message");
		fixture.detectChanges();
		expect(de.query(By.css(".bx--inline-notification")).nativeElement).toBeDefined();
		setTimeout(() => {
			fixture.detectChanges();
			expect(de.query(By.css(".bx--inline-notification"))).toBeNull();
			done();
		});
	});

});