import { Component, DebugElement, ElementRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TrapFocus } from "./trap-focus";
import { setupKeyboardEvent } from "./unit-tests";

@Component({
	template: `
		<div>
			<div inert="true">
				<button></button>
			</div>
			<button id="btn1"></button>
			<button id="btn2"></button>
			<div inert="true">
				<button></button>
			</div>
		</div>
	`,
	selector: "app-focus-trap"
})
class MockComponent extends TrapFocus {
	constructor(public elementRef: ElementRef) {
		super();
	}
}

describe("TrapFocus", () => {
	let fixture: ComponentFixture<MockComponent>;
	let de: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				MockComponent,
			],
		});

		fixture = TestBed.createComponent(MockComponent);
		de = fixture.debugElement;

	});

	it("should set the focus on first button", () => {
		de.query(By.css("#btn2")).nativeElement.focus();
		document.dispatchEvent(setupKeyboardEvent("keydown", "Tab", 9));
		expect(document.activeElement).toEqual(
			de.query(By.css("#btn2")).nativeElement
		);
	});

	it("should set the focus on last button", () => {
		de.query(By.css("#btn1")).nativeElement.focus();
		document.dispatchEvent(setupKeyboardEvent("keydown", "Tab", 9, true));
		expect(document.activeElement).toEqual(
			de.query(By.css("#btn1")).nativeElement
		);
	});

});