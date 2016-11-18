import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {LoginService} from "./services/login.service";
import {CalendarPage} from "../pages/calendar/calendar";

import { LoginPage } from '../pages/login/login';
import {SettingsPage} from "../pages/settings/settings";
import { LogoutPage } from '../pages/logout/logout';
import {ColorsPage} from "../pages/colors/colors";
import {MenuService} from "./components/menu.component";


declare var adincube : any;


@Component({
  templateUrl: `app.html`
})
export class MyApp {
  @ViewChild(Nav) nav;

  private _title: string;
  rootPage;
  menu;
  menuCtrl;
  login;

  get title():string {
    return this._title;
  }


  set title(value:string) {
    this._title = value;
  }

  constructor(platform: Platform,menuCtrl : MenuController,menu : MenuService) {

    this.menu = menu;
    this.menuCtrl = menuCtrl;
    this.login = LoginService;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if(LoginService.isConnected()){
        this.nav.push(CalendarPage);
      }else{
        this.nav.push(LoginPage);
      }

      try {
        if (adincube) {
          adincube.setAndroidAppKey('b38ae3a5570e413aa3da');
          adincube.banner.show(adincube.banner.Size.BANNER_AUTO, adincube.banner.Position.BOTTOM);


        }
      }catch(e){}

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }


  openPage(page): void {

    switch (page){
      case 'logout' :
        this.nav.push(LogoutPage);
        break;
      case 'calendar' :
        this.nav.push(CalendarPage);
        break;
      case 'settings' :
        this.nav.push(SettingsPage);
        break;
      case 'color' :
        this.nav.push(ColorsPage);
        break;
    }
    this.menuCtrl.close();
  }

}
