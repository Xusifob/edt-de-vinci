import { Component, Input } from '@angular/core';
import { User } from '../../app/entity/user';
import { LoginService } from '../../app/services/login.service';
import { LoginPage } from '../login/login';
import { NavController } from 'ionic-angular';
import { localStorageService } from '../../app/services/localstorage.service';


@Component({
    selector: 'page-login',
    template: ''
})
export class LogoutPage {

    constructor(public navCtrl: NavController) {
        localStorageService.removeItem(LoginService.student_id);
        this.navCtrl.push(LoginPage);
    }
}
