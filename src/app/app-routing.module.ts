import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationListComponent } from './list/reservations/reservation-list/reservation-list.component';
import { MovieComponent } from './list/movie-list/movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SeatsComponent } from './list/reservations/seats/seats.component';

const routes: Routes = [
  { path: '', component: MovieComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reserve', component: SeatsComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
