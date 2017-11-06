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

@Injectable()
export class CacheDataService {
    private BLUESKYDATACACHEAPI_BASEURL: string;
    private BLUESKYDATACACHEAPI_GETEXTRACTORQUEUESLATEST: string;
    private BLUESKYDATACACHEAPI_GETEXTRACTORQUEUEBYID: string;
    private BLUESKYDATACACHEAPI_GETEXTRACTORBYID: string;

    private headers: Headers;
    private _http: Http;

    constructor(http: Http, private _SessionService: SessionService) {
        console.log("Constructor of CacheDataService");
        console.log("_SessionService.CacheService : " + _SessionService.CacheServiceURL);
        this.BLUESKYDATACACHEAPI_BASEURL = _SessionService.CacheServiceURL;
        this.BLUESKYDATACACHEAPI_GETEXTRACTORQUEUESLATEST = this.BLUESKYDATACACHEAPI_BASEURL + "extractorqueue/getextractorqueueslatest/";
        this.BLUESKYDATACACHEAPI_GETEXTRACTORQUEUEBYID = this.BLUESKYDATACACHEAPI_BASEURL + "extractorqueue/ExtractorQueueId/";
        this.BLUESKYDATACACHEAPI_GETEXTRACTORBYID = this.BLUESKYDATACACHEAPI_BASEURL + "Extractor/";
        this._http = http;
    }

    public GetExtractorQueuesByID = (queueID): Observable<Response> => {
        console.log("Inside method GetExtractorQueuesByID");
        console.log("API URL: " + this.BLUESKYDATACACHEAPI_GETEXTRACTORQUEUEBYID + queueID);

        return this._http.get(this.BLUESKYDATACACHEAPI_GETEXTRACTORQUEUEBYID + queueID, { headers: ContentHeaders })
            .map(Response => Response.json())
            .catch(this.HandleError);
    }

    public GetExtractorByID = (extractorId): Observable<Response> => {
        console.log("Inside method GetExtractorByID");
        console.log("API URL: " + this.BLUESKYDATACACHEAPI_GETEXTRACTORBYID + extractorId);

        return this._http.get(this.BLUESKYDATACACHEAPI_GETEXTRACTORBYID + extractorId, { headers: ContentHeaders })
            .map(Response => Response.json())
            .catch(this.HandleError);
    }

    private HandleError(error: any) {
        console.log("Inside HandleError of CacheDataService");
        this._SessionService.ERROR_MESSAGE = "Error occurred in Cache Data Service. Error : " + error;
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}