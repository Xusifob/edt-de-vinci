import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginService } from '../../app/services/login.service';
import { EventService } from '../../app/services/event.service';
import { LoginPage } from '../login/login';
import {  MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MyEvent } from '../../app/entity/event';

import {SETTINGS} from '../../app/app.settings';


import { SchedulerComponent } from '../../app/components/schedule/schedule.component'
import {localStorageService} from "../../app/services/localstorage.service";

declare var Ical_parser: any;


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage implements OnInit {

  events:any [];
  resources:any[];
  private static TIME_EXPIRATION : number = 12*60*60*1000;
  private static EVENT_ID : string = 'events';
  private static TIMEZONE : string = 'Europe/Paris';


  constructor(public navCtrl:NavController, menu:MenuController, private http:Http) {


    menu.enable(true);


    if (!LoginService.isConnected()) {
      this.navCtrl.push(LoginPage);
    }

  }

  ngOnInit() {

    var $this = this;

    // Load from localstorage first
    if(!this.loadLocalEvents()) {
      this.getEvents().then(function (data) {
        $this._handleEvents(data);
      });
    }
  }

  /**
   * Get the events from the server
   * @returns {Promise<T>}
     */
  getEvents() {
    return new Promise((resolve, reject) => {
      var id = LoginService.getId();
      var ical = new Ical_parser(SETTINGS.API_URL + '?id=' + id);

      ical.then(function(cal){

            if(cal.response == 200){
              resolve(cal.getEvents())
            }else{
              reject(cal);
            }
          })
          .catch(function(e){
            console.log(e);
          })
      ;
    });

  }

  /**
   * Load the events from localstorage
   */
  loadLocalEvents(){
    var evts = localStorageService.getItem(CalendarPage.EVENT_ID);

    if(evts && evts.events){
      this.events = evts.events;

      return evts.expired >= Date.now();
    }else{
      return false;
    }
  }


  /**
   *
   * @param evts
   * @private
   */
  _handleEvents(evts):void {

    var events : MyEvent[] = [];

    for (var i = 0; i < evts.length; i++) {

      var evt = evts[i];



      var start = new Date(evt.DTSTART);
      var end = new Date(evt.DTEND);

      var event = new MyEvent();
      event.title = evt.TITLE;
      event.start = start;
      event.end = end;
      event.location = evt.LOCATION;
      event.prof = evt.PROF == '' ? '' : evt.PROF;

      events.push(event);

      this.events = events;

      // Set the localstorage value
      localStorageService.setItem(CalendarPage.EVENT_ID,{
        events : events,
        expired : Date.now() + CalendarPage.TIME_EXPIRATION,
      });


    }
  }
}