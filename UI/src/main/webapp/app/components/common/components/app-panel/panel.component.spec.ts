import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { AppPanelComponent } from "./panel.component";

describe("AppPanelComponent", () => {
    let comp: AppPanelComponent;
    let fixture: ComponentFixture<AppPanelComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppPanelComponent,
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });

        fixture = TestBed.createComponent(AppPanelComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        de = fixture.debugElement;	
    });

    it("should toggle panel visibility to visible", () => {
        comp.panelIsVisible = false;
        comp.toggleVisibility();
        fixture.detectChanges();
        expect(comp.panelIsVisible).toBe(true);
    });

    it("should toggle panel visibility to hidden", () => {
        comp.panelIsVisible = true;
        comp.toggleVisibility();
        fixture.detectChanges();
        expect(comp.panelIsVisible).toBe(false);
    });

    it("should hide the panel by clicking outside", () => {
        comp.panelIsVisible = true;
        fixture.detectChanges();
        document.dispatchEvent(new Event("click"));
        fixture.detectChanges();
        expect(comp.panelIsVisible).toBe(false);
    });

    it("should not hide the panel by clicking it", () => {
        comp.panelIsVisible = true;
        fixture.detectChanges();
        de.nativeElement.dispatchEvent(new Event("click", {"bubbles": true}));
        fixture.detectChanges();
        expect(comp.panelIsVisible).toBeTruthy();
    });

    it("should hide the panel by clicking on it if config is set to true", () => {
        comp.hideOnClick = true;
        comp.onPanelClick();
        fixture.detectChanges();
        expect(de.nativeElement.classList.contains("open")).toBe(false);
    });

});
