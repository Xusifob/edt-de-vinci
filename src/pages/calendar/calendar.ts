import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginService } from '../../app/services/login.service';
import { EventService } from '../../app/services/event.service';
import { LoginPage } from '../login/login';
import {  MenuController } from 'ionic-angular';

import { MyEvent } from '../../app/entity/event';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage implements OnInit {

  events: any[];

  header: any;

  event: MyEvent;

  dialogVisible: boolean = false;

  idGen: number = 100;

  constructor(private eventService: EventService, private cd: ChangeDetectorRef, public navCtrl: NavController,menu: MenuController) {

    menu.enable(true);

    if(!LoginService.isConnected()){
      this.navCtrl.push(LoginPage);
    }

  }

  ngOnInit() {
    this.eventService.getEvents().then(events => {this.events = events;});


    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
  }

  handleDayClick(event) {
    this.event = new MyEvent();
    this.event.start = event.date.format();
    this.dialogVisible = true;

    //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
    this.cd.detectChanges();
  }

  handleEventClick(e) {
    this.event = new MyEvent();
    this.event.title = e.calEvent.title;

    let start = e.calEvent.start;
    let end = e.calEvent.end;
    if(e.view.name === 'month') {
      start.stripTime();
    }

    if(end) {
      end.stripTime();
      this.event.end = end.format();
    }

    this.event.id = e.calEvent.id;
    this.event.start = start.format();
    this.event.allDay = e.calEvent.allDay;
    this.dialogVisible = true;
  }

  saveEvent() {
    //update
    if(this.event.id) {
      let index: number = this.findEventIndexById(this.event.id);
      if(index >= 0) {
        this.events[index] = this.event;
      }
    }
    //new
    else {
      this.event.id = this.idGen;
      this.events.push(this.event);
      this.event = null;
    }

    this.dialogVisible = false;
  }

  deleteEvent() {
    let index: number = this.findEventIndexById(this.event.id);
    if(index >= 0) {
      this.events.splice(index, 1);
    }
    this.dialogVisible = false;
  }

  findEventIndexById(id: number) {
    let index = -1;
    for(let i = 0; i < this.events.length; i++) {
      if(id == this.events[i].id) {
        index = i;
        break;
      }
    }

    return index;
  }
}