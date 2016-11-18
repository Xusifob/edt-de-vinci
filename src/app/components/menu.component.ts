import { Component, Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { LogoutPage } from '../../pages/logout/logout';
import { CalendarPage } from "../../pages/calendar/calendar";
import { SettingsPage } from '../../pages/settings/settings';
import {ColorsPage} from "../../pages/colors/colors";
import { MenuController } from 'ionic-angular';


@Injectable()
export class MenuService {

    private _title: string;

    navCtrl;
    app;


    constructor(app: App,public menuCtrl: MenuController) {
        console.log(app,app.getRootNav(),app.getActiveNav());
        this.navCtrl = app.getActiveNav();
        this.app = app;
    }

    ngOnInit(){
        console.log(this.app,this.app.getRootNav(),this.app.getActiveNav());
        this.navCtrl = this.app.getActiveNav();
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