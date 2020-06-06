import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { publishReplay, refCount } from "rxjs/operators";

@Injectable()
export class SVGIconService {
    private CACHE = {};

    constructor(public http: HttpClient) {
    }

    getSVG(path: string) {
        let parser = new DOMParser();
        if (!this.CACHE[path]) {
            const observable = this.http.get(path, {responseType: "text"})
                .pipe(publishReplay(1), refCount());
            observable.subscribe(dataSVG => {
                const div = document.createElement("div");
                let html = parser.parseFromString(dataSVG, "text/html");
                div.appendChild(html.body.firstChild);
                div.style.display = "none";
                document.body.appendChild(div);
            });
            this.CACHE[path] = observable;
        }
        return this.CACHE[path];
    }
}
