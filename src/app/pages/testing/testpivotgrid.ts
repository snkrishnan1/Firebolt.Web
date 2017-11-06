import { Component, NgModule } from '@angular/core';
//import { IgPivotGridComponent, IgPivotDataSelectorComponent } from "../../src/igniteui.angular2";
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { SlideOut } from './SlideOut.ts';
import { AfterViewInit, ElementRef, Inject, Input, Renderer, ViewChild } from '@angular/core';
import { PivotGrid } from '../pivotgrid/pivotgrid';
//import { TabsTemplateLabelExample } from './TabsTemplateLabelExample';
//import { InfraPivotGrid } from './InfraPivotGrid.ts'
//import { SessionService } from './SessionService.ts';
//import { CORE_DIRECTIVES } from '@angular/common';
import { PlatformLocation } from '@angular/common';

declare var jQuery: any;

@Component({
  selector: 'TestPivotGrid',
  templateUrl: "./testpivotgrid.html"
})
export class TestPivotGrid {
  //private optsGrid: IgPivotGrid;
  private gridId: string;
  private data: any;
  private result: any;
  selected: any;
  workbookSheet: any;
  //@ViewChild(PivotGrid) pivotGrid: PivotGrid;
  workbookSheetsList: any;
  Report1ID: any;
  Report2ID: any;
  constructor(platformLocation: PlatformLocation) {
    this.workbookSheet = [{ "name": "" }];//Prepopulate the dropdown with empty while loading, then it is assigned with the actual value
    this.selected = this.workbookSheet;

    this.workbookSheetsList = [{ "name": "TestReport" }, { "name": "SimpleReport" }, { "name": "Highlighting" }, { "name": "CalculatedColumns" }, { "name": "DateFormat" }, { "name": "KPIIndicator" }];
    this.Report1ID = "SimpleReport";
    this.Report2ID = "Highlighting";

    console.log("platformLocation");
    console.log((platformLocation as any).location);
    console.log((platformLocation as any).location.href);
    console.log((platformLocation as any).location.origin);
  }

  //onChange(workbook: any) {
  //  console.log("onChange event in Workbook");
  //  console.log(workbook);
  //  this.ReportID = workbook.name;
  //  //this.pivotGrid.LoadInfraPivotGrid();
  //  this.selected.name = workbook.name;
  //}



}
