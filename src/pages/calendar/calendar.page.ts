import { Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NavController } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

import { LoginService } from '../../app/services/login.service';
import { EventService } from '../../app/services/event.service';
import {GoogleCalendarService} from "../../app/services/gcalendar.service";

import { LoginPage } from '../login/login';


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage implements OnInit {

  eventService : EventService;
  gcal : GoogleCalendarService;
  defaultDate : any;

  constructor(public navCtrl:NavController, private http:Http, eventService : EventService, gcal : GoogleCalendarService) {

    this.eventService = eventService;
    this.gcal = gcal;

    if (!LoginService.isConnected()) {
      this.navCtrl.push(LoginPage);
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