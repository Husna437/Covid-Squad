import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URLS } from "@cs/consts";

@Injectable()
export class RationDetailsService {
    constructor (private http: HttpClient) {}
    
}