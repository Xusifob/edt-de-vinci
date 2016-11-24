import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';


import { MyApp } from './app.component';

// Pages
import { CalendarPage } from '../pages/calendar/calendar.page';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { SettingsPage } from '../pages/settings/settings';
import {ColorsPage} from "../pages/colors/colors";

// Services
import { LoginService } from './services/login.service';
import { EventService } from './services/event.service';
import { localStorageService } from './services/localstorage.service';
import { GoogleCalendarService   } from './services/gcalendar.service';


// Components
import { SchedulerComponent } from './components/schedule/schedule.component';

// Pipes
import {KeysPipe} from "./pipes/keys";
import {MenuService} from "./services/menu.service";
import {Popover} from "./components/popover/popover";


@NgModule({
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
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalendarPage,
    LoginPage,
    LogoutPage,
    SettingsPage,
    ColorsPage
  ],
  providers: [
    LoginService,
    localStorageService,
    EventService,
    GoogleCalendarService,
    MenuService,
  ],
})
export class AppModule {}
