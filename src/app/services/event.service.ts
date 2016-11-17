import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {MyEvent} from "../entity/event";
import {LoginService} from "./login.service";

import {SETTINGS} from '../../app/app.settings';
import {localStorageService} from "./localstorage.service";
import {GoogleCalendarService} from "./gcalendar.service";

declare var Ical_parser: any;


@Injectable()
export class EventService {

    gcal : GoogleCalendarService;

    constructor(private http: Http, gcal : GoogleCalendarService) {
        this.gcal = gcal;

    }

    private static TIME_EXPIRATION : number = 12*60*60*1000;
    public static EVENT_ID : string = 'events';
    public static GOOGLE_EVENT_ID : string = 'google_events';

    private static GOOGLE_COLORS : Object = {
        1 : '#9C27B0',
        2 : '#00BCD4',
        3 : '#009688',
        4 : '#F44336',
        5 : '#FFC107',
        6 : '#FF9800',
        7 : '#2196F3',
        8 : '#CDDC39',
        9 : '#795548',
        10 : '#4CAF50',
    };

    events : MyEvent[] = [];

    public g_events : MyEvent[] = [];

    public dv_events : MyEvent[] = [];



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


    getGoogleEvents() {
        return this.gcal.loadCalendar();
    }


    /**
     * Load the events from localstorage
     */
    public loadLocalEvents(){
        var evts = localStorageService.getItem(EventService.EVENT_ID);

        if(evts && evts.events){

            this.dv_events = evts.events;

            this.events = this.g_events.concat(this.dv_events);


            return evts.expired >= Date.now();
        }else{
            return false;
        }
    }

    /**
     * Load the events from localstorage
     */
    public loadLocalGoogleEvents(){
        var evts = localStorageService.getItem(EventService.GOOGLE_EVENT_ID);

        if(evts && evts.events){

            this.g_events = evts.events;

            this.events = this.dv_events.concat(this.g_events);

            return evts.expired >= Date.now();
        }else{
            return false;
        }
    }

    /**
     * Load Normal Events
     */
    public loadEvents(){
        var $this = this;
        return new Promise((resolve, reject) => {
            $this.getEvents().then(function (data) {
                $this.handleDevinciEvents(data);
                resolve();
            }).catch(function () {
                reject();
            });

        });
    }

    /**
     * Load Normal Events
     */
    public loadGoogleEvents(){

        var $this = this;

        this.getGoogleEvents().then(function (response) {
            $this.handleGoogleEvents(response.result.items);
        });
    }


    /**
     * Reload the data from calendar
     */
    public reload(){
        this.loadEvents();
        if(this.gcal.isGoogleLinked()) {
            this.loadGoogleEvents();
        }
    }


    /**
     *
     * @param evts
     * @private
     */
    private handleDevinciEvents(evts):void {

        this.dv_events =  [];

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

            this.dv_events.push(event);

        }

        this.saveEvents();
    }


    /**
     * Save the events
     */
    public saveEvents(){

        this.events = this.g_events.concat(this.dv_events);

        // Set the localstorage value
        localStorageService.setItem(EventService.EVENT_ID, {
            events: this.dv_events,
            expired: Date.now() + EventService.TIME_EXPIRATION,
        });
    }





    /**
     * Handle Google Calendar Events
     * @param evts
     */
    private handleGoogleEvents(evts):void {

        this.g_events = [];


        for (var i = 0; i < evts.length; i++) {

            var evt = evts[i];
            var event = new MyEvent();

            if(evt.start != null && evt.end != null) {
                var start = new Date(evt.start.dateTime);
                var end = new Date(evt.end.dateTime);

                if(isNaN( start.getTime()) || isNaN( end.getTime()))
                    continue;

                event.title = evt.summary;
                event.start = start;
                event.end = end;
                event.location = evt.location ? '' : evt.location;
                event.prof = '' ; //evt.description ? '' : evt.description;
                if(evt.colorId && EventService.GOOGLE_COLORS[evt.colorId]) {
                    event.color =  EventService.GOOGLE_COLORS[evt.colorId];
                }
                this.g_events.push(event);
            }

        }

        this.events = this.dv_events.concat(this.g_events);

        // Set the localstorage value
        localStorageService.setItem(EventService.GOOGLE_EVENT_ID, {
            events: this.g_events,
            expired: Date.now() + EventService.TIME_EXPIRATION,
        });

    }
}
