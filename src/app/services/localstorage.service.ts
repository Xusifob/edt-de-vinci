import { Injectable } from '@angular/core';

@Injectable()
export class localStorageService {

    public static WEEKEND_ID = 'weekend';
    public static PHONE_SYNC = 'phone_sync';
    public static USER = 'user';
    public static SETTING_CALENDAR_PAGE = 'calendar_page';

    /**
     * Set a localStorage item
     * @param key
     * @param value
     */
    public static setItem(key,value) : void{
        value = JSON.stringify(value);
        localStorage.setItem(key,value);
    }

    /**
     * Retrieve a localStorage item
     * @param key
     */
    public static getItem(key) : any{
        var value = localStorage.getItem(key);

        try{
            value = JSON.parse(value);
        }catch(e){

        }

        return value;
    }

    public static removeItem(key){
        localStorage.removeItem(key);

    }


    public static flush(){
        localStorage.clear();
    }

}