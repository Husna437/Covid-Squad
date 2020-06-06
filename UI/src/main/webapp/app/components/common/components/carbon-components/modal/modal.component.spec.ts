import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { Component, DebugElement, NgModule, ComponentFactoryResolver, Injector, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ModalComponent, ModalContentComponent, ModalService } from "./";

let prevented = false;

@Component({
	template: `
        <app-modal-content closeText="closeText">
            <div id="app-mock-comp"></div>
        </app-modal-content>
	`,
})
class MockComponent {
	onModalBeingClosed() {
		prevented = true;
	}
}

@NgModule({
	imports: [
		CommonModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: TranslateFakeLoader
			}
		}),
	],
	declarations: [ModalContentComponent, MockComponent],
	entryComponents: [MockComponent],
	schemas: [NO_ERRORS_SCHEMA]
})
class MockModule {}

describe("ModalComponent", () => {
	let comp: ModalComponent;
	let fixture: ComponentFixture<ModalComponent>;
	let de: DebugElement;
	let modalService: ModalService;
	let resolver: ComponentFactoryResolver;
	let injector: Injector;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MockModule],
			declarations: [ModalComponent],
			providers: [ModalService],
			schemas: [NO_ERRORS_SCHEMA]
		});

		fixture = TestBed.createComponent(ModalComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
		modalService = TestBed.get(ModalService);
		resolver = TestBed.get(ComponentFactoryResolver);
		injector = TestBed.get(Injector);

	});

	it("should render and display a mock component", () => {
		fixture.detectChanges();
		modalService.render(MockComponent, { resolver, injector });
		fixture.detectChanges();
		const modal = de.query(By.css(".bx--modal")).nativeElement;
		const mockComp = de.query(By.css("#app-mock-comp")).nativeElement;
		expect(modal.classList.contains("is-visible")).toBe(true);
		expect(mockComp).toBeDefined();
	});

	it("should not close when clicking on the modal", () => {
		fixture.detectChanges();
		modalService.render(MockComponent, { resolver, injector });
		fixture.detectChanges();
		const modal = de.query(By.css(".bx--modal")).nativeElement;
		modal.click();
		fixture.detectChanges();
		expect(modal.classList.contains("is-visible")).toBe(true);
	});

	it("should close the modal", () => {
		fixture.detectChanges();
		modalService.render(MockComponent, { resolver, injector });
		fixture.detectChanges();
		const modal = de.query(By.css(".bx--modal")).nativeElement;
		modalService.closeModal();
		modal.dispatchEvent(new CustomEvent("transitionend"));
		fixture.detectChanges();
		let mockComp = de.query(By.css("#app-mock-comp"));
		if (mockComp) {
			mockComp = mockComp.nativeElement;
		}
		expect(mockComp).toBeNull();
		expect(modal.classList.contains("is-visible")).toBe(false);
	});

	it("should prevent modal closing", () => {
		fixture.detectChanges();
		modalService.render(MockComponent, { resolver, injector });
		fixture.detectChanges();
		const modal = de.query(By.css(".bx--modal")).nativeElement;
		modalService.shouldPreventClosing(true);
		modalService.closeModal();
		fixture.detectChanges();
		expect(modal.classList.contains("is-visible")).toBe(true);
		expect(prevented).toBe(true);
	});

});