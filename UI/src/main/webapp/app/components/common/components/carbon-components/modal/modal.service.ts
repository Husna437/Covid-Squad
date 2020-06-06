import { ComponentFactoryResolver, Injectable, Injector } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { take } from "rxjs/operators";

interface RenderPropsI {
    resolver: ComponentFactoryResolver;
    injector: Injector;
    componentProps?: {};
}

@Injectable()
export class ModalService {
    private renderSubject: Subject<{}> = new Subject();
    render$: Observable<{}> = this.renderSubject.asObservable();
    private toggleVisiblitySubject: Subject<boolean> = new Subject();
    toggleVisibility$: Observable<boolean> = this.toggleVisiblitySubject.asObservable();
    private preventClosingSubject: Subject<boolean> = new Subject();
    preventClosing$: Observable<boolean> = this.preventClosingSubject.asObservable();
    private autoHeightStateSubject: Subject<boolean> = new Subject();
    autoHeightState$: Observable<boolean> = this.autoHeightStateSubject.asObservable();
    private close: Subject<any>;
    modalClosed$: Subject<boolean> = new Subject();
    isClosingPrevented: boolean = false;
    isOpen: boolean = false;

    render( component, { resolver, injector, componentProps }: RenderPropsI ) {
        this.renderSubject.next({
            component, lazyResolver: resolver, lazyInjector: injector, componentProps
        });
        if (this.close) {
            this.close.complete();
            this.close.unsubscribe();
        }
        this.close = new Subject<any>();
        return this.close.asObservable().pipe(take(1));
    }

    showModal() {
        if (!this.isOpen) {
        this.toggleVisiblitySubject.next(true);
        this.isOpen = true;
    }
    }

    setAutoHeightState( isAuto: boolean ) {
        this.autoHeightStateSubject.next(isAuto);
    }

    closeModal(success: boolean = false, returnData?: any) {
        this.close.next({success, returnData});
        this.toggleVisiblitySubject.next(false);
    }

    shouldPreventClosing(shouldPrevent: boolean) {
        this.isClosingPrevented = shouldPrevent;
        this.preventClosingSubject.next(shouldPrevent);
    }
}
