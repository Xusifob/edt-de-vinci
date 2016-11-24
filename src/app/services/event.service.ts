import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import {LoginService} from "./login.service";
import {localStorageService} from "./localstorage.service";
import {GoogleCalendarService} from "./gcalendar.service";

import {MyEvent} from "../entity/event";
import {SETTINGS} from '../../app/app.settings';
import {TranslateService} from "ng2-translate";
import {Http} from "@angular/http";

declare var Ical_parser: any;


@Injectable()
export class EventService {

    gcal : GoogleCalendarService;
    translate : TranslateService;
    http : Http;

    constructor(gcal : GoogleCalendarService,public toastCtrl: ToastController,translate : TranslateService,http: Http) {
        this.gcal = gcal;
        this.translate = translate;
        this.http = http;
        this.user = localStorageService.getItem(localStorageService.USER);

    }

    private static TIME_EXPIRATION : number = 12*60*60*1000;
    public static EVENT_ID : string = 'events';
    public static GOOGLE_EVENT_ID : string = 'google_events';
    public static COLORS_ID : string = 'colors';

    public is_loading : boolean = false;

    public user;


    events : MyEvent[] = [];
    public g_events : MyEvent[] = [];

    public dv_events : MyEvent[] = [];



    /**
     * Get the events from the server
     * @returns {Promise<T>}
     */
    getDevinciEvents() {
        return new Promise((resolve, reject) => {
            var id = LoginService.getId();
            var ical = new Ical_parser(SETTINGS.DEVINCI_CALENDAR_URL + id);

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
     *
     * @returns {any}
     */
    getBCITEvents(){
        var $this = this;
        return this.http.post(SETTINGS.API_URL + SETTINGS.BCIT_CALENDAR_SUFFIX, {
                pass: this.user.pass,
                login: this.user.login,
                school : this.user.school,
            })
            .toPromise()
            .then(function(response){
                var data = response.json();
                return data.data;
            })
    }


    /**
     * Load the events from localstorage
     */
    public loadLocalEvents(){
        var evts = localStorageService.getItem(EventService.EVENT_ID);

        if(evts && evts.events){

            this.dv_events = evts.events;

            if(this.dv_events.length == 0)
                return false;

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

            if(this.g_events.length == 0)
                return false;

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

        this.is_loading = true;

        var $this = this;

        this.user = localStorageService.getItem(localStorageService.USER);

        switch (this.user.school) {
            case 'devinci' :
                return new Promise((resolve, reject) => {
                    $this.getDevinciEvents().then(function (data) {
                        $this.handleEvents(data,'devinci');
                        resolve();
                    }).catch(function () {
                        catchEror(resolve, reject);
                    });

                });
            case 'bcit' :
                return new Promise((resolve, reject) => {
                    $this.getBCITEvents().then(function (data) {
                        $this.handleEvents(data,'bcit');
                        resolve();
                    }).catch(function () {
                        catchEror(resolve, reject);
                    });
                });
        }


        /**
         * Function used to catch errors
         * @param resolve
         * @param reject
         */
        function catchEror(resolve,reject){
            $this.translate.get('ERROR_FETCH_EVENTS').subscribe(
                value => {
                    let toast = $this.toastCtrl.create({
                        message: value,
                        duration: 3000
                    });
                    toast.present();
                }
            );

            if($this.dv_events.length == 0){
                reject();
            }else{
                resolve();
            }
        }

    }




    /**
     * Load phone events
     */
    public loadPhoneEvents(){
        var $this = this;

        var isSync = localStorageService.getItem(localStorageService.PHONE_SYNC);

        if(!isSync){
            this.events = this.dv_events;
            return;
        }

        if(!window['plugins']) {
            return;
        }

        window['plugins'].calendar.hasReadWritePermission(
            function(result) {
                if(result)
                    $this.gcal.getPhoneEvents().then(function(events){
                        $this.handleEvents(events,'phone');
                    })
            });
    }


    /**
     * Reload the data from calendar
     */
    public reload(){
        this.loadEvents();
       /* if(this.gcal.isGoogleLinked()) {
            this.loadGoogleEvents();
        }*/
        this.loadPhoneEvents();
    }



    /**
     * Create event from BCIT source
     * @param evt
     * @returns {boolean}
     */
    private createEventFromBCIT(evt){
        var start = new Date(evt.start);
        var end = new Date(evt.start);

        if(!this.isInOffset(start))
            return false;

        var event = new MyEvent();
        event.title = evt.title;
        event.start = start;
        event.end = end;
        event.location = evt.location ? evt.location : '';
        event.prof = evt.type ? evt.type : '';

        var event_tmp = JSON.stringify(event);
        event = JSON.parse(event_tmp);
        this.dv_events.push(event);
    }

    /**
     * Create event from Devinci source
     * @param evt
     * @returns {boolean}
     */
    private createEventFromDeVinci(evt){
        var start = new Date(evt.DTSTART);
        var end = new Date(evt.DTEND);

        if(!this.isInOffset(start))
            return false;

        var event = new MyEvent();
        event.title = evt.TITLE;
        event.start = start;
        event.end = end;
        event.location = evt.LOCATION ? evt.LOCATION : '';
        event.prof = evt.PROF ? evt.PROF : '';
    }

    /**
     * Create event from Phone source
     * @param evt
     * @returns {boolean}
     */
    private createEventFromPhone(evt){
        var start = new Date(evt.dtend);
        var end = new Date(evt.dtstart);

        if(!this.isInOffset(start))
            return false;

        var event = new MyEvent();
        event.title = evt.title;
        event.start = start;
        event.end = end;
        event.location = evt.eventLocation ? evt.eventLocation :  '';
        event.prof = '' ; //evt.description ? '' : evt.description;


        this.g_events.push(event);
    }

    /**
     *
     * @param evts
     * @param source
     * @private
     */
    private handleEvents(evts,source):void {

        var $this = this;
        if(evts.length > 0 ) {
            for (var i = 0; i < evts.length; i++) {

                switch (source) {
                    case 'bcit':
                        if(i === 0){
                            this.dv_events = [];
                        }

                        this.createEventFromBCIT(evts[i]);
                        break;
                    case 'devinci':
                        if(i === 0){
                            this.dv_events = [];
                        }
                        this.createEventFromDeVinci(evts[i]);
                        break;
                    case 'phone':
                        if(i === 0)
                            this.g_events = [];
                        this.createEventFromPhone(evts[i]);
                        break;
                }

            }
            this.updateColors();

        }else{
            $this.translate.get('ERROR_NO_EVENT_FOUND').subscribe(
                value => {
                    let toast = $this.toastCtrl.create({
                        message: value,
                        duration: 3000
                    });
                    toast.present();
                }
            );
        }
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

        this.is_loading = false;
    }

    /**
     * Update colors for all the events
     */
    public updateColors(){

        var groupColors = localStorageService.getItem(EventService.COLORS_ID);

        if(groupColors !== null) {
            for (var i = 0; i < this.dv_events.length; i++) {
                var evt = this.dv_events[i];
                if (groupColors[evt.title]) {
                    evt.color = groupColors[evt.title];
                } else {
                    evt.color = new MyEvent().color;
                }
                this.dv_events[i] = evt;
            }
        }

        this.saveEvents();
    }






    /**
     *
     * @param start Date
     */
    isInOffset(start) : boolean{

        var timeStampOffset = SETTINGS.EVENT_OFFSET*30*24*60*60*1000;

        var now = new Date().getTime();

        if(start.getTime() > now + timeStampOffset)
            return false;
        if(start.getTime() < now - timeStampOffset)
            return false;

        return true;
    }


    /* private static GOOGLE_COLORS : Object = {
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
     };*/
    /**
     * Load Normal Events

     public loadGoogleEvents(){

        var $this = this;

        this.getGoogleEvents().then(function (response) {
            $this.handleGoogleEvents(response.result.items);
        });
    }
     */
    /**
     * Handle Google Calendar Events
     * @param evts

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

                if(!this.isInOffset(start))
                    continue;

                event.title = evt.summary;
                event.start = start;
                event.end = end;
                event.location = evt.location ? evt.location : '';
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
     */
}