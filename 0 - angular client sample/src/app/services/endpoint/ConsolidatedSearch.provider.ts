
import { RequestFactory } from './request.factory';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConsolidatedSearchProvider extends RequestFactory<{}> {

    constructor(http: HttpClient) {
        super(http, environment.csearchRestAPIURL);
    }
}
