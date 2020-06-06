import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { toggleInertElements } from "./functions";

@Component({
	template: `
		<div>
			<div id="sibling1">
				<div id="s1-child1"></div>
			</div>
			<div id="sibling2"></div>
			<div id="sibling3" class="excluded"></div>
			<div id="sibling4" class="excluded"></div>
		</div>
	`,
})
class MockComponent {}

describe("toggleInertElements", () => {
	let comp: MockComponent;
	let fixture: ComponentFixture<MockComponent>;
	let de: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				MockComponent,
			],
		});

		fixture = TestBed.createComponent(MockComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;

	});

	it("should set inert on parent elements", (done) => {
		toggleInertElements(true, de.query(By.css("#s1-child1")).nativeElement);
		setTimeout(() => {
			expect(
				de.query(By.css("#sibling1")).nativeElement.getAttribute("inert")
			).toBeFalsy();
			expect(
				de.query(By.css("#sibling2")).nativeElement.getAttribute("inert")
			).toBeDefined();
			expect(
				de.query(By.css("#sibling3")).nativeElement.getAttribute("inert")
			).toBeDefined();
			expect(
				de.query(By.css("#sibling4")).nativeElement.getAttribute("inert")
			).toBeDefined();
			done();
		});
	});

	it("should set inert on parent elements excluding one sibling", (done) => {
		toggleInertElements(true, de.query(By.css("#s1-child1")).nativeElement, de.query(By.css("#sibling3")).nativeElement);
		setTimeout(() => {
			expect(
				de.query(By.css("#sibling1")).nativeElement.getAttribute("inert")
			).toBeFalsy();
			expect(
				de.query(By.css("#sibling2")).nativeElement.getAttribute("inert")
			).toBeDefined();
			expect(
				de.query(By.css("#sibling3")).nativeElement.getAttribute("inert")
			).toBeFalsy();
			expect(
				de.query(By.css("#sibling4")).nativeElement.getAttribute("inert")
			).toBeDefined();
			done();
		});
	});

	it("should set inert on parent elements excluding multiple siblings", (done) => {
		const elems: any = de.queryAll(By.css(".excluded"));
		toggleInertElements(
			true, 
			de.query(By.css("#s1-child1")).nativeElement, 
			[...elems]
		);
		setTimeout(() => {
			expect(
				de.query(By.css("#sibling1")).nativeElement.getAttribute("inert")
			).toBeFalsy();
			expect(
				de.query(By.css("#sibling2")).nativeElement.getAttribute("inert")
			).toBeDefined();
			expect(
				de.query(By.css("#sibling3")).nativeElement.getAttribute("inert")
			).toBeFalsy();
			expect(
				de.query(By.css("#sibling4")).nativeElement.getAttribute("inert")
			).toBeFalsy();
			done();
		});
	});

	it("should set and remove inert on parent elements", (done) => {
		const target = de.query(By.css("#s1-child1")).nativeElement;
		toggleInertElements(true, target);
		setTimeout(() => {
			expect(
				de.query(By.css("#sibling2")).nativeElement.getAttribute("inert")
			).toBeDefined();
			toggleInertElements(false, target);
			setTimeout(() => {
				expect(
					de.query(By.css("#sibling2")).nativeElement.getAttribute("inert")
				).toBeFalsy();
				done();
			});
		});
	});

});
