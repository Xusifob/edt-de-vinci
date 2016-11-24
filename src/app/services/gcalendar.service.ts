import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import  { localStorageService } from  './localstorage.service';
import {CordovaOauth, Google} from 'ng2-cordova-oauth/core';


declare var gapi: any;

@Injectable()
export class GoogleCalendarService {
    // constants
    static clientId = '720245788595-7kk06qkj2t5935ns0rthfef9fe4pa524.apps.googleusercontent.com';
    static apiKey = 'AIzaSyDyPOKQbyxz87mJqkhE8eMJJEgQ29WtM6M';
    static scopes = ['https://www.googleapis.com/auth/calendar.readonly'];
    static logoutUrl = 'https://accounts.google.com/o/oauth2/revoke?token=';
    static CALENDAR_ID : string = 'g_calendar';
    public static NOT_CALENDAR = ["Week Numbers","Contacts","Jours fériés en France"];

    public isAuthenticated: boolean = false;

    public is_loaded: boolean = false;

    public calendars : any[] = [];
    public calendar : any = null;

    constructor(private http: Http) {
        // check the authentication silently
        this.http = http;
        var $this = this;

        this.calendar = localStorageService.getItem(GoogleCalendarService.CALENDAR_ID);

        gapi.load('client',function(){
            $this.internalAuthenticate(true);
            $this.is_loaded = true;
        });

    }


    login() {
        this.internalAuthenticate(false);
    }

    logout(){
        this.isAuthenticated = false;
        this.http.get(GoogleCalendarService.logoutUrl + gapi.auth.getToken().access_token);
    }

    private internalAuthenticate(immediate: boolean) {
        if (this.is_loaded) {
            this.proceedAuthentication(immediate)
                .then(() => this.initializeGoogleCalendarAPI())
                .then(() => this.loadGoogleCalendarAPI())
                .then((response:any) => this.handleGoogleCalendarResponse(response))
                .catch((error:any) => {

                });
        }else {
            var $this = this;
            setTimeout(function () {
                $this.internalAuthenticate(immediate);
            }, 500)
        }
    }

    private proceedAuthentication(immediate:boolean){
        return new Promise((resolve, reject) => {

            gapi.client.setApiKey(GoogleCalendarService.apiKey);
            var authorisationRequestData =
            {
                'client_id': GoogleCalendarService.clientId,
                'scope': GoogleCalendarService.scopes,
                'immediate': immediate
            }
            gapi.auth.authorize(authorisationRequestData,
                (authenticationResult) => {
                    if(authenticationResult && !authenticationResult.error){
                        this.isAuthenticated = true
                        resolve()
                    }
                    else {
                        this.isAuthenticated = false
                        reject();
                    }
                }
            );
        });
    }

    private initializeGoogleCalendarAPI(){
        return new Promise((resolve, reject) => {
            resolve(gapi.client.load('calendar', 'v3'));
        });
    }

    private loadGoogleCalendarAPI() {
        return new Promise((resolve, reject) => {
            resolve(gapi.client.calendar.calendarList.list({'userId': 'me'}));
        });
    }

    /**
     * Handle google maps answer
     * @param data
     */
    private handleGoogleCalendarResponse(data){
        for(var i=0;i<data.result.items.length;i++){
            var item = data.result.items[i];

            if(GoogleCalendarService.NOT_CALENDAR.indexOf(item.summary) == -1){
                this.calendars.push(item);

            }
        }
    }


    /**
     * Called by settings Page
     */
    public loadCalendar(): any {

        var $this = this;
        localStorageService.setItem(GoogleCalendarService.CALENDAR_ID, this.calendar);

        var attempts = 0;

        return new Promise((resolve, reject) => {
            var interval = setInterval(function(){

                if($this.is_loaded && gapi.client.calendar && $this.isAuthenticated){
                    clearInterval(interval);
                    gapi.client.calendar.events.list(
                        {calendarId: $this.calendar.id, maxResults: 2500}
                    ).then(function(data){
                        resolve(data);
                    },function(data){
                        reject(data)
                    })
                }else{
                    attempts++;
                    if(attempts > 5){
                        clearInterval(interval);
                        reject({error : "Too many attempts"})
                    }
                }
            },500);
        });
    }

    /**
     * Return if the app is linked to google API
     * @returns {boolean}
     */
    public isGoogleLinked(){
        return this.calendar != null;
    }

}