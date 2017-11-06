import {Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'

///Service class to call REST API
@Injectable()
export class GenericService {
    result: Object;

    //Construction
    constructor(private jsonp: Http) {
        //console.log('Task Service created.', http);
    }

    // Make a call to the REST service api
    GetData(requrl: string) {
        console.log("In GetData of GenericService"); 
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.jsonp.get(requrl, options)
            .map(res => res.text());
    }

    GetResponse(requrl: string) {
        console.log("In GetResponse of GenericService"); 

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.jsonp.get(requrl, { headers: headers })
            .map
            (
            res => res.json());
    }
}