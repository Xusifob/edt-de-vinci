import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import {LoginService} from "./services/login.service";
import {CalendarPage} from "../pages/calendar/calendar";
import { Nav } from 'ionic-angular';

declare var adincube : any;


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav;

  rootPage = LoginPage;

  constructor(platform: Platform) {
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
}
