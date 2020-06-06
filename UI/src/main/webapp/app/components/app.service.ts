/*Service to article manipulation for a cartridge */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class AppService {
    constructor(public http: HttpClient) {}
}