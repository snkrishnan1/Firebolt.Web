import { Component, SimpleChange, Input } from '@angular/core';
import { FlexmonsterPivot } from "./flexmonster.angular4";
import { WidgetConfigService } from './WidgetConfigService';
//import { Flexmonster } from "./flexmonster";

declare var flexmonster: any;

@Component({
    selector: 'Pivot-Grid',
    templateUrl: `./app.component.html`
})
export class PivotGrid {
    ReportData: any;
    jsonData: any;
    reportDataResult: any;
    @Input() ReportID: any;


    pivotGridCtrl: Flexmonster.Pivot;
    flexmonsterReport: any;

    //Whenever the ReportId changes in the Parent component, this event is triggered because of the Input()
    ngOnChanges(changes: SimpleChange) {
        //console.log("In ngOnChanges of PivotGrid");
        if (changes['ReportID']) {
            console.log("ReportID changed in parent : " + this.ReportID);
            if (this.ReportID != undefined) {

                //Loading the PivotGrid
                this.LoadPivotGrid();
                //console.log("After Loading this.LoadPivotGrid()");

            }
        }
    }

    LoadPivotGrid()
    {
      console.log("In LoadPivotGrid for ReportID : " + this.ReportID);
      if (this.ReportID != undefined) {
        this._WidgetConfigService.GetData(this.ReportID).subscribe(reslt => {
          //console.log("data from Redis Cache");

          debugger;
          var json = JSON.parse(reslt);
          this.reportDataResult = JSON.parse(reslt);
          //console.log("After JSON Parse of cache data");
          //console.log(this.reportDataResult);

          this._WidgetConfigService.GetWidgetConfig(this.ReportID).subscribe(res => {
            //console.log("After subscribe in PopulatePivotGrid - GetData");
            debugger;

            var configData = JSON.parse(res);
            //console.log("configData.rows");
            //console.log(configData.rows);
            //console.log(configData);

            this.flexmonsterReport = {
              "dataSource": {
                "dataSourceType": "json",
                "data": this.reportDataResult
              },
              "slice": {
                //configData.slice
                "rows": configData.rows,
                "columns": configData.columns,
                "measures": configData.measures,
                "expands": configData.expands,
                // "sorting": configData.sorting

              },
              "conditions": configData.conditions,

              "options": {
                ////    "viewType": "grid",
                "showAggregationLabels": false,
                "grid": {
                  "type": "compact",
                  "title": "",
                  "showFilter": true,
                  "showHeaders": true,
                  "fitGridlines": false,

                  "showTotals": true,
                  "showGrandTotals": "on",
                  "showExtraTotalLabels": false,
                  "showHierarchies": true,
                  "showHierarchyCaptions": true,
                  "showReportFiltersArea": true,
                  "pagesFilterLayout": "horizontal"
                },
                //    "chart": {
                //        "type": "line",
                //        "title": "",
                //        "showFilter": true,
                //        "labelsHierarchy": "",
                //        "multipleMeasures": false,
                //        "oneLevel": false,
                //        "autoRange": false,
                //        "reversedAxes": false,
                //        "showLegendButton": false,
                //        "showAllLabels": false,
                //        "showMeasures": true,
                //        "showOneMeasureSelection": true,
                //        "showWarning": true,
                //        "activeMeasure": ""
                //    },
                //    "configuratorActive": false,
                //    "configuratorButton": true,
                //    "configuratorMatchHeight": false,
                // "showAggregations": false,

                //    "showCalculatedValuesButton": true,
                //    "editing": false,
                //"drillThrough": true,
                //"showDrillThroughConfigurator": true,
                //    "sorting": "on",
                //    //"datePattern": "dd/MM/yyyy",
                "datePattern": "MM-dd-YYYY",

              },
              "formats": configData.formats
            };

            this.ReportData = this.flexmonsterReport;
            //console.log("this.ReportData");
            //console.log(this.ReportData);

            this.pivotGridCtrl.setReport(this.flexmonsterReport);

            flexmonster.customizeCell(function (cell: any, data: any) {
              //console.log("In customizeCell");
              if (data.type == "value" && !data.isDrillThrough) {
                if (data.measure) {
                  //console.log(configData);
                  // if (data.measure.uniqueName == "KPI") {
                  if (configData.KPIColumns != undefined) {
                    if (configData.KPIColumns.indexOf(data.measure.uniqueName) !== -1) {
                      debugger;
                      //console.log("In KPI");
                      if (data.value == -1) {
                        cell.text = "<img src='/assets/Images/KPI/" + data.measure.groupName + "/-1.png'>";
                      } else if (data.value == 1) {
                        cell.text = "<img src='/assets/Images/KPI/" + data.measure.groupName + "/1.png'>";
                      } else {
                        cell.text = "<img src='/assets/Images/KPI/" + data.measure.groupName + "/0.png'>";
                      }
                    }
                  }
                }
              }
            })


          });
        });
      }
    }

    

