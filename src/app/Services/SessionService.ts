import { Component, Injectable } from '@angular/core';

@Injectable()
export class SessionService {

    public LoggedInUser: string;
    public Company: string;
    public SelectedApplication: any;
    public Applications: any;

    //public Domain: any;

    public QlikDashbaordDetails: any;

    public WorkbookGroupname: any;
    public WorkbookName: any;

    public SecurityServiceURL: any;
    public CacheServiceURL: any;
    public ClientAPIServiceURL: any;
    public WidgetConfigServiceURL: any;
    public QlikServiceURL: any;
    public QlikDomain: any;

    public ERROR_MESSAGE: any;//TO DO

    public ClearErrorMessage()
    {
        this.ERROR_MESSAGE = "";
    }

    constructor()
    {
        //this.Domain = "VM-MNDTRE-CLCKD";
    }
}