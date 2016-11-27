import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../test';
import { MyApp }          from '../../src/app/app.component';
import {LoginService} from "./services/login.service";

let fixture: ComponentFixture<MyApp> = null;
let instance: any = null;

describe('Component: App', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([MyApp]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the App', async(() => {

        console.log(LoginService,instance);

        expect(instance.platform).toBeTruthy();
    }));


   // it('should check if the user is logged in', async(() => {
    //
   //     console.log(instance.platform);
    //
   //     var LoginService = jasmine.createSpyObj('LoginService',[
   //         'isConnected'
   //     ]);
    //
   //     expect(LoginService.isConnected).toHaveBeenCalled();
   // }));
});