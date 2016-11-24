import { Injectable } from '@angular/core';
import {TranslateService} from "ng2-translate";


@Injectable()
export class MenuService {

    private _title: string = 'Calendrier';

    private _page : string;

    private translate;

    constructor(translate: TranslateService) {
    this.translate = translate;

    }

    get title():string {
        return this._title;
    }


    set title(value:string) {

        this.translate.get(value).subscribe(
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