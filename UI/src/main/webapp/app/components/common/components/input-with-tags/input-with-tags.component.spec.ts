import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { InputWithTagsComponent } from "./input-with-tags.component";
import { By } from "@angular/platform-browser";
import { SvgIconComponent, SVGIconService } from "@cs/common/components/svg-icon";
import { of } from "rxjs";

describe("InputWithTagsComponent", () => {
	let comp: InputWithTagsComponent;
	let fixture: ComponentFixture<InputWithTagsComponent>;
	let de: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				InputWithTagsComponent
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
		});

		fixture = TestBed.createComponent(InputWithTagsComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;

		fixture.detectChanges();
		
    });

    it("should create InputWithTagsComponent", () => {
        expect(comp).toBeTruthy();
    });    

});
