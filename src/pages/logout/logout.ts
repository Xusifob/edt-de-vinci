import { Component, Input } from '@angular/core';
import { User } from '../../app/entity/user';
import { LoginService } from '../../app/services/login.service';
import { LoginPage } from '../login/login';
import { NavController } from 'ionic-angular';
import { localStorageService } from '../../app/services/localstorage.service';
import {EventService} from "../../app/services/event.service";
import {GoogleCalendarService} from "../../app/services/gcalendar.service";


@Component({
    selector: 'page-login',
    template: ''
})
export class LogoutPage {

    constructor(public navCtrl: NavController) {
        localStorageService.flush();
        this.navCtrl.push(LoginPage);
    }
}
