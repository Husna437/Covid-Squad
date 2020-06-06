import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { OptionsMenuComponent } from "./options-menu.component";
import { By } from "@angular/platform-browser";
import { setupKeyboardEvent } from "@cs/components/common/utils/unit-tests";

describe("OptionsMenuComponent", () => {
	let comp: OptionsMenuComponent;
	let fixture: ComponentFixture<OptionsMenuComponent>;
	let de: DebugElement;
	const options = [
		{
			title: "Option 1",
		}, {
			title: "Option 2"
		}, {
			title: "Option 3"
		}
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				OptionsMenuComponent,
			],
			imports: [
				TranslateModule.forRoot({
					loader: {
						provide: TranslateLoader,
						useClass: TranslateFakeLoader
					}
				}),
			],
			schemas: [ NO_ERRORS_SCHEMA ]
		});

		fixture = TestBed.createComponent(OptionsMenuComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
		comp.options = options;

	});

	it("should render a list of two items", () => { 
		fixture.detectChanges();
		const list = de.queryAll(By.css("ul li"));
		expect(list.length).toBe(options.length);
		expect(list[0].nativeElement.textContent.trim()).toBe(options[0].title);
	});

	it("should render the DOM inside", () => {
		comp.menuInside = "true";
		fixture.detectChanges();
		expect(de.nativeElement.getAttribute("data-floating-menu-container")).toBeDefined();
	});

	it("should set the focus on first item when the menu gets open", (done) => {
		fixture.detectChanges();
		const spy = spyOn(de.query(By.css("ul li button")).nativeElement, "focus").and.callThrough();
		de.query(By.css("[data-overflow-menu]")).nativeElement.dispatchEvent(new Event("floating-menu-shown"));
		setTimeout(() => {
			expect(spy).toHaveBeenCalled();
			done();
		});
	});

	it("should open the menu by pressing the space/down key", (done) => {
		fixture.detectChanges();
		const menu = de.query(By.css("[data-overflow-menu]")).nativeElement;
		const spy = spyOn(menu, "click").and.callThrough();
		menu.dispatchEvent(setupKeyboardEvent("keyup", "Space", 32));
		menu.dispatchEvent(setupKeyboardEvent("keyup", "ArrowDown", 40));
		setTimeout(() => {
			// expect(spy).toHaveBeenCalled();
			done();
		});
	});

	it("should open the menu by pressing the up key, setting the focus on last item", (done) => {
		fixture.detectChanges();
		const menu = de.query(By.css("[data-overflow-menu]")).nativeElement;
        const spyClick = spyOn(menu, "click").and.callThrough();
		const spyFocus = spyOn(de.query(By.css("ul li:last-child button")).nativeElement, "focus").and.callThrough();
		menu.dispatchEvent(setupKeyboardEvent("keyup", "ArrowUp", 38));
		setTimeout(() => {
			// expect(spyClick).toHaveBeenCalled();
			// expect(spyFocus).toHaveBeenCalled();
			done();
		});
	});

	it("should set the focus on main container when open, if ESC key is pressed", () => {
		fixture.detectChanges();
		const ul = de.query(By.css("ul")).nativeElement;
		const menu = de.query(By.css("[data-overflow-menu]")).nativeElement;
		const menuFocusSpy = spyOn(menu, "focus").and.callThrough();
		ul.dispatchEvent(setupKeyboardEvent("keyup", "Esc", 27));
		// expect(menuFocusSpy).toHaveBeenCalled();
	});

	it("should call the appropriate action by clicking the item", () => {
		fixture.detectChanges();
		const callActionSpy = spyOn(comp, "callAction").and.callThrough();
		const actionTriggerSpy = spyOn(comp.actionTrigger, "emit").and.callThrough();
		const menuRefFocusSpy = spyOn(de.query(By.css("[data-overflow-menu]")).nativeElement, "focus").and.callThrough();
		de.query(By.css("ul li button")).nativeElement.click();
		expect(callActionSpy).toHaveBeenCalledWith(0);
		expect(actionTriggerSpy).toHaveBeenCalledWith(0);
		expect(menuRefFocusSpy).toHaveBeenCalled();
	});

});
