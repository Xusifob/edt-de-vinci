import { Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';


import {localStorageService} from "../../app/services/localstorage.service";
import {EventService} from "../../app/services/event.service";
import {MenuService} from "../../app/services/menu.service";


@Component({
  selector: 'page-color',
  templateUrl: 'colors.html',
})
export class ColorsPage implements OnInit {

  eventSevice : EventService;

  /**
   * Array of all groups available
   * @type {Array}
   */
  groups : string[] = [];

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
  private _groupColors : Object = {};


  /**
   * Group of colors as an array
   *
   * @type {Array}
   */
  public groupColorArray : Object[] = [];

  constructor(eventSevice : EventService,menu : MenuService) {


    menu.title = 'COLOR_PAGE';

    this.eventSevice = eventSevice;
    var group = localStorageService.getItem(EventService.COLORS_ID);
    if(group != null && typeof group === 'object'){

      this.groupColors = group;

    }

    if(typeof window['analytics'] !== 'undefined') {
      window['analytics'].trackView("Colors Page");
    }
  }

  ngOnInit() {
    var $this = this;

    if(!this.eventSevice.loadLocalEvents()) {
      this.eventSevice.loadEvents().then(function () {
        $this.extractGroups();
      });
    }else{
      $this.extractGroups();
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

    this._groupColors[this.group] = color;
    this.group = '';

    this.updateColors();
  }


  deleteColor(group) : void {

    console.log(group);

    delete this.groupColors[group];

     this.updateColors();

  }


  get groupColors():Object {
    this.updateColorArray();
    return this._groupColors;

  }

  set groupColors(value:Object){

    this._groupColors=value;

    this.updateColorArray();

  }



  private updateColorArray()
  {
    this.groupColorArray =  [];
    for(var key in this._groupColors) {
      this.groupColorArray.push({
        "key" : key,
        "value" : this._groupColors[key],
      });
    }
  }


  /**
   *
   */
  private updateColors(){
    localStorageService.setItem(EventService.COLORS_ID,this.groupColors);

    this.eventSevice.updateColors();
    this.eventSevice.saveEvents();
  }
}