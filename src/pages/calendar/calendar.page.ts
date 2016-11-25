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

  eventService : EventService;
  gcal : GoogleCalendarService;

  constructor(public navCtrl:NavController, private http:Http, eventService : EventService, gcal : GoogleCalendarService) {

    this.eventService = eventService;
    this.gcal = gcal;

    if (!LoginService.isConnected()) {
      this.navCtrl.push(LoginPage);
    }

    if(typeof window['analytics'] !== 'undefined') {
      window['analytics'].trackView("Calendar Page");
    }

  }

  ngOnInit() {


    var $this = this;

    // Load from localstorage first
    if(!$this.eventService.loadLocalEvents()) {
      $this.eventService.loadEvents();
    }
    $this.eventService.loadPhoneEvents();


   /* if(!$this.eventService.loadLocalGoogleEvents()){
      if($this.gcal.isGoogleLinked()) {
        $this.eventService.loadGoogleEvents();
      }
    }*/
  }
}