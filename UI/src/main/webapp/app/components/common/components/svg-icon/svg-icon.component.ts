import { Component, OnInit, ElementRef, OnChanges, SimpleChanges, Renderer2 } from "@angular/core";
import { SVGIconService } from "./svg-icon.service";
import { IconSrc } from "../icon-src";

@Component({
    selector: "app-svg-icon",
    template: "",
    styleUrls: ["svg-icon.component.less"]
})
export class SvgIconComponent extends IconSrc implements OnInit, OnChanges {
    constructor(
        private svgService: SVGIconService, 
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.handleSVG();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.iconSrc && changes.iconSrc.currentValue) {
            this.handleSVG();
        }
    }

    private handleSVG() {
        const [ path, svgID ] = this.iconSrc.split("#");
        this.svgService.getSVG(path).subscribe(() => {
        const nodeElement = document.getElementById(svgID); // SVG or Symbol
        if (!nodeElement) {
            return;
        }
        let svg;
        if (nodeElement.nodeName === "svg") {
            svg = <HTMLElement>nodeElement.cloneNode(true);
            svg.removeAttribute("id");
        } else {
            const viewBox = nodeElement.getAttribute("viewBox").split(" ");
            svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            svg.setAttribute("viewBox", viewBox.join(" "));
            svg.setAttribute("width", viewBox[2]);
            svg.setAttribute("height", viewBox[3]);
            const childs = nodeElement.querySelectorAll("*");
            const childsLenth = childs.length;
            for (let i = 0; i < childsLenth; i++) {
                const childNode = childs[i];
                if ( childNode.parentNode === nodeElement ) {
                    const childClone = childNode.cloneNode(true);
                    svg.appendChild(childClone);
                }
            }
        }
        svg.setAttribute("focusable", false);
        const elem = this.elementRef.nativeElement;
        while (elem.firstElementChild) {
            elem.removeChild(elem.firstElementChild);
        }
        this.renderer.appendChild(this.elementRef.nativeElement, svg);
        });
    }
}
