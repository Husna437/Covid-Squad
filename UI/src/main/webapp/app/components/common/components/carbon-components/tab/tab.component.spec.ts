import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TabComponent } from "./tab.component";
import { Tooltip } from "carbon-components";
import { DebugElement } from "@angular/core";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("TabComponent", () => {
    let component: TabComponent;
    let fixture: ComponentFixture<TabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TabComponent ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
