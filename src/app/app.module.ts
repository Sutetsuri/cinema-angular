import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieComponent } from './list/movie-list/movie-list.component';
import { ReservationListComponent } from './list/reservations/reservation-list/reservation-list.component';
import { ReservationDetailsComponent } from './list/reservations/reservation-details/reservation-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SeatsComponent } from './list/reservations/seats/seats.component';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';




@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    ReservationListComponent,
    ReservationDetailsComponent,
    PageNotFoundComponent,
    SeatsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
