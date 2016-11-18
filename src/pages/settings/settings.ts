import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {GoogleCalendarService} from "../../app/services/gcalendar.service";
import {EventService} from "../../app/services/event.service";
import {localStorageService} from "../../app/services/localstorage.service";


@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    gcal: GoogleCalendarService;
    weekend: boolean = false;

    constructor(public navCtrl: NavController, gcal: GoogleCalendarService, public eventService : EventService) {
        this.gcal = gcal;
        this.weekend = localStorageService.getItem(localStorageService.WEEKEND_ID);
    }


    googlelogin(): void {
        this.gcal.login();
    }

    displayWeekend($event) : void {
        console.log($event);
        localStorageService.setItem(localStorageService.WEEKEND_ID,$event.checked)
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
