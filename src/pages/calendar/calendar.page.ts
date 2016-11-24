import { Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NavController } from 'ionic-angular';

import { LoginService } from '../../app/services/login.service';
import { EventService } from '../../app/services/event.service';
import {GoogleCalendarService} from "../../app/services/gcalendar.service";

import { LoginPage } from '../login/login';


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage implements OnInit {

  events:any [];
  resources:any[];
  defaultDate: any;

  eventSevice : EventService;
  gcal : GoogleCalendarService;

  constructor(public navCtrl:NavController, private http:Http, eventSevice : EventService, gcal : GoogleCalendarService) {

   this.eventSevice = eventSevice;
    this.gcal = gcal;

    if (!LoginService.isConnected()) {
      this.navCtrl.push(LoginPage);
    }

    window['analytics'].trackView("Calendar Page");

  }

  ngOnInit() {


    var $this = this;

    // Load from localstorage first
    if(!$this.eventSevice.loadLocalEvents()) {
      $this.eventSevice.loadEvents();
    }

    $this.eventSevice.loadPhoneEvents();

    if(!$this.eventSevice.loadLocalGoogleEvents()){
      if($this.gcal.isGoogleLinked()) {
        $this.eventSevice.loadGoogleEvents();
      }
    }
  }
}