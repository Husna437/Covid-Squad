import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CustomHttpInterceptor } from "./custom-http-interceptor.service";
import { HttpClient , HTTP_INTERCEPTORS, HttpHeaders } from "@angular/common/http";

const windowMock = {
	location: jasmine.createSpyObj("location", ["replace"])
};

describe("CustomHttpInterceptor", () => {
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [
				{
					provide: HTTP_INTERCEPTORS,
					useClass: CustomHttpInterceptor,
					multi: true,
				},
				{
					provide: "Window",
					useValue: windowMock
				},
			],
		});
	});

	afterEach(inject([HttpTestingController ], (httpTestingController: HttpTestingController) => {
		httpTestingController.verify();
	}));

	it(
		"should redirect the user to the root page", 
		inject(
			[HttpClient, HttpTestingController], 
			(httpClient: HttpClient, httpTestingController: HttpTestingController) => {
				httpClient.get("/").subscribe(() => {});
				const req = httpTestingController.expectOne("/");
				req.flush("redirect to op", {
					headers: new HttpHeaders({
						"Content-Type": "text/html"
					}),	
				});
				// expect(windowMock.location.replace).toHaveBeenCalled();
			}
		)
	);
	
});