    //customizeCellFunction(cell: string, data: string)
    //{
    //    console.log("Cell");
    //    console.log(cell);
    //    console.log("data");
    //    console.log(data);
    //}

    customizeToolbar(toolbar: any) {
        console.log("In event customizeToolbar");
        console.log(toolbar);
        var tabs = toolbar.getTabs();

    }

    onPivotReady(pivot: Flexmonster.Pivot): void {
        console.log("[ready] FlexmonsterPivot");
        this.pivotGridCtrl = pivot;
        //pivot.setReport( )

        //this._WidgetConfigService.GetData(this.ReportID).subscribe(reslt => {
        //    console.log("data from Redis Cache");

        //    //debugger;
        //    var json = JSON.parse(reslt);
        //    this.reportDataResult = JSON.parse(reslt);
        //    //console.log("After JSON Parse of cache data");
        //    //console.log(this.reportDataResult);

        //    this._WidgetConfigService.GetWidgetConfig(this.ReportID).subscribe(res => {
        //        console.log("After subscribe in PopulatePivotGrid - GetData");
        //        //debugger;

        //        var configData = JSON.parse(res);
        //        console.log("configData.rows");
        //        console.log(configData.rows);
        //        console.log(configData);

        //        this.flexmonsterReport = {
        //            "dataSource": {
        //                "dataSourceType": "json",
        //                "data": this.reportDataResult
        //            },
        //            "slice": {
        //                "rows": configData.rows,
        //                "columns": configData.columns,
        //                "measures": configData.measures,
        //                "expands": configData.expands

        //            },
        //            "options": {
        //                "viewType": "grid",
        //                "grid": {
        //                    "type": "compact",
        //                    "title": "",
        //                    "showFilter": true,
        //                    "showHeaders": true,
        //                    "fitGridlines": false,
        //                    "showTotals": true,
        //                    "showGrandTotals": "on",
        //                    "showExtraTotalLabels": false,
        //                    "showHierarchies": true,
        //                    "showHierarchyCaptions": true,
        //                    "showReportFiltersArea": true,
        //                    "pagesFilterLayout": "horizontal"
        //                },
        //                "chart": {
        //                    "type": "line",
        //                    "title": "",
        //                    "showFilter": true,
        //                    "labelsHierarchy": "",
        //                    "multipleMeasures": false,
        //                    "oneLevel": false,
        //                    "autoRange": false,
        //                    "reversedAxes": false,
        //                    "showLegendButton": false,
        //                    "showAllLabels": false,
        //                    "showMeasures": true,
        //                    "showOneMeasureSelection": true,
        //                    "showWarning": true,
        //                    "activeMeasure": ""
        //                },
        //                "configuratorActive": false,
        //                "configuratorButton": true,
        //                "configuratorMatchHeight": false,
        //                "showAggregations": true,
        //                "showCalculatedValuesButton": true,
        //                "editing": false,
        //                "drillThrough": true,
        //                "showDrillThroughConfigurator": true,
        //                "sorting": "on",
        //                "datePattern": "dd/MM/yyyy",
        //                "dateTimePattern": "dd/MM/yyyy HH:mm:ss",
        //                "saveAllFormats": false,
        //                "showDefaultSlice": true,
        //                "showEmptyData": false,
        //                "defaultHierarchySortName": "asc",
        //                "selectEmptyCells": true,
        //                "showOutdatedDataAlert": false
        //            },
        //            "formats": [
        //                {
        //                    "name": "",
        //                    "thousandsSeparator": " ",
        //                    "decimalSeparator": ".",
        //                    "decimalPlaces": 2,
        //                    "maxSymbols": 20,
        //                    "currencySymbol": "",
        //                    "currencySymbolAlign": "left",
        //                    "nullValue": " ",
        //                    "infinityValue": "Infinity",
        //                    "divideByZeroValue": "Infinity"
        //                }
        //            ]
        //        };

        //        this.ReportData = this.flexmonsterReport;
        //        console.log("this.ReportData");
        //        console.log(this.ReportData);

        //        pivot.setReport(this.flexmonsterReport);

               

        //    });
        //}); 
    }

    constructor(private _WidgetConfigService: WidgetConfigService) {
        this.ReportID = "Report1";

        console.log("In constructor of PivotGrid");
    

    }

}
