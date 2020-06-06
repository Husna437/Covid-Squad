import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { SearchBoxComponent } from "./search-box.component";
import { By } from "@angular/platform-browser";
import { SvgIconComponent, SVGIconService } from "@cs/common/components/svg-icon";
import { of } from "rxjs";

class SVGIconServiceMock {
	getSVG() {
		return of("");
	}
}

describe("SearchBoxComponent", () => {
	let comp: SearchBoxComponent;
	let fixture: ComponentFixture<SearchBoxComponent>;
	let de: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				SearchBoxComponent,
				SvgIconComponent
			],
			imports: [
				TranslateModule.forRoot({
					loader: {
						provide: TranslateLoader,
						useClass: TranslateFakeLoader
					}
				}),
			],
			schemas: [NO_ERRORS_SCHEMA],
			providers: [{
				provide: SVGIconService,
				useClass: SVGIconServiceMock,
			}]
		});

		fixture = TestBed.createComponent(SearchBoxComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;

		fixture.detectChanges();
		
	});

	it("should send an input event", () => { 
		const spy = spyOn(comp.textChanged, "emit").and.callThrough();
		comp.searchControl.setValue("Test");
		expect(spy).toHaveBeenCalled();
		de.query(By.css(".bx--search-close")).nativeElement.click();
	});

	it("should empty the text input by clicking the clear button", () => {
		comp.searchControl.setValue("");
		de.query(By.css(".bx--search-close")).nativeElement.click();
        expect(comp.searchControl.value).toBe("");
        comp.onClear();
    });

    it("should submit the text entered in the search input field", () => {
        const spy = spyOn(comp.textSubmit, "emit").and.callThrough();
        comp.searchControl.setValue("Test");
        de.query(By.css(".bx--search-close")).nativeElement.click();
        expect(comp.searchControl.value).toBe("Test");
        comp.submitSearch();
    });

});
