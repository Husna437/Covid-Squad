import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, ElementRef } from "@angular/core";
import { SvgIconComponent } from "./svg-icon.component";
import { SVGIconService } from "./svg-icon.service";
import { of } from "rxjs";

class MockElementRef extends ElementRef {
	constructor() {
		super(null);
	}
}

class MockSVGIconService {
	getSVG(path: string) {
		const div = document.createElement("div");

		div.innerHTML = path.includes("carbon") ?
			`<symbol id="icon--restart--glyph" viewBox='0 0 12 16'><path><path></path></path></symbol>` :
			`<svg id="alert"></svg>`;
		document.body.appendChild(div);
		return of("");
	}
}

describe("SvgIconComponent", () => {
	let comp: SvgIconComponent;
	let fixture: ComponentFixture<SvgIconComponent>;
	let de: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				SvgIconComponent
			],
			providers: [
				{
					provide: ElementRef,
					useClass: MockElementRef
				},
				{
					provide: SVGIconService,
					useClass: MockSVGIconService
				},
			]
		});

		fixture = TestBed.createComponent(SvgIconComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
	});

	it("should load a custom svg", () => {
		comp.iconSrc = "/assets/icons/alert.svg#alert";
		fixture.detectChanges();
		expect(document.getElementById("alert")).not.toBeNull("custom SVG element was not created");
	});

	it("should load a carbonIcon svg", () => {
		comp.iconSrc = "/assets/icons/carbon-icons.svg#icon--restart--glyph";
		fixture.detectChanges();
		expect(document.getElementById("icon--restart--glyph")).not.toBeNull("carbonIcon SVG element was not created");
	});

});
