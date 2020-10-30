import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestFactory<T> {

    protected path: string;
    private URI: string;

    constructor(public httpClient: HttpClient, endpoint: string) {
        this.URI = endpoint;
    }

    public get(header?: any): Observable<any> {
        return this.httpClient.get(this.URI, {headers: header});
    }
    public post(data: T | T[], header?: any): Observable<any> {
        return this.httpClient.post(this.URI, JSON.stringify(data), {headers: header});
    }
}
