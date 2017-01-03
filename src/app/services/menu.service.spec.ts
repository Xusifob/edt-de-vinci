import {MenuService} from "./menu.service";


import { Observable } from "rxjs/Observable";
import {TestBed} from "@angular/core/testing";
import {TranslateService} from "ng2-translate";

import {ComponentFixture} from "@angular/core/testing";


var translateServiceStub  = jasmine.createSpyObj('TranslateService',[
    'get'
]);

translateServiceStub.get.and.callFake(function(key) {
    return { subscribe: () => {return key} }
});


let fixture: ComponentFixture<MenuService>;
let comp:    MenuService;

describe('MenuService', () => {

    beforeEach(() => {


        TestBed.configureTestingModule({
            declarations: [ MenuService ],
            // Provide a test-double instead
            providers:    [ {provide: TranslateService, useValue: translateServiceStub } ]
        });


        fixture = TestBed.createComponent(MenuService);

        comp = fixture.componentInstance; // BannerComponent test instance

        it('can set the title of the page', function() {

            comp.title = 'kiwi';

            fixture.detectChanges();

            console.log(comp);

            expect(translateServiceStub.get).toHaveBeenCalled();

            expect(comp.title).toBe(undefined);

        });
    });
});