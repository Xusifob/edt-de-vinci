import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";



@Component({
    templateUrl: 'popover.html'
})
export class Popover {
    constructor(public viewCtrl: ViewController) {}

    close() {
        this.viewCtrl.dismiss();
    }
}