import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { ConfirmationModalComponent } from "./confirmation-modal.component";
import { By } from "@angular/platform-browser";

describe("ConfirmationModalComponent", () => {
    let comp: ConfirmationModalComponent;
    let fixture: ComponentFixture<ConfirmationModalComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader
                    }
                }),
            ],
            declarations: [
                ConfirmationModalComponent,
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });

        fixture = TestBed.createComponent(ConfirmationModalComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        de = fixture.debugElement;    
    });

    it("should create", () => {
        expect(comp).toBeTruthy();
    });

    it("should hide the modal on clicking outside", () => {
        fixture.detectChanges();
        const div = document.createElement("div");
        div.setAttribute("data-modal", "true");
        const modal = de.query(By.css(".bx--modal")).nativeElement;
        modal.dispatchEvent(new CustomEvent("modal-beinghidden", {detail: {launchingElement: div}}));
        fixture.detectChanges();
        expect(modal.classList.contains("is-visible")).toBe(false);
    });

    it("should open the modal with a specified config", () => {
        fixture.detectChanges();
        comp.show({
            title: "Title",
            message: "Message",
            primaryButtonLabel: "Ok",
            secondaryButtonLabel: "Cancel"
        });
        fixture.detectChanges();
        expect(
            de.query(By.css(".bx--modal-header__heading")).nativeElement.textContent.trim()
        ).toBe("Title");
        expect(
            de.query(By.css(".bx--modal-content p")).nativeElement.textContent.trim()
        ).toBe("Message");
        expect(
            de.query(By.css(".bx--btn--primary")).nativeElement.textContent.trim()
        ).toBe("Ok");
        expect(
            de.query(By.css(".bx--btn--secondary")).nativeElement.textContent.trim()
        ).toBe("Cancel");
    });

    it("should hide the modal by clicking the confirmation button", () => {
        comp.show({
            title: "Title",
            message: "Message",
            primaryButtonLabel: "Ok",
            secondaryButtonLabel: "Cancel"
        });
        fixture.detectChanges();
        de.query(By.css(".bx--btn--primary")).nativeElement.click();
        fixture.detectChanges();
        const modal = de.query(By.css(".bx--modal")).nativeElement;
        expect(modal.classList.contains("is-visible")).toBe(false);
    });

    it("should set the focus on message if a primary button is not found", (done) => {
        comp.show({
            title: "Title",
            message: "Message",
        });
        setTimeout(() => {
            expect(document.activeElement).toBe(de.query(By.css(".bx--modal-content p")).nativeElement);
            done();
        }, 200);
    });

    it("should close the modal by calling only once the hide method even if show method was called multiple times", () => {
        const spy = spyOn(comp, "hide").and.callThrough();
        comp.show({
            title: "Title",
            message: "Message",
        });
        comp.show({
            title: "Title",
            message: "Message",
        });
        de.query(By.css(".bx--modal-close")).nativeElement.click();
        expect(spy).toHaveBeenCalled();
    });

    it("should call the appropriate action by clicking the secondary button", () => {
        let secondaryActionCalled = false;
        comp.show({
            title: "Title",
            message: "Message",
            secondaryButtonLabel: "Cancel",
            secondaryButtonAction: () => {
                secondaryActionCalled = true;
            },
        });
        fixture.detectChanges();
        de.query(By.css(".bx--btn--secondary")).nativeElement.click();
        expect(secondaryActionCalled).toBe(true);
    });

    it("should properly set the message", () => {
        comp.show({
            title: "Title",
            message: "Message",
        });
        fixture.detectChanges();
        comp.setMessage("New message");
        fixture.detectChanges();
        expect(
            de.query(By.css(".bx--modal-content p")).nativeElement.textContent.trim()
        ).toBe("New message");
    });

    it("should tell if modal is visible or not", () => {
        comp.show({
            title: "Title",
            message: "Message",
        });
        fixture.detectChanges();
        expect(comp.isVisible()).toBe(true);
    });

});
