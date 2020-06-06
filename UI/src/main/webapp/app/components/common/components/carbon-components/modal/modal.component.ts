import { Component, ComponentFactoryResolver, ElementRef, Injector, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ModalService } from "./modal.service";
import { Modal } from "carbon-components";
import { toggleInertElements } from "@cs/common/utils/functions";

@Component({
    selector: "app-modal",
    templateUrl: "modal.component.html",
    styleUrls: ["modal.component.less"]
})
export class ModalComponent implements OnInit {
    @ViewChild("modal") private modalRef: ElementRef;
    @ViewChild("content", {read: ViewContainerRef}) private contentView: ViewContainerRef;

    private contentComponent;
    private modalInstance;
    private preventClosing: boolean = false;
    private closedByButton: boolean = false;
    private lastActiveElem: any;

    autoHeight: boolean = false;

    constructor(
        private modalService: ModalService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private elementRef: ElementRef
    ) {}

    ngOnInit() {
        const modalNode = this.modalRef.nativeElement;
        const notificationsElement = document.querySelector("app-notifications");
        modalNode.addEventListener("modal-beinghidden", (e) => {
            if (!this.closedByButton) {
                e.preventDefault();
                return;
            }
            if (this.preventClosing && this.contentComponent.onModalBeingClosed) {
                e.preventDefault();
                this.contentComponent.onModalBeingClosed();
            }
            this.closedByButton = false;
        });
        modalNode.addEventListener("modal-hidden", () => {
            toggleInertElements(false, this.elementRef.nativeElement, notificationsElement);
            setTimeout(() => {
                if (document.body.contains(this.lastActiveElem)) {
                    this.lastActiveElem.focus();
                } else {
                    
                }
            }, 100); // wait for the next event loop to remove the inert attribute
            this.modalService.modalClosed$.next(true);
            this.modalService.isOpen = false;
            this.contentView.clear();
        });
        Modal.init(modalNode);
        this.modalInstance = Modal.components.get(modalNode);
        this.modalService.render$.subscribe(({ component, lazyResolver, lazyInjector, componentProps }: any) => {
            this.contentView.clear();
            this.modalService.setAutoHeightState(false);
            if (lazyResolver && lazyInjector) {
                const componentFactory = (<ComponentFactoryResolver>lazyResolver).resolveComponentFactory(component);
                this.contentComponent = this.contentView.createComponent(componentFactory, 0, (<Injector>lazyInjector)).instance;
            } else {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
                this.contentComponent = this.contentView.createComponent(componentFactory).instance;
            }
            Object.assign(this.contentComponent, componentProps);
        });
        this.modalService.toggleVisibility$.subscribe((visible: boolean) => {
            if (visible) {
                toggleInertElements(true, this.elementRef.nativeElement, notificationsElement);
                this.lastActiveElem = document.activeElement;
                this.modalInstance.show();
            } else {
                this.closedByButton = true;
                this.modalInstance.hide();
            }
        });
        this.modalService.preventClosing$.subscribe((shouldPrevent: boolean) => {
            this.preventClosing = shouldPrevent;
        });
        this.modalService.autoHeightState$.subscribe((state: boolean) => {
            this.autoHeight = state;
        });
    }

}
