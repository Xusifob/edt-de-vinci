import { Component, Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { LogoutPage } from '../../pages/logout/logout';
import { CalendarPage } from "../../pages/calendar/calendar";
import { SettingsPage } from '../../pages/settings/settings';
import {ColorsPage} from "../../pages/colors/colors";
import { MenuController } from 'ionic-angular';


@Injectable()
export class MenuService {

    private _title: string = 'Calendrier';

    constructor() {
    }

    get title():string {
        return this._title;
    }


    set title(value:string) {
        this._title = value;
    }
}