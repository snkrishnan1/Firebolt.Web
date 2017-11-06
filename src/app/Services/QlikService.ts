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
export class QlikService {
    private QLIKSERVICE_BASEURL: string;
    // private QLIKSERVICE_APPLICATIONS: string;
    private QLIKSERVICE_GETAPPLIST: string;
    private QLIKSERVICE_GETSHEETSLIST_BY_APPID: string;
    private QLIKSERVICE_GETDASHBOARDDETAILS: string;
    private QLIKSERVICE_GETQLIKTICKET: string

    private _http: Http;
    private data: any;
    observable: any;

    constructor(http: Http, private _SessionService: SessionService) {
        this._http = http;
    }

    public GetQlikDashbaordDetails(QlikServiceURL) {
        if (this._SessionService.QlikDashbaordDetails) {
            console.log("Qlik data is available in Cache, hence taking it from Local Cache only");
            console.log(this._SessionService.QlikDashbaordDetails);

            return this._SessionService.QlikDashbaordDetails;
        }
        else {
            console.log("Qlik data is Not available in Cache, hence calling the Qlik service");
            this._SessionService.ERROR_MESSAGE = "Retrieving data from Dashboard, Please wait...";

            this.GetData(QlikServiceURL)
                .subscribe(
                (res) => {
                    this._SessionService.ClearErrorMessage();
                    this._SessionService.QlikDashbaordDetails = res;

                    if (!this._SessionService.QlikDashbaordDetails)
                        this._SessionService.ERROR_MESSAGE = "Error in Dashboard Service, couldn't retreive dashboard data...";
                    else
                        console.log(this._SessionService.QlikDashbaordDetails);
                }
            );
            return this.observable;
        }
    }

    private GetData = (QlikServiceURL): Observable<Response> => {
        console.log("In GetData of QlikService");
        this.QLIKSERVICE_BASEURL = QlikServiceURL;
        this.QLIKSERVICE_GETDASHBOARDDETAILS = this.QLIKSERVICE_BASEURL + "dashboard";

        var contentHeaders = new Headers();
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append("domain", this._SessionService.QlikDomain);
        contentHeaders.append("user", this._SessionService.LoggedInUser);

        return this._http.get(this.QLIKSERVICE_GETDASHBOARDDETAILS, { headers: contentHeaders })
            .map(Response => Response.json())
            .catch(this.HandleError);
    }

    public GenerateQlikTicket = (QlikServiceURL): Observable<Response> => {
        console.log("In GetData of QlikService");
        this.QLIKSERVICE_BASEURL = QlikServiceURL;
        this.QLIKSERVICE_GETQLIKTICKET = this.QLIKSERVICE_BASEURL + "QlikTicket";

        console.log(this.QLIKSERVICE_GETQLIKTICKET);

        var contentHeaders = new Headers();
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append("domain", this._SessionService.QlikDomain);
        contentHeaders.append("user", this._SessionService.LoggedInUser);

        return this._http.get(this.QLIKSERVICE_GETQLIKTICKET, { headers: contentHeaders })
            .map(Response => Response.json())
            .catch(this.HandleError);
    }

    private HandleError(error: any) {
        console.log("Inside HandleError of QlikService");
        //this._SessionService.ERROR_MESSAGE = "Error occurred in Dashboard Service, couldn't retreive dashboard data. Error : " + error ;
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        //return Observable.throw("Error occurred in Dashboard Service, couldn't retreive dashboard data. " + error + ". " + errMsg);
        if (error.status == 500)
            return Observable.throw("No Dashboards found for this User.");
        else
            return Observable.throw(errMsg);
    }

}