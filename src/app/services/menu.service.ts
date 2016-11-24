import { Injectable } from '@angular/core';


@Injectable()
export class MenuService {

    private _title: string = 'Calendrier';

    private _page : string;

    constructor() {
    }

    get title():string {
        return this._title;
    }


    set title(value:string) {
        this._title = value;
    }


    get page():string {
        return this._page;
    }

    set page(value:string) {
        this._page = value;
    }
}