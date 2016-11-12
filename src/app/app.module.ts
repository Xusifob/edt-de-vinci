import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { HttpModule }    from '@angular/http';
import {ScheduleModule} from 'primeng/primeng';


import { MyApp } from './app.component';

// Pages
import { CalendarPage } from '../pages/calendar/calendar';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';

// Services
import { LoginService } from './services/login.service';
import { EventService } from './services/event.service';
import { localStorageService } from './services/localstorage.service';



// Components
import { MenuComponent } from './components/menu.component';


@NgModule({
  declarations: [
    MyApp,
    CalendarPage,
    LoginPage,
    LogoutPage,
    MenuComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    FormsModule,
    HttpModule,
    ScheduleModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalendarPage,
    LoginPage,
    LogoutPage
  ],
  providers: [
    LoginService,
    localStorageService,
    EventService
  ],

})
export class AppModule {}
