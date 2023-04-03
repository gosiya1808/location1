import { NgModule,LOCAl_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx'; 
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import  { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalendarPageModule } from './calendar/calendar.module';
import { SwiperModule } from 'swiper/angular';
import {registerLocalDate} from '@angular/common';
import localDe from '@angular/common/locales/de';
registerLocalDate(localDe);


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,NgCalendarModule,CalendarPageModule,SwiperModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{LOCAl_ID, useValue: 'de-DE'},Geolocation,LocationAccuracy,AndroidPermissions,Diagnostic],
  bootstrap: [AppComponent],
})
export class AppModule {}
