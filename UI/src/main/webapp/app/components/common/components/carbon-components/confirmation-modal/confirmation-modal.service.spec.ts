import { TestBed } from "@angular/core/testing";
import { ConfirmationModalService } from "./confirmation-modal.service";
import { ConfirmationModalComponent } from "./confirmation-modal.component";
import { IConfirmationModal } from "./confirmation-modal.interface";
import { Component } from "@angular/core";

@Component({
    template: "",
})
class MockComponent {
    private visibility: boolean = false;
    show() {
        this.visibility = true;
    }
    hide() {
        this.visibility = false;
    }
    setMessage() {}
    isVisible() {
        return this.visibility;
    }
}

describe("ConfirmationModalService", () => {

    let confirmationModalService: ConfirmationModalService;
    let mockComponent = (new MockComponent()) as unknown as ConfirmationModalComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ConfirmationModalService ],
        });
        confirmationModalService = TestBed.get(ConfirmationModalService);
        confirmationModalService.register(mockComponent);
    });

    it("should register and open the modal", () => {
        const spy = spyOn(mockComponent, "show").and.callThrough();
        confirmationModalService.show({} as IConfirmationModal);
        expect(spy).toHaveBeenCalled();
    });

    it("should hide the modal", () => {
        const spy = spyOn(mockComponent, "conceal").and.callThrough();
        confirmationModalService.conceal();
        expect(spy).toHaveBeenCalled();
    });

    it("should set a new message", () => {
        const spy = spyOn(mockComponent, "setMessage").and.callThrough();
        confirmationModalService.setMessage("Message");
        expect(spy).toHaveBeenCalledWith("Message");
    });

    it("should detect if modal is shown", () => {
        confirmationModalService.show({} as IConfirmationModal);
        expect(confirmationModalService.isVisible()).toBe(true);
    });

});
