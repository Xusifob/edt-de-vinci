import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate';

import { NavController } from 'ionic-angular';

import {GoogleCalendarService} from "../../app/services/gcalendar.service";
import {EventService} from "../../app/services/event.service";
import {localStorageService} from "../../app/services/localstorage.service";
import {MenuService} from "../../app/services/menu.service";


@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    gcal: GoogleCalendarService;
    weekend: boolean = false;

    constructor(public navCtrl: NavController, gcal: GoogleCalendarService, public eventService : EventService,private menu : MenuService, translate  : TranslateService) {
        this.gcal = gcal;
        this.weekend = localStorageService.getItem(localStorageService.WEEKEND_ID);


        menu.title = 'SETTINGS_PAGE';

        if(typeof window['analytics'] !== 'undefined') {
            window['analytics'].trackView("Settings Page");
        }
    }

    syncPhone(sync): void {
        this.gcal.sync(sync);
        this.eventService.loadPhoneEvents();
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
