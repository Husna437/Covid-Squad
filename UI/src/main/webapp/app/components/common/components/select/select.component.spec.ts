import { DebugElement, NO_ERRORS_SCHEMA, Component } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { setupKeyboardEvent } from "@cs/components/common/utils/unit-tests";
import { SelectComponent } from "./select.component";


@Component({
	template: "<button></button><app-select [options]='options' (optionSelected)='onOptionSelected($event)'></app-select>",
})
class MockComponent {
	options = ["Apple", "Kiwi", "Orange"];
	onOptionSelected() {}
}

describe("SelectComponent", () => {
	let comp: MockComponent;
	let fixture: ComponentFixture<MockComponent>;
	let de: DebugElement;
	let selectCompInstance: SelectComponent;
	let listBox: HTMLUListElement;
	let mainButton: HTMLButtonElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				MockComponent,
				SelectComponent,
			],
			schemas: [ NO_ERRORS_SCHEMA ]
		});

		fixture = TestBed.createComponent(MockComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
		fixture.detectChanges();

		selectCompInstance = de.query(By.directive(SelectComponent)).componentInstance;
		listBox = de.query(By.css(".bx--dropdown-list")).nativeElement;
		mainButton =  de.query(By.css(".bx--dropdown-text")).nativeElement;
		
	});

	it("should render a list of options", () => {
		expect(de.queryAll(By.css("ul li")).length).toBe(3);
		expect(de.query(By.css(".select-value")).nativeElement.textContent.trim()).toBe("Apple");
	});

	it("should hide the options list by pressing the ESC key", () => {
		const btnFocusSpy = spyOn(mainButton, "focus");
		mainButton.click();
		fixture.detectChanges();
		expect(selectCompInstance.isListboxVisible).toBe(true);
		listBox.dispatchEvent(setupKeyboardEvent("keyup", "Escape", 27));
		fixture.detectChanges();
		expect(btnFocusSpy).toHaveBeenCalled();
		expect(selectCompInstance.isListboxVisible).toBe(false);
	});

	it("should render a new list of options", () => {
		comp.options = ["One", "Two"];
		fixture.detectChanges();
		expect(de.queryAll(By.css("ul li")).length).toBe(2);
		expect(de.query(By.css(".select-value")).nativeElement.textContent.trim()).toBe("One");
	});

	it("should properly emit the selected option", fakeAsync(() => {
		const onOptionSelectedSpy = spyOn(comp, "onOptionSelected").and.callThrough();
		mainButton.click();
		de.query(By.css("ul li:last-child")).nativeElement.click();
		tick();
		expect(onOptionSelectedSpy).toHaveBeenCalledWith("Orange");
	}));

	it("should close the listbox by clicking outsisde of the component", () => {
		mainButton.click();
		expect(selectCompInstance.isListboxVisible).toBe(true);
		de.query(By.css("button")).nativeElement.click();
		expect(selectCompInstance.isListboxVisible).toBe(false);
	});

	it("should expand the listbox by pressing the enter key", () => {
		mainButton.dispatchEvent(setupKeyboardEvent("keydown", "Enter", 13));
		mainButton.click();
		expect(selectCompInstance.isListboxVisible).toBe(true);
		listBox.dispatchEvent(setupKeyboardEvent("keyup", "Enter", 13));
		expect(selectCompInstance.isListboxVisible).toBe(true);
	});

	it("should expand and collapse the listbox by pressing the enter key", () => {
		mainButton.dispatchEvent(setupKeyboardEvent("keydown", "Enter", 13));
		mainButton.click();
		expect(selectCompInstance.isListboxVisible).toBe(true);
		listBox.dispatchEvent(setupKeyboardEvent("keyup", "Enter", 13));
		expect(selectCompInstance.isListboxVisible).toBe(true);
		listBox.dispatchEvent(setupKeyboardEvent("keyup", "Enter", 13));
		expect(selectCompInstance.isListboxVisible).toBe(false);
	});

	it("should open the listbox and navigate the options from the main button using Up/Down arrow keys", () => {
		mainButton.dispatchEvent(setupKeyboardEvent("keydown", "ArrowDown", 40));
		expect(de.query(By.css("ul li:nth-child(1)")).nativeElement.classList.contains("focused")).toBe(true);
		mainButton.dispatchEvent(setupKeyboardEvent("keydown", "ArrowDown", 40));
		expect(de.query(By.css("ul li:nth-child(2)")).nativeElement.classList.contains("focused")).toBe(true);
		mainButton.dispatchEvent(setupKeyboardEvent("keydown", "ArrowDown", 40));
		expect(de.query(By.css("ul li:nth-child(3)")).nativeElement.classList.contains("focused")).toBe(true);
		mainButton.dispatchEvent(setupKeyboardEvent("keydown", "ArrowUp", 38));
		expect(de.query(By.css("ul li:nth-child(2)")).nativeElement.classList.contains("focused")).toBe(true);
		mainButton.dispatchEvent(setupKeyboardEvent("keydown", "ArrowUp", 38));
		expect(de.query(By.css("ul li:nth-child(1)")).nativeElement.classList.contains("focused")).toBe(true);
	});

	it("should open the listbox and select the first option from the main button using Up arrow key", () => {
		mainButton.dispatchEvent(setupKeyboardEvent("keydown", "ArrowUp", 38));
		expect(de.query(By.css("ul li:nth-child(1)")).nativeElement.classList.contains("focused")).toBe(true);
	});

	it("listBox should properly handle keyboard events", () => {
		mainButton.click();
		listBox.dispatchEvent(setupKeyboardEvent("keydown", "ArrowDown", 40));
		expect(de.query(By.css("ul li:nth-child(2)")).nativeElement.classList.contains("focused")).toBe(true);
		listBox.dispatchEvent(setupKeyboardEvent("keydown", "ArrowUp", 38));
		expect(de.query(By.css("ul li:nth-child(1)")).nativeElement.classList.contains("focused")).toBe(true);
		listBox.dispatchEvent(setupKeyboardEvent("keydown", "Tab", 9));
		expect(selectCompInstance.isListboxVisible).toBe(false);
		mainButton.click();
		listBox.dispatchEvent(setupKeyboardEvent("keydown", "KeyO", 79));
		// expect(de.query(By.css("ul li:nth-child(3)")).nativeElement.classList.contains("focused")).toBe(true);
	});

});
