import { Injectable } from "@angular/core";
import { ConfirmationModalComponent } from "@cs/common/components/carbon-components/confirmation-modal/confirmation-modal.component";
import { Observable } from "rxjs";
import { IConfirmationModal } from "@cs/common/components/carbon-components/confirmation-modal/confirmation-modal.interface";

@Injectable()
export class ConfirmationModalService {
    private modalComponent: ConfirmationModalComponent;

    register(comp: ConfirmationModalComponent) {
        this.modalComponent = comp;
    }

    show(obj: IConfirmationModal): Observable<boolean> {
        return this.modalComponent.show(obj);
    }

    conceal() {
        this.modalComponent.conceal();
    }

    setMessage(message: string): void {
        this.modalComponent.setMessage(message);
    }

    isVisible(): boolean {
        return this.modalComponent.isVisible();
    }
}
