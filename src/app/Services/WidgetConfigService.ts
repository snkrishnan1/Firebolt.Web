import { Component, Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ContentHeaders } from './Headers';
import { SessionService } from './SessionService';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class WidgetConfigService {
    private WIDGETCONFIGSERVICE_BASEURL: string;
    private WIDGETCONFIGSERVICE_SHEETSBYWORKBOOKID: string;
    private WIDGETCONFIGSERVICE_WIDGETCONFIGURL: string;

    private _http: Http;

    constructor(http: Http, private _SessionService: SessionService) {
        console.log("Constructor of WidgetConfigService");
        this.WIDGETCONFIGSERVICE_BASEURL = _SessionService.WidgetConfigServiceURL;
        this.WIDGETCONFIGSERVICE_SHEETSBYWORKBOOKID = this.WIDGETCONFIGSERVICE_BASEURL + "Workbooks/";
        this._http = http;
    }

    public GetSheetsByWorkbookID = (WorkbookID): Observable<Response> => {
        console.log("Inside method GetSheetsByWorkbookID in WidgetConfigService");
        console.log("API URL: " + this.WIDGETCONFIGSERVICE_SHEETSBYWORKBOOKID + WorkbookID);

        return this._http.get(this.WIDGETCONFIGSERVICE_SHEETSBYWORKBOOKID + WorkbookID, { headers: ContentHeaders })
            .map(Response => Response.json())
            .catch(this.HandleError);
    }

    GetData(requrl: string) {
        console.log("In GetData of WidgetConfigService : " + requrl);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this._http.get(requrl, options)
            .map(res => res.text());
    }

    GetWidgetConfig(reportID: string) {
        console.log("In GetWidgetConfig of WidgetConfigService");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        this.WIDGETCONFIGSERVICE_WIDGETCONFIGURL = this.WIDGETCONFIGSERVICE_BASEURL + reportID;
        console.log("this.WIDGETCONFIGSERVICE_WIDGETCONFIGURL : " + this.WIDGETCONFIGSERVICE_WIDGETCONFIGURL); 
        return this._http.get(this.WIDGETCONFIGSERVICE_WIDGETCONFIGURL, options)
            .map(res => res.text());
    }

    private HandleError(error: any) {
        console.log("Inside HandleError of WidgetConfigService");
        this._SessionService.ERROR_MESSAGE = "Error occurred in WidgetConfig Service. Error : " + error;
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}



