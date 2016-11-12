import { Injectable } from '@angular/core';

@Injectable()
export class localStorageService {

    /**
     * Set a localStorage item
     * @param key
     * @param value
     */
    public static setItem(key,value){
        value = JSON.stringify(value);
        localStorage.setItem(key,value);
    }

    /**
     * Retrieve a localStorage item
     * @param key
     */
    public static getItem(key){
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

}