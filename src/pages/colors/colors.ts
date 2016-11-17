import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginService } from '../../app/services/login.service';
import { LoginPage } from '../login/login';
import {  MenuController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { MyEvent } from '../../app/entity/event';

import { MenuComponent } from '../../app/components/menu.component';

import { EventService } from '../../app/services/event.service';
import { SchedulerComponent } from '../../app/components/schedule/schedule.component';
import { GoogleCalendarService } from "../../app/services/gcalendar.service";
import {localStorageService} from "../../app/services/localstorage.service";


@Component({
  selector: 'page-color',
  templateUrl: 'colors.html',
})
export class ColorsPage implements OnInit {

  menu: MenuComponent;
  eventSevice : EventService;

  /**
   * Array of all groups available
   * @type {Array}
   */
  groups : string[] = [];

  public static COLOR_ID = 'colors';

  /**
   * Selected group
   */
  group : string;

  colors : string[] = [
    '#e51c23',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#03a9f4',
    '#2196F3',
    '#00bcd4',
    '#009688',
    '#4CAF50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#9e9e9e',
    '#607d8b',
  ];

  /**
   * Group of selected color
   * @type {Array}
     */
  groupColors : Object = {};

  constructor(eventSevice : EventService ) {

    this.eventSevice = eventSevice;
    var group = localStorageService.getItem(ColorsPage.COLOR_ID);
    if(group != null && typeof group === 'object'){
      this.groupColors = group;
    }

  }

  ngOnInit() {
    var $this = this;

    if(this.eventSevice.loadLocalEvents()){
      $this.extractGroups();
    }else{
      this.eventSevice.loadEvents().then($this.extractGroups);
    }

  }

  extractGroups() : void {
    for(var i = 0;i<this.eventSevice.dv_events.length;i++){
      var evt = this.eventSevice.dv_events[i];

      if(this.groups.indexOf(evt.title) == -1 && evt.title != ""){
        this.groups.push(evt.title);
      }
    }
  }

  selectColor(color) : void {

    console.log(color);

    this.groupColors[this.group] = color;
    this.group = '';

    this.updateColors();
  }

  deleteColor(group) : void {

    console.log(group);
    console.log(this.groupColors);

    this.groupColors[group] = undefined;

    console.log(this.groupColors);


    this.updateColors();

  }

  private updateColors(){
    for(var i = 0;i<this.eventSevice.dv_events.length;i++) {
      var evt = this.eventSevice.dv_events[i];
      if(this.groupColors[evt.title]){
        evt.color = this.groupColors[evt.title];
      }else{
        evt.color = new MyEvent().color;
      }
      this.eventSevice.dv_events[i] = evt;
    }

    this.eventSevice.saveEvents();
    localStorageService.setItem(ColorsPage.COLOR_ID,this.groupColors);
  }

}