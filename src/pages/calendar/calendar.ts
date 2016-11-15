import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginService } from '../../app/services/login.service';
import { LoginPage } from '../login/login';
import {  MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MyEvent } from '../../app/entity/event';

import {SETTINGS} from '../../app/app.settings';

import { MenuComponent } from '../../app/components/menu.component';

import { EventService } from '../../app/services/event.service';
import { SchedulerComponent } from '../../app/components/schedule/schedule.component'
import {localStorageService} from "../../app/services/localstorage.service";
import {GoogleCalendarService} from "../../app/services/gcalendar.service";


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage implements OnInit {

  events:any [];
  resources:any[];

  menu: MenuComponent;
  eventSevice : EventService;
  gcal : GoogleCalendarService;

  constructor(public navCtrl:NavController, private http:Http, eventSevice : EventService, gcal : GoogleCalendarService) {

   this.eventSevice = eventSevice;
    this.gcal = gcal;

    console.log(eventSevice);

    if (!LoginService.isConnected()) {
      this.navCtrl.push(LoginPage);
    }

  }

  ngOnInit() {


    var $this = this;

    // Load from localstorage first
    if(!this.eventSevice.loadLocalEvents()) {
      this.eventSevice.getEvents().then(function (data) {
        $this.eventSevice.handleDevinciEvents(data);
      });
    }
    if(!this.eventSevice.loadLocalGoogleEvents()){
      this.gcal.loadCalendar().then(function(response){
        this.eventSevice.handleGoogleEvents(response.result.items)
      })
    }
  }
}