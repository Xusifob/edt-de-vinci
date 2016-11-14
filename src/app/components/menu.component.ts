import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogoutPage } from '../../pages/logout/logout';
import { CalendarPage } from "../../pages/calendar/calendar";
import { SettingsPage } from '../../pages/settings/settings';

@Component({
    selector: 'edt-menu',
    templateUrl: 'menu.component.html',
})
export class MenuComponent {

    constructor(public navCtrl: NavController) {

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
        }
    }
}