import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ToolTipComponent } from "./tool-tip.component";
import { Tooltip } from "carbon-components";
import { DebugElement } from "@angular/core";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("ToolTipComponent", () => {
    let component: ToolTipComponent;
    let fixture: ComponentFixture<ToolTipComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ToolTipComponent ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolTipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
