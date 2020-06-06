import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { EditorComponent } from "./editor.component";
import { By } from "@angular/platform-browser";
import { SvgIconComponent, SVGIconService } from "@cs/common/components/svg-icon";
import { of } from "rxjs";

describe("EditorComponent", () => {
	let comp: EditorComponent;
	let fixture: ComponentFixture<EditorComponent>;
	let de: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				EditorComponent
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

		fixture = TestBed.createComponent(EditorComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;

		fixture.detectChanges();
		
    });

    it("should create editorComponent", () => {
        expect(comp).toBeTruthy();
    });    

});
