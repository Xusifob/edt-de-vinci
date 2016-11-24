import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { NavController } from 'ionic-angular';
import { localStorageService } from '../../app/services/localstorage.service';


@Component({
    selector: 'page-login',
    template: ''
})
export class LogoutPage {

    constructor(public navCtrl: NavController) {
        localStorageService.flush();
        if(typeof window['analytics'] !== 'undefined') {
            window['analytics'].trackView("Logout Page");
        }
        this.navCtrl.push(LoginPage);

    }
}
