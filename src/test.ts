import './polyfills.ts';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { IonicApp, App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { ConfigMock } from './mocks';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { TranslateModule,TranslateLoader } from 'ng2-translate';
import { Http } from '@angular/http';

// Pages
import { CalendarPage } from '../src/pages/calendar/calendar.page';
import { LoginPage } from '../src/pages/login/login';
import { LogoutPage } from '../src/pages/logout/logout';
import { SettingsPage } from '../src/pages/settings/settings';
import {ColorsPage} from "../src/pages/colors/colors";

import { MyApp } from '../src/app/app.component';


// Services
import { LoginService } from '../src/app/services/login.service';
import { EventService } from '../src/app/services/event.service';
import { localStorageService } from '../src/app/services/localstorage.service';
import { GoogleCalendarService   } from '../src/app/services/gcalendar.service';
import { GoogleAnalyticsService   } from '../src/app/services/analytics.service';


// Components
import { SchedulerComponent } from '../src/app/components/schedule/schedule.component';

// Pipes
import {KeysPipe} from "../src/app/pipes/keys";
import {MenuService} from "../src/app/services/menu.service";
import {Popover} from "../src/app/components/popover/popover";
import {ListPage} from "../src/pages/list/list.page";
import {enableProdMode} from '@angular/core';
import { CreateTranslateLoader } from '../src/app/services/translate.loader';


// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function (): any { /* no op */};

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing'),
])
  // First, initialize the Angular testing environment.
  .then(([testing, testingBrowser]) => {
    testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );
  })
  // Then we find all the tests.
  .then(() => require.context('./', true, /\.spec\.ts/))
  // And load the modules.
  .then(context => context.keys().map(context))
  // Finally, start Karma to run the tests.
  .then(__karma__.start, __karma__.error);

export class TestUtils {

  public static beforeEachCompiler(components: Array<any>): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(components)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(components:Array<any>): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        MyApp,
        CalendarPage,
        LoginPage,
        LogoutPage,
        SettingsPage,
        SchedulerComponent,
        ColorsPage,
        KeysPipe,
        Popover,
        ListPage,
      ],
      providers: [
        LoginService,
        localStorageService,
        EventService,
        GoogleCalendarService,
        MenuService,
        GoogleAnalyticsService,
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (CreateTranslateLoader),
          deps: [Http]
        })
      ],
    });
  }


  // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
  public static eventFire(el: any, etype: string): void {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      let evObj: any = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
}
