import { TestBed } from "@angular/core/testing";
import { Subject, Observable } from "rxjs";
import { FullPageLoadingIndicatorComponent } from "./full-page-loading-indicator.component";
import { FullPageLoadingIndicatorService } from "@cs/common/components/carbon-components/full-page-loading-indicator";

class FullPageLoadingIndicatorComponentMock {
	conceal() {}
	show() {}
}

describe("FullPageLoadingIndicatorService", () => {
	let fullPageLoadingIndicatorService: FullPageLoadingIndicatorService;
	let fpliComponent = (new FullPageLoadingIndicatorComponentMock()) as FullPageLoadingIndicatorComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				FullPageLoadingIndicatorService
			]
		});

		fullPageLoadingIndicatorService = TestBed.get(FullPageLoadingIndicatorService);
		
	});

	it("should register and show a FullPageLoadingIndicatorComponent", () => {
		const spy = spyOn(fpliComponent, "show").and.callThrough();
		fullPageLoadingIndicatorService.register(fpliComponent);
		fullPageLoadingIndicatorService.show();
		expect(spy).toHaveBeenCalled();
	});

	it("should hide the fpli if config is fetched", () => {
		const spy = spyOn(fpliComponent, "conceal").and.callThrough();
		fullPageLoadingIndicatorService.register(fpliComponent);
		fullPageLoadingIndicatorService.conceal();
		expect(spy).toHaveBeenCalled();
	});

	it("should hide the fpli after config is fetched", () => {
		const spy = spyOn(fpliComponent, "conceal").and.callThrough();
		fullPageLoadingIndicatorService.register(fpliComponent);
		fullPageLoadingIndicatorService.conceal();
		expect(spy).toHaveBeenCalled();
	});

});
