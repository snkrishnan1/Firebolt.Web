import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

///Service class to call REST API
@Injectable()
export class DashboardImageService {
    constructor(private http: Http) {
    }

    getDashboardImages = (): Observable<Response> => {
        console.log("In getDashboardImages of DashboardImageService");
        return this.http.get('../DashboardImages.json').map(res => res.json());
    }

    public Default: any;
    public KPI: any;
    public Overview: any;

    public Trend: any;
    public Sales: any;
    public Summary: any;
    public Planning: any;
}