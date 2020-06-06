import { ComponentFactoryResolver, Injector } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ModalService } from "./modal.service";

class MockComponent {}

describe("ModalService", () => {

	let modalService: ModalService;
	let resolver: ComponentFactoryResolver;
	let injector: Injector;

	beforeEach(() => {

		TestBed.configureTestingModule({
			providers: [
				ModalService
			]
		});

		modalService = TestBed.get(ModalService);

		resolver = TestBed.get(ComponentFactoryResolver);
		injector = TestBed.get(Injector);
		
	});

	it("should emit a component to render with a given details object", (done) => {

		modalService.render$.subscribe(({component}: any) => {
			expect(component).toBe(MockComponent);
			done();
		});
		modalService.render(MockComponent, { resolver, injector });
	});

	it("should emit a truthy value, showing the modal", (done) => {
		modalService.toggleVisibility$.subscribe((shouldDisplay) => {
			expect(shouldDisplay).toBe(true);
			done();
		});
		modalService.showModal();
	});

	// it("should emit a falsy value, hiding the modal", (done) => {
	// 	modalService.toggleVisibility$.subscribe((shouldDisplay) => {
	// 		expect(shouldDisplay).toBe(false);
	// 		done();
	// 	});
	// 	modalService.closeModal();
	// });

	it("should emit a truthy value, preventing the modal to close", (done) => {
		modalService.preventClosing$.subscribe((shouldPrevent) => {
			expect(shouldPrevent).toBe(true);
			done();
		});
		modalService.shouldPreventClosing(true);
	});

});