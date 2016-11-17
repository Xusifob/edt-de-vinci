import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogoutPage } from '../../pages/logout/logout';
import { CalendarPage } from "../../pages/calendar/calendar";
import { SettingsPage } from '../../pages/settings/settings';
import {ColorsPage} from "../../pages/colors/colors";

@Component({
    selector: 'edt-menu',
    templateUrl: 'menu.component.html',
})
export class MenuComponent {

    private _title: string;

    constructor(public navCtrl: NavController) {

    }


    get title():string {
        return this._title;
    }


    set title(value:string) {
        this._title = value;
    }

    openPage(page): void {
        switch (page){
            case 'logout' :
                this.navCtrl.push(LogoutPage);
                break;
            case 'calendar' :
                this.navCtrl.push(CalendarPage);
                break;
            case 'settings' :
                this.navCtrl.push(SettingsPage);
                break;
            case 'color' :
                this.navCtrl.push(ColorsPage);
                break;
        }
    }
}