import { Component, Input } from '@angular/core';
import { User } from '../../app/entity/user';
import { LoginService } from '../../app/services/login.service';
import { CalendarPage } from '../calendar/calendar';
import { NavController } from 'ionic-angular';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    user : User = new User();
    inLogin : boolean = false;

    constructor(private Login: LoginService,public navCtrl: NavController) {
        this.Login = Login;

        this.user.pass = 'bastienmalahieude4e5';
        this.user.login = 'bmalahie';

        this.redirect();

    }


    /**
     * Called during login
     */
    doLogin(){
        this.inLogin = true;
        this.Login.login(this.user).then(function(data){
            this.redirect()
        });
        this.user.pass = '';
    }

    public redirect(): void {
        if(LoginService.isConnected()){
            this.navCtrl.push(CalendarPage);
        }
    }

}
