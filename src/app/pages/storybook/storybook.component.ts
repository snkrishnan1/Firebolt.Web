import { Component, HostBinding, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { routerAnimation } from '../../utils/page.animation';
import { PivotGrid } from '../pivotgrid/PivotGrid';

@Component({
  selector: 'story-book',
  templateUrl: './storybook.component.html',
  styleUrls: ['./storybook.component.scss'],
  animations: [routerAnimation]
})
export class StorybookComponent implements OnInit {
  selected: any;
  workbookSheet: any;
  workbookSheetsList: any;
  ReportID: any;

  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;
  // Data for creating tabs
  //tabs = [
  //  {
  //    label: 'Tab 1',
  //    content: 'This is the body of the first tab'
  //  }, {
  //    label: 'Disabled Tab 2',
  //    disabled: true,
  //    content: 'This is the body of the second tab'
  //  }, {
  //    label: 'Tab 3',
  //    extraContent: true,
  //    content: 'This is the body of the third tab'
  //  }, {
  //    label: 'Tab 4',
  //    content: 'This is the body of the fourth tab'
  //  },
  //];
  // Model for selecting tab
  activeTabIndex = 0;
  // Model for adding new tab to exact position
  addTabPosition = 0;
  // Switch to tab after adding a new one
  gotoNewTabAfterAdding = false;
  // Flag for creating next tab with big amount of text
  createWithLongContent = false;
  // Model for tabs
  dynamicTabs = [
    {
      label: 'SimpleReport',
      content: 'This is the body of the first tab'
    }
    //, {
    //  label: 'Tab 2',
    //  //disabled: true,
    //  content: 'This is the body of the second tab'
    //}
    //, {
    //  label: 'Tab 3',
    //  extraContent: true,
    //  content: 'This is the body of the third tab'
    //}, {
    //  label: 'Tab 4',
    //  content: 'This is the body of the fourth tab'
    //},
  ];
  // Observable to create tabs with delay
  asyncTabs: Observable<any>;

  constructor(private router: Router) {

    this.workbookSheet = [{ "name": "" }];//Prepopulate the dropdown with empty while loading, then it is assigned with the actual value
    this.selected = this.workbookSheet;

    this.workbookSheetsList = [{ "name": "TestReport" }, { "name": "SimpleReport" }, { "name": "Highlighting" }, { "name": "CalculatedColumns" }, { "name": "DateFormat" }, { "name": "KPIIndicator" }];
    this.ReportID = "SimpleReport";

    //this.asyncTabs = Observable.create((observer: any) => {
    //  setTimeout(() => {
    //    observer.next(this.tabs);
    //  }, 3000);
    //});
  }
  onChange(workbook: any) {
    console.log("onChange event in Workbook");
    console.log(workbook);
    this.ReportID = workbook.name;
    //this.pivotGrid.LoadInfraPivotGrid();
    this.selected.name = workbook.name;

    this.dynamicTabs.splice(this.addTabPosition, 0, {
      label: workbook.name,
      content: '',
      //extraContent: includeExtraContent
    });
  
  }

  addTab(includeExtraContent: boolean): void {
    this.dynamicTabs.splice(this.addTabPosition, 0, {
      label: 'New Tab ' + (this.dynamicTabs.length + 1),
      content: 'New tab contents ' + (this.dynamicTabs.length + 1),
      //extraContent: includeExtraContent
    });

    if (this.gotoNewTabAfterAdding) {
      this.activeTabIndex = this.addTabPosition;
    }
  }

  deleteTab(tab: any) {
    this.dynamicTabs.splice(this.dynamicTabs.indexOf(tab), 1);
  }

  ngOnInit(): void {
  }

}
