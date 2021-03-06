import { Component } from '@angular/core';
import { User } from '../../app/entity/user';
import { LoginService } from '../../app/services/login.service';
import { CalendarPage } from '../calendar/calendar.page';
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

        if(typeof window['analytics'] !== 'undefined') {
            window['analytics'].trackView("Login Page");
        }
    }



    /**
     * Called during login
     */
    doLogin(){

        var $this = this;

        this.inLogin = true;
        this.Login.login(this.user).then(function(data){
            $this.redirect();
            $this.inLogin = false;
        }).catch(function(message){
            $this.inLogin = false;
        })
    }

    public redirect(): void {
        if(LoginService.isConnected()){
            this.navCtrl.push(CalendarPage);
        }
    }

}
