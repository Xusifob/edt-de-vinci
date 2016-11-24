import { Injectable } from '@angular/core';
import { localStorageService } from './localstorage.service';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {SETTINGS} from '../../app/app.settings';
import { ToastController } from 'ionic-angular';
import {TranslateService} from "ng2-translate";


@Injectable()
export class LoginService {

    public static student_id : string = 'student_id';

    private headers = new Headers({'Content-Type': 'application/json'});

    private translate : TranslateService;


    constructor(private http: Http,public toastCtrl: ToastController,translate: TranslateService) {
        this.translate = translate;
    }

    /**
     * Return if the user is connected
     * @returns {boolean}
     */
    static isConnected() : boolean{
        return this.getId() !== undefined && this.getId() !== null;
    }


    /**
     *
     * @returns {any}
     */
    static getId() : any{
        return localStorageService.getItem(LoginService.student_id);
    }


    login(user): Promise<Object> {

        var $this = this;

        return this.http.post(SETTINGS.API_URL + 'login.php', {
                pass: user.pass,
                login: user.login,
            }, {headers: this.headers})
            .toPromise()
            .then(function(response){
                var data = response.json();

                if(data.id){
                    localStorageService.setItem(LoginService.student_id,data.id);
                }else{
                    $this.handleError(data);
                }

                return data;
            })
            .catch(this.handleError);
    }

    /**
     * Display the toast error
     * @param error
     */
    private handleError(error: any){

        var $this = this;

        $this.translate.get(error.error).subscribe(
            value => {
                let toast = $this.toastCtrl.create({
                    message: value,
                    duration: 3000
                });
                toast.present();
            }
        );
    }

}