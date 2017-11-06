import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomFormsModule} from 'ng2-validation';
import {
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentFileModule,
  CovalentMediaModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule
} from '@covalent/core';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {MenuPageComponent} from './pages/menu-page/menu-page.component';
import {TabPageComponent} from './pages/tab-page/tab-page.component';
import {SidenavPageComponent} from './pages/sidenav-page/sidenav-page.component';
import {FileUploadPageComponent} from './pages/file-upload-page/file-upload-page.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {SignUpPageComponent} from './pages/sign-up-page/sign-up-page.component';
import {SidemenuModule} from './sidemenu/sidemenu.module';
import {ResizeModule} from './resize/resize.module';
import {AppRoutesModule} from './routes/app-routes.module';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  PortalModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularEchartsModule} from 'ngx-echarts';
//import { MultiLanguagePageComponent } from './pages/multi-language-page/multi-language-page.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {OverlayModule} from "@angular/cdk/overlay";

import { FlexmonsterPivot } from "./pages/pivotgrid/flexmonster.angular4";
import { PivotGrid } from './pages/pivotgrid/PivotGrid'
import { WidgetConfigService } from './pages/pivotgrid/WidgetConfigService';
import { Workbook } from './pages/pivotgrid/Workbook';
import { StorybookComponent } from './pages/storybook/storybook.component';
import { TestPivotGrid } from './pages/testing/TestPivotGrid';

import { SessionService } from './Services/SessionService';
import { SecurityService } from './Services/SecurityService';
import { ConfigurationService } from './Services/ConfigurationService';


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

// AoT requires an exported function for factories for translate module
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent, MainPageComponent, PageNotFoundComponent, DashboardPageComponent,
    MenuPageComponent, TabPageComponent, SidenavPageComponent, FileUploadPageComponent,
    LoginPageComponent, SignUpPageComponent,
    Workbook, PivotGrid, FlexmonsterPivot, StorybookComponent, TestPivotGrid
  ],
  entryComponents: [
    //DialogExampleComponent, CartButtonComponent
  ],
  providers: [WidgetConfigService, SessionService, SecurityService, ConfigurationService],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdCheckboxModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    OverlayModule,
    PortalModule,
    SidemenuModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    FlexLayoutModule,
    ReactiveFormsModule,
    CustomFormsModule,
    AngularEchartsModule,
    CovalentMediaModule,
    CovalentFileModule,
    CovalentStepsModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    ResizeModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule,
    AppRoutesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
