import { DebugElement, NO_ERRORS_SCHEMA, Component } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, tick, async } from "@angular/core/testing";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { By } from "@angular/platform-browser";
import { setupKeyboardEvent } from "@cs/components/common/utils/unit-tests";
import { MultiSelectComponent } from "./multi-select.component";

describe("MultiSelectComponent", () => {
    let component: MultiSelectComponent;
    let fixture: ComponentFixture<MultiSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MultiSelectComponent ],
            imports: [
				TranslateModule.forRoot({
					loader: {
						provide: TranslateLoader,
						useClass: TranslateFakeLoader
					}
				}),
			],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create multiselectComponent", () => {
        expect(component).toBeTruthy();
    });
});