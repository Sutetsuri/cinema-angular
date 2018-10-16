import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MovieComponent } from './list/movie-list/movie-list.component';
import { ReservationListComponent } from './list/reservations/reservation-list/reservation-list.component';
import { ReservationDetailsComponent } from './list/reservations/reservation-details/reservation-details.component';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    ReservationListComponent,
    ReservationDetailsComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
