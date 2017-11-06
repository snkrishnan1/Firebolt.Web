"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WidgetConfigService_1 = require("./WidgetConfigService");
var PivotGrid = (function () {
    function PivotGrid(_WidgetConfigService) {
        this._WidgetConfigService = _WidgetConfigService;
        this.ReportID = "Report1";
        console.log("In constructor of PivotGrid");
    }
    //Whenever the ReportId changes in the Parent component, this event is triggered because of the Input()
    PivotGrid.prototype.ngOnChanges = function (changes) {
        console.log("In ngOnChanges of PivotGrid");
        if (changes['ReportID']) {
            console.log("ReportID changed in parent : " + this.ReportID);
            if (this.ReportID != undefined) {
                //Loading the PivotGrid
                this.LoadPivotGrid();
                console.log("After Loading this.LoadPivotGrid()");
            }
        }
    };
    PivotGrid.prototype.LoadPivotGrid = function () {
        var _this = this;
        this._WidgetConfigService.GetData(this.ReportID).subscribe(function (reslt) {
            console.log("data from Redis Cache");
            //debugger;
            var json = JSON.parse(reslt);
            _this.reportDataResult = JSON.parse(reslt);
            //console.log("After JSON Parse of cache data");
            //console.log(this.reportDataResult);
            _this._WidgetConfigService.GetWidgetConfig(_this.ReportID).subscribe(function (res) {
                console.log("After subscribe in PopulatePivotGrid - GetData");
                debugger;
                var configData = JSON.parse(res);
                console.log("configData.rows");
                console.log(configData.rows);
                console.log(configData);
                _this.flexmonsterReport = {
                    "dataSource": {
                        "dataSourceType": "json",
                        "data": _this.reportDataResult
                    },
                    "slice": {
                        "rows": configData.rows,
                        "columns": configData.columns,
                        "measures": configData.measures,
                        "expands": configData.expands,
                    },
                    //"conditions": configData.conditions,
                    "options": {
                        ////    "viewType": "grid",
                        ////    "grid": {
                        ////        "type": "compact",
                        ////        "title": "",
                        ////        "showFilter": true,
                        ////        "showHeaders": true,
                        ////        "fitGridlines": false,
                        //    "showAggregationLabels": false,
                        //        "showTotals": true,
                        //        "showGrandTotals": "on",
                        ////        "showExtraTotalLabels": false,
                        //        "showHierarchies": true,
                        //        "showHierarchyCaptions": true,
                        //        "showReportFiltersArea": true,
                        //        "pagesFilterLayout": "horizontal"
                        //    },
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
                    //"formats": [
                    //    {
                    //        "name": "",
                    //        "thousandsSeparator": ",",
                    //        "decimalSeparator": ".",
                    //        "decimalPlaces": 2,
                    //        "maxSymbols": 20,
                    //        "currencySymbol": "$",
                    //        "currencySymbolAlign": "left",
                    //        "nullValue": " ",
                    //        "infinityValue": "Infinity",
                    //        "divideByZeroValue": "Infinity"
                    //    }
                    //]
                };
                _this.ReportData = _this.flexmonsterReport;
                console.log("this.ReportData");
                console.log(_this.ReportData);
                _this.pivotGridCtrl.setReport(_this.flexmonsterReport);
                flexmonster.customizeCell(function (cell, data) {
                    console.log("In customizeCell");
                    if (data.type == "value" && !data.isDrillThrough) {
                        if (data.measure) {
                            if (data.measure.uniqueName == "KPI") {
                                console.log("In KPI");
                                if (data.value == -1) {
                                    cell.text = "<img src='Images/StatusArrow/-1.png'>";
                                }
                                else if (data.value == 1) {
                                    cell.text = "<img src='Images/StatusArrow/1.png'>";
                                }
                                else {
                                    cell.text = "<img src='Images/StatusArrow/0.png'>";
                                }
                            }
                        }
                    }
                });
            });
        });
    };
    //customizeCellFunction(cell: string, data: string)
    //{
    //    console.log("Cell");
    //    console.log(cell);
    //    console.log("data");
    //    console.log(data);
    //}
    PivotGrid.prototype.customizeToolbar = function (toolbar) {
        console.log("In event customizeToolbar");
        console.log(toolbar);
        var tabs = toolbar.getTabs();
    };
    PivotGrid.prototype.onPivotReady = function (pivot) {
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
    };
    return PivotGrid;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PivotGrid.prototype, "ReportID", void 0);
PivotGrid = __decorate([
    core_1.Component({
        selector: 'Pivot-Grid',
        templateUrl: "./app.component.html"
    }),
    __metadata("design:paramtypes", [WidgetConfigService_1.WidgetConfigService])
], PivotGrid);
exports.PivotGrid = PivotGrid;
//# sourceMappingURL=PivotGrid.js.map