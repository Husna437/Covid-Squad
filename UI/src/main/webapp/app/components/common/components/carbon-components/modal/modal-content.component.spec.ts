import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { By } from "@angular/platform-browser";
import { ModalContentComponent, ModalService } from "./";
import { setupKeyboardEvent } from "@cs/components/common/utils/unit-tests";

@Component({
	template: `
        <app-modal-content closeText="Close"></app-modal-content>
	`,
})
class MockComponent {}

let modalShown = false;

class ModalServiceMock {
	canCloseByESC: boolean = true;
	showModal() {
		modalShown = true;
	}

	closeModal() {
		modalShown = false;
	}
}

describe("ModalContentComponent", () => {
	let comp: MockComponent;
	let fixture: ComponentFixture<MockComponent>;
	let de: DebugElement;
	let modalService: ModalServiceMock;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				ModalContentComponent,
				MockComponent,
			],
			imports: [
				TranslateModule.forRoot({
					loader: {
						provide: TranslateLoader,
						useClass: TranslateFakeLoader
					}
				}),
			],
			providers: [
				{
					provide: ModalService,
					useClass: ModalServiceMock
				}
			],
			schemas: [NO_ERRORS_SCHEMA]
		});

		fixture = TestBed.createComponent(MockComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
		modalService = TestBed.get(ModalService);
		modalService.canCloseByESC = true;
		fixture.detectChanges();
	});

	it("should call the modal service displaying the modal", () => {
		expect(modalShown).toBe(true);
	});

	it("should call the modal service closing the modal", () => {
		de.query(By.css(".close-button")).nativeElement.click();
		expect(modalShown).toBe(false);
	});

	it("should close the modal by using the escape key", () => {
		const spy = spyOn(modalService, "closeModal").and.callThrough();
		document.dispatchEvent(setupKeyboardEvent("keyup", "Escape", 27));
		expect(spy).toHaveBeenCalled();
	});

});