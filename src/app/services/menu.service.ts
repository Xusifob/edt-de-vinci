import { Injectable } from '@angular/core';


@Injectable()
export class MenuService {

    private _title: string = 'Calendrier';

    constructor() {
    }

    get title():string {
        return this._title;
    }


    set title(value:string) {
        this._title = value;
    }
}