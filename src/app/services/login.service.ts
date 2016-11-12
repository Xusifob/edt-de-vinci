import { Injectable } from '@angular/core';
import { localStorageService } from './localstorage.service';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

    public static student_id : string = 'student_id';
    loginUrl : string = 'http://localhost/annee_4/projects/edt-de-vinci/api/login.php';
    private headers = new Headers({'Content-Type': 'application/json'});


    constructor(private http: Http) { }

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
        return this.http.post(this.loginUrl, {
                pass: user.pass,
                login: user.login,
            }, {headers: this.headers})
            .toPromise()
            .then(function(response){
                var data = response.json();

                console.log(data);

                if(data.id){
                    localStorageService.setItem(LoginService.student_id,data.id);
                }

                return data;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}