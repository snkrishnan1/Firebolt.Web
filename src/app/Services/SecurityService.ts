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
export class SecurityService {
    private SECURITYSERVICE_BASEURL: string;
    private SECURITYSERVICE_LOGINVALIDATE : string;

    private _http: Http;
    loggedIn: boolean;
    loginUrl: any;

    constructor(http: Http, private _SessionService: SessionService) {
       // console.log("Constructor of SecurityService");
        //console.log("_SessionService.SecurityServiceURL : " + _SessionService.SecurityServiceURL);
        this.SECURITYSERVICE_LOGINVALIDATE = "login/validate";
        this._http = http;
        this.loggedIn = false;
    }

    public Login(UserName, Password, SecurityServiceURL) {
        this.loginUrl = SecurityServiceURL + this.SECURITYSERVICE_LOGINVALIDATE;;
        console.log("Inside Login method of SecurityService, this.loginUrl : " + this.loginUrl);
        return this._http.post(this.loginUrl, JSON.stringify({ UserName, Password }), { headers: ContentHeaders })
            .map(res => res.json())
            .map((res) =>
            {
                return res;
            })
            .catch(this.HandleError);
    }

    public Logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    private HandleError(error: any) {
        console.log("Inside HandleError of SecurityService");
        this._SessionService.ERROR_MESSAGE = "Error occurred in Cache Data Service. Error : " + error;
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}



