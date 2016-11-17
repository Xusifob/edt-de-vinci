import { Component, Input } from '@angular/core';
import { User } from '../../app/entity/user';
import { LoginService } from '../../app/services/login.service';
import { CalendarPage } from '../calendar/calendar';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    user : User = new User();
    inLogin : boolean = false;

    constructor(private Login: LoginService,public navCtrl: NavController,public toastCtrl: ToastController) {
        this.Login = Login;

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
            let toast = $this.toastCtrl.create({
                message: message,
                duration: 3000
            });
            toast.present();
        })
    }

    public redirect(): void {
        if(LoginService.isConnected()){
            this.navCtrl.push(CalendarPage);
        }
    }

}
