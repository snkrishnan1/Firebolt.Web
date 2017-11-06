import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { routerAnimation } from '../../utils/page.animation';

import { SessionService } from '../../Services/SessionService';
import { SecurityService } from '../../Services/SecurityService';
import { ConfigurationService } from '../../Services/ConfigurationService';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [routerAnimation]
})
export class LoginPageComponent implements OnInit {
  // Add router animation
  AppConfig: any;
  IsInvalidCredentials: Boolean;

  @HostBinding('@routerAnimation') routerAnimation = true;
  constructor(private router: Router,
    private _SecurityService: SecurityService,
    private _SessionService: SessionService,
    //private _ClientAPIService: ClientAPIService,
    private _ConfigurationService: ConfigurationService) {
    //console.log("Reading _ConfigurationService ");
    
    this.IsInvalidCredentials = false;

    this._ConfigurationService.getConfiguration()
      .subscribe(
      (res) => {
        this.AppConfig = res;
        //console.log("after reading getConfiguration in LoginPageComponent");
        //console.log(this.AppConfig);
        //console.log(this.AppConfig.SecurityService);
        //console.log(this.AppConfig.CacheService);

        this._SessionService.SecurityServiceURL = this.AppConfig.SecurityService;
        this._SessionService.CacheServiceURL = this.AppConfig.CacheService;
        this._SessionService.ClientAPIServiceURL = this.AppConfig.ClientAPIService;
        this._SessionService.WidgetConfigServiceURL = this.AppConfig.WidgetConfigService;
        this._SessionService.QlikServiceURL = this.AppConfig.QlikService;
        this._SessionService.QlikDomain = this.AppConfig.QlikDomain;
      }
    );
  }

  ngOnInit() {
  }

  /**
   * Login method
   * @param login
   * @param password
   */
  login (login, password) {
    //this.router.navigateByUrl('/main/dashboard');
    debugger;
    console.log("In Login method of Login Component");

    this._SecurityService.Login(login, password, this.AppConfig.SecurityService).subscribe((result) => {
      if (result.taskResult) {
        console.log("Login successfull in Login component: ");
        //   console.log(result);
        this._SessionService.SecurityServiceURL = this.AppConfig.SecurityService;
        console.log("reading from session : this._SessionService.SecurityServiceURL " + this._SessionService.SecurityServiceURL);

        this._SessionService.LoggedInUser = login;
        this._SessionService.Company = "Mindtree";

        //this._QlikService.GetQlikDashbaordDetails(this._SessionService.QlikServiceURL);

        //this.GetApplication(login);
        console.log("After redirecting to Dashboard component from Login");

        this.router.navigateByUrl('/main/dashboard');

        //console.log("Read from session :   this._SessionService.LoggedInUser " + this._SessionService.LoggedInUser);
      }
      else {
        this.IsInvalidCredentials = true;
        console.log("IsInvalidCredentials : " + this.IsInvalidCredentials);
        console.log("Login Failed in Login component");
      }
    });

  }
}
