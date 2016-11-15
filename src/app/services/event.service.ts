import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {MyEvent} from "../entity/event";
import {LoginService} from "./login.service";

import {SETTINGS} from '../../app/app.settings';
import {localStorageService} from "./localstorage.service";

declare var Ical_parser: any;


@Injectable()
export class EventService {

    constructor(private http: Http) {}

    private static TIME_EXPIRATION : number = 12*60*60*1000;
    private static EVENT_ID : string = 'events';
    private static GOOGLE_EVENT_ID : string = 'google_events';

    events : MyEvent[] = [];



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
    public loadLocalEvents(){
        var evts = localStorageService.getItem(EventService.EVENT_ID);

        if(evts && evts.events){

            this.events.concat(evts.events);


            return evts.expired >= Date.now();
        }else{
            return false;
        }
    }

    /**
     * Load the events from localstorage
     */
    public loadLocalGoogleEvents(){
        var evts = localStorageService.getItem(EventService.EVENT_ID);

        if(evts && evts.events){
            this.events.concat(evts.events);

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
    public handleDevinciEvents(evts):void {

        var events:MyEvent[] = [];

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

        }

        this.events.concat(events);

        // Set the localstorage value
        localStorageService.setItem(EventService.EVENT_ID, {
            events: events,
            expired: Date.now() + EventService.TIME_EXPIRATION,
        });

    }

    public handleGoogleEvents(evts):void {

        var events:MyEvent[] = [];


        for (var i = 0; i < evts.length; i++) {

            var evt = evts[i];
            var event = new MyEvent();

            if(evt.start && evt.end) {
                var start = new Date(evt.start.dateTime);
                var end = new Date(evt.end.dateTime);

                event.title = evt.summary;
                event.start = start;
                event.end = end;
                event.location = evt.LOCATION;
                event.prof = evt.description ? '' : evt.description;

                events.push(event);
            }

        }

        this.events.concat(events);

        // Set the localstorage value
        localStorageService.setItem(EventService.GOOGLE_EVENT_ID, {
            events: events,
            expired: Date.now() + EventService.TIME_EXPIRATION,
        });

    }
}
