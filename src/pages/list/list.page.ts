import { Component, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NavController } from 'ionic-angular';

import { LoginService } from '../../app/services/login.service';
import { EventService } from '../../app/services/event.service';
import {GoogleCalendarService} from "../../app/services/gcalendar.service";

import { LoginPage } from '../login/login';
import {MyEvent} from "../../app/entity/event";
import {MenuService} from "../../app/services/menu.service";


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage implements OnInit {

  events:any [];

  eventSevice : EventService;
  gcal : GoogleCalendarService;
  eventList : MyEvent[] = [];
  currentDate = '';

  constructor(public navCtrl:NavController, private http:Http, eventSevice : EventService, gcal : GoogleCalendarService,menu : MenuService) {

    menu.title = 'LIST_PAGE';

    this.eventSevice = eventSevice;
    this.gcal = gcal;

    if (!LoginService.isConnected()) {
      this.navCtrl.push(LoginPage);
    }

    if(typeof window['analytics'] !== 'undefined') {
      window['analytics'].trackView("List Page");
    }

  }

  ngOnInit() {
    var $this = this;

    // Load from localstorage first
    if(!$this.eventSevice.loadLocalEvents()) {
      $this.eventSevice.loadEvents();
      $this.getEventsForList();
    }

    $this.eventSevice.loadPhoneEvents();
    $this.getEventsForList();
  }


  /**
   * Create the events in the list
   */
  getEventsForList() : void {
    var evts : MyEvent[] = [];

    for(var i = 0; i < this.eventSevice.events.length;i++){
      var evt =  this.eventSevice.events[i];

      if(new Date(evt.end).getTime() > new Date().getTime()){
        evts.push(evt);
      }
    }
    this.eventList = evts;
  }


  displayDate(event,replace) : string|boolean{

    var evtDate = new Date(event.start).toDateString();
    if(!this.currentDate) {
      this.currentDate = evtDate;
    }
    if(this.currentDate == evtDate){
      return false;
    }else{
      if(replace)
        this.currentDate = evtDate;
      return new DatePipe('fr').transform(event.start, 'dd MMMM yyyy');
      ;
    }
  }

}