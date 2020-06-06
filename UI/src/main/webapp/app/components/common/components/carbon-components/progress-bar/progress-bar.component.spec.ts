import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { ProgressBarComponent } from "./progress-bar.component";
import { By } from "@angular/platform-browser";
import { SvgIconComponent, SVGIconService } from "@cs/common/components/svg-icon";
import { of } from "rxjs";

describe("ProgressBarComponent", () => {
	let comp: ProgressBarComponent;
	let fixture: ComponentFixture<ProgressBarComponent>;
	let de: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				ProgressBarComponent
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

		fixture = TestBed.createComponent(ProgressBarComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;

		fixture.detectChanges();
		
    });

    it("should create progerssbarComponent", () => {
        expect(comp).toBeTruthy();
    });    

});
