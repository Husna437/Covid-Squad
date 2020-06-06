import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, ElementRef, Renderer2 } from "@angular/core";
import { FullPageLoadingIndicatorComponent } from "@cs/common/components/carbon-components/full-page-loading-indicator";

class MockElementRef extends ElementRef {
	constructor() {
		super(null);
	}
}

describe("FullPageLoadingIndicatorComponent", () => {
	let comp: FullPageLoadingIndicatorComponent;
	let fixture: ComponentFixture<FullPageLoadingIndicatorComponent>;
	let de: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				FullPageLoadingIndicatorComponent
			],
			providers: [
				Renderer2,
				{
					provide: ElementRef,
					useClass: MockElementRef
				}
			]
		});

		fixture = TestBed.createComponent(FullPageLoadingIndicatorComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
	});

	it("should create", () => {
		fixture.detectChanges();
		expect(comp).toBeDefined("component should be defined");
	});

	it("should make the component visible on show()", () => {
		fixture.detectChanges();
		comp.show();
		fixture.detectChanges();
		expect(de.nativeElement.classList).toContain("visible", "component should have the 'visible' class");
	});

	it("should make the component hidden on hide()", () => {
		fixture.detectChanges();
		comp.conceal();
		fixture.detectChanges();
		expect(de.nativeElement.classList).not.toContain("visible", "component should not have the 'visible' class");
	});
});
