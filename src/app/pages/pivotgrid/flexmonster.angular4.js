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
var FlexmonsterPivot = (function () {
    function FlexmonsterPivot(el) {
        // events
        this.cellclick = new core_1.EventEmitter();
        this.celldoubleclick = new core_1.EventEmitter();
        this.dataerror = new core_1.EventEmitter();
        this.datafilecancelled = new core_1.EventEmitter();
        this.dataloaded = new core_1.EventEmitter();
        this.datachanged = new core_1.EventEmitter();
        this.fieldslistclose = new core_1.EventEmitter();
        this.fieldslistopen = new core_1.EventEmitter();
        this.filteropen = new core_1.EventEmitter();
        this.fullscreen = new core_1.EventEmitter();
        this.loadingdata = new core_1.EventEmitter();
        this.loadinglocalization = new core_1.EventEmitter();
        this.loadingolapstructure = new core_1.EventEmitter();
        this.loadingreportfile = new core_1.EventEmitter();
        this.localizationerror = new core_1.EventEmitter();
        this.localizationloaded = new core_1.EventEmitter();
        this.olapstructureerror = new core_1.EventEmitter();
        this.olapstructureloaded = new core_1.EventEmitter();
        this.openingreportfile = new core_1.EventEmitter();
        this.querycomplete = new core_1.EventEmitter();
        this.queryerror = new core_1.EventEmitter();
        this.ready = new core_1.EventEmitter();
        this.reportchange = new core_1.EventEmitter();
        this.reportcomplete = new core_1.EventEmitter();
        this.reportfilecancelled = new core_1.EventEmitter();
        this.reportfileerror = new core_1.EventEmitter();
        this.reportfileloaded = new core_1.EventEmitter();
        this.runningquery = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.root = el.nativeElement;
    }
    FlexmonsterPivot.prototype.ngOnInit = function () {
        var _this = this;
        this.flexmonster = window["Flexmonster"]({
            container: this.root.getElementsByTagName("div")[0],
            componentFolder: this.componentFolder,
            width: this.width,
            height: this.height,
            toolbar: this.toolbar,
            licenseKey: this.licenseKey,
            report: this.report,
            global: this.global,
            cellclick: function (cell) { return _this.cellclick.next(cell); },
            celldoubleclick: function (cell) { return _this.celldoubleclick.next(cell); },
            dataerror: function (event) { return _this.dataerror.next(event); },
            datafilecancelled: function (event) { return _this.datafilecancelled.next(event); },
            dataloaded: function (event) { return _this.dataloaded.next(event); },
            datachanged: function (event) { return _this.datachanged.next(event); },
            fieldslistclose: function (event) { return _this.fieldslistclose.next(event); },
            fieldslistopen: function (event) { return _this.fieldslistopen.next(event); },
            filteropen: function (event) { return _this.filteropen.next(event); },
            fullscreen: function (event) { return _this.fullscreen.next(event); },
            loadingdata: function (event) { return _this.loadingdata.next(event); },
            loadinglocalization: function (event) { return _this.loadinglocalization.next(event); },
            loadingolapstructure: function (event) { return _this.loadingolapstructure.next(event); },
            loadingreportfile: function (event) { return _this.loadingreportfile.next(event); },
            localizationerror: function (event) { return _this.localizationerror.next(event); },
            localizationloaded: function (event) { return _this.localizationloaded.next(event); },
            olapstructureerror: function (event) { return _this.olapstructureerror.next(event); },
            olapstructureloaded: function (event) { return _this.olapstructureloaded.next(event); },
            openingreportfile: function (event) { return _this.openingreportfile.next(event); },
            querycomplete: function (event) { return _this.querycomplete.next(event); },
            queryerror: function (event) { return _this.queryerror.next(event); },
            ready: function () { return _this.ready.next(_this.flexmonster); },
            reportchange: function (event) { return _this.reportchange.next(event); },
            reportcomplete: function (event) { return _this.reportcomplete.next(event); },
            reportfilecancelled: function (event) { return _this.reportfilecancelled.next(event); },
            reportfileerror: function (event) { return _this.reportfileerror.next(event); },
            reportfileloaded: function (event) { return _this.reportfileloaded.next(event); },
            runningquery: function (event) { return _this.runningquery.next(event); },
            update: function (event) { return _this.update.next(event); }
        });
    };
    return FlexmonsterPivot;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FlexmonsterPivot.prototype, "toolbar", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FlexmonsterPivot.prototype, "licenseKey", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FlexmonsterPivot.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FlexmonsterPivot.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FlexmonsterPivot.prototype, "componentFolder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FlexmonsterPivot.prototype, "report", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FlexmonsterPivot.prototype, "global", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "cellclick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "celldoubleclick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "dataerror", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "datafilecancelled", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "dataloaded", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "datachanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "fieldslistclose", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "fieldslistopen", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "filteropen", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "fullscreen", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "loadingdata", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "loadinglocalization", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "loadingolapstructure", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "loadingreportfile", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "localizationerror", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "localizationloaded", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "olapstructureerror", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "olapstructureloaded", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "openingreportfile", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "querycomplete", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "queryerror", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "ready", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "reportchange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "reportcomplete", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "reportfilecancelled", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "reportfileerror", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "reportfileloaded", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "runningquery", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FlexmonsterPivot.prototype, "update", void 0);
FlexmonsterPivot = __decorate([
    core_1.Component({
        selector: "fm-pivot",
        template: "<div></div>"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], FlexmonsterPivot);
exports.FlexmonsterPivot = FlexmonsterPivot;
//# sourceMappingURL=flexmonster.angular4.js.map