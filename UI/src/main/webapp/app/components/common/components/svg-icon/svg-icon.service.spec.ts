import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { SVGIconService } from "./svg-icon.service";

describe("SVGIconService", () => {
	
	let httpTestingController: HttpTestingController;
	let service: SVGIconService;
	let svgPath = "assets/icons/alert.svg#alert";
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [SVGIconService]
		});
		
		httpTestingController = TestBed.get(HttpTestingController);
		service = TestBed.get(SVGIconService);
	});

	it("should return a mock SVG from http response", () => {
		service.getSVG(svgPath).subscribe((svgID: string) => {
			expect(document.getElementById("alert")).not.toBeNull("custom SVG element was not created");
		});

		httpTestingController.expectOne(svgPath).flush("<svg id='alert'></svg>");
	});

	it("should return a cached SVG", (done) => {
		service.getSVG(svgPath).subscribe(() => {
			service.getSVG(svgPath).subscribe((svgID: string) => {
				expect(document.getElementById("alert")).not.toBeNull("custom SVG element was not created");
				done();
			});
		});

		httpTestingController.expectOne(svgPath).flush("<svg id='alert'></svg>");
	});

});
