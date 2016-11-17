import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {GoogleCalendarService} from "../../app/services/gcalendar.service";
import {EventService} from "../../app/services/event.service";


@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    gcal: GoogleCalendarService;
    weekend: boolean = false;

    constructor(public navCtrl: NavController, gcal: GoogleCalendarService, public eventService : EventService) {
        this.gcal = gcal;
    }


    googlelogin(): void {
        this.gcal.login();
    }

    displayWeekend() : void {
        console.log(this.weekend);
    }


    /**
     * Load google calendar
     *
     * @param response
     */
    loadgCalendar(response) : void{

        var $this = this;

        $this.eventService.loadGoogleEvents();

    }

}
