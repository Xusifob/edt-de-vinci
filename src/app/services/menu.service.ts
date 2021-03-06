import { Injectable } from '@angular/core';
import {TranslateService} from "ng2-translate";


@Injectable()
export class MenuService {

    private _title: string;

    private _page : string;

    private translate;

    constructor(translate: TranslateService) {
        this.translate = translate;
        this.title = 'calendar';

    }

    get title():string {
        return this._title;
    }


    set title(key:string) {

        if(typeof key == 'undefined')
            return;

        this.translate.get(key).subscribe(
            value => {
                this._title = value;
            }
        );
    }


    get page():string {
        return this._page;
    }

    set page(value:string) {
        this._page = value;
    }
}