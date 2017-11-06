import { Component, Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ContentHeaders } from './Headers';

import { SessionService } from './SessionService';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

//import { Application } from '../Layouts/Application';

//import { SessionService } from './SessionService';

@Injectable()
export class ClientAPIService {
    private CLIENTAPISERVICE_BASEURL: string;
    private CLIENTAPISERVICE_APPLICATIONS: string;
    private CLIENTAPISERVICE_GETWORKBOOKGROUPSLIST: string;
    private CLIENTAPISERVICE_GETWORKBOOKLIST: string;

    private _http: Http;

    constructor(http: Http, private _SessionService : SessionService) {
        this._http = http;
    }

    public GetApplications = (userName, ClientAPIServiceURL): Observable<Response> => {
      //  console.log("Inside method GetApplications");
      //  console.log("API URL: " + this.CLIENTAPISERVICE_APPLICATIONS + userName);
        this.CLIENTAPISERVICE_BASEURL = ClientAPIServiceURL;
        this.CLIENTAPISERVICE_APPLICATIONS = this.CLIENTAPISERVICE_BASEURL + "BlueSkyReports/applications/";

        return this._http.get(this.CLIENTAPISERVICE_APPLICATIONS + userName, { headers: ContentHeaders })
            .map(Response => Response.json())
            .catch(this.HandleError);
    }

    public GetWorkbookGroupsList = (userName, application, ClientAPIServiceURL): Observable<Response> => {
        console.log("Inside method GetWorkbookGroupsList");
        this.CLIENTAPISERVICE_BASEURL = ClientAPIServiceURL;
        this.CLIENTAPISERVICE_GETWORKBOOKGROUPSLIST = this.CLIENTAPISERVICE_BASEURL + "BlueSkyReports/groups/";
        console.log("API URL: " + this.CLIENTAPISERVICE_GETWORKBOOKGROUPSLIST + userName + "/" + application);

        return this._http.get(this.CLIENTAPISERVICE_GETWORKBOOKGROUPSLIST + userName + "/" + application, { headers: ContentHeaders })
            .map(Response => Response.json())
            .catch(this.HandleError);
    }

    public GetWorkbookListByGroup = (userName, application, reportgroup, ClientAPIServiceURL): Observable<Response> => {
        //console.log("Inside method GetWorkbookListByGroup");
       
        this.CLIENTAPISERVICE_BASEURL = ClientAPIServiceURL;
        this.CLIENTAPISERVICE_GETWORKBOOKLIST = this.CLIENTAPISERVICE_BASEURL + "BlueSkyReports/reportsbygroup/";
        console.log("GetWorkbookListByGroup API URL: " + this.CLIENTAPISERVICE_GETWORKBOOKLIST + userName + "/" + application + "/" + reportgroup);
        return this._http.get(this.CLIENTAPISERVICE_GETWORKBOOKLIST + userName + "/" + application + "/" + reportgroup, { headers: ContentHeaders })
            .map(Response => Response.json())
            .catch(this.HandleError);
    }

    private HandleError(error: any) {
        console.log("Inside HandleError of ClientAPIService");
        this._SessionService.ERROR_MESSAGE = "Error occurred in Client API Service. Error : " + error;
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
