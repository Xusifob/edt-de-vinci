import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,MenuController,PopoverController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {TranslateService} from 'ng2-translate';
import { GoogleAnalytics } from 'ionic-native';

import {LoginService} from "./services/login.service";
import {CalendarPage} from "../pages/calendar/calendar.page";
import {localStorageService} from "../../.tmp/app/services/localstorage.service";
import {MenuService} from "./services/menu.service";
import { GoogleAnalyticsService   } from './services/analytics.service';

import { LoginPage } from '../pages/login/login';
import {SettingsPage} from "../pages/settings/settings";
import { LogoutPage } from '../pages/logout/logout';
import {ColorsPage} from "../pages/colors/colors";
import {ListPage} from "../pages/list/list.page";

import {SETTINGS} from './app.settings';
import Popover from "./components/popover/popover";


declare var adincube : any;
declare var AdMob: any;



@Component({
  templateUrl: `app.html`
})
export class MyApp {
  @ViewChild(Nav) nav;
  rootPage;
  menu;
  menuCtrl;
  login;
  platform;
  private admobId: any;
  public analytics;


  constructor(platform: Platform,menuCtrl : MenuController,menu : MenuService,public popoverCtrl: PopoverController,translate: TranslateService, analytics : GoogleAnalyticsService) {

    this.platform = platform;
    this.menu = menu;
    this.menuCtrl = menuCtrl;
    this.login = LoginService;
    this.analytics = analytics;


    platform.ready().then(() => {

      if(LoginService.isConnected()){
        this.setupAdmob();
      }
      this.setupAnalytics();
      this.setupLang(translate);




      //this.setupAdnicube();
      this.setCompatibility();


      if(LoginService.isConnected()){
        this.menu.page = 'calendar';
        this.nav.push(ColorsPage);
      }else{
        this.menu.page = 'login';
        this.nav.push(LoginPage);
      }


      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openLeftMenu($event) {
    let popover = this.popoverCtrl.create(Popover);
    popover.present({
      ev: $event
    });
  }

  private setupAdmob(){
    if(/(android)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-8562731504945062/3548149438',
        interstitial: 'ca-app-pub-6869992474017983/1657046752'
      };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-8562731504945062/3548149438',
        interstitial: 'ca-app-pub-6869992474017983/1657046752'
      };
    }

    this.createBanner();
  }

  private setupAnalytics(){

    this.analytics.trackView('Launch App');

   // if(window['analytics']) {
   //   window['analytics'].startTrackerWithId(SETTINGS.ANALYTICS_ID);
   // }
//
   // GoogleAnalytics.debugMode();
   // GoogleAnalytics.startTrackerWithId(SETTINGS.ANALYTICS_ID);
//
   // GoogleAnalytics.enableUncaughtExceptionReporting(true)

  }

  private setupAdnicube(){
    try {
      if (adincube) {
        adincube.setAndroidAppKey('b38ae3a5570e413aa3da');
        adincube.banner.show(adincube.banner.Size.BANNER_AUTO, adincube.banner.Position.BOTTOM);
      }
    }catch(e){}
  }


  // Set compatibility with previous version V 0.0.X
  private setCompatibility(){
    var oldId = localStorage.getItem('studentId');
    if(oldId){
      localStorageService.setItem(LoginService.student_id,oldId);
      localStorageService.removeItem('studentId');
    }
  }


  createBanner() {
    if(typeof AdMob !== 'undefined') {
      AdMob.createBanner({
        adId: this.admobId.banner,
        autoShow: false
      },this.showBanner);
    }
  }


  showBanner() {
    AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
  }

  private setupLang(translate){

    translate.setDefaultLang('fr');

    var lang = translate.getBrowserLang();
    translate.use(lang.match(/en|fr/) ? lang : 'fr');
  }


  openPage(page): void {

    this.menu.page = page;

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
      case 'list':
        this.nav.push(ListPage);
        break;
    }
    this.menuCtrl.close();
  }

}
