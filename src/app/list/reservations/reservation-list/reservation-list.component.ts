import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';
import { MovieService } from './../../movie-list.service';
import { ReservationDetailsComponent } from '../reservation-details/reservation-details.component';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})

export class ReservationListComponent implements OnInit {

  reservation: Reservation;
  reservations: Reservation[];
  selectedReservation: Reservation;

  constructor(private reservationService: ReservationService, private movieService: MovieService) {}

  ngOnInit() {
    this.reservationService
      .getReservations()
      .then((reservations: Reservation[]) => {
        this.reservations = reservations.map((reservation) => {
          return reservation;
        });
      });
  }

  private getIndexOfReservation = (reservationId: String) => {
    return this.reservations.findIndex((reservation) => {
      return reservation._id === reservationId;
    });
  }

  selectReservation(reservation: Reservation) {
    this.selectedReservation = reservation;
  }

  // createNewReservation() {
  //   var reservation: Reservation = {
  //     eventId: '',
  //     movieTitle: '',
  //     movieOriginalTitle: '',
  //     picture: '',
  //     theatreAndAuditorium: '',
  //     seat: '',
  //     dttmShowStart: ''
  //   };

  //   // By default, a newly-created reservation will have the selected state.
  //   this.selectReservation(reservation);
  // }

  deleteReservation = (reservationId: String) => {
    var idx = this.getIndexOfReservation(reservationId);
    if (idx !== -1) {
      this.reservations.splice(idx, 1);
      this.selectReservation(null);
    }
    return this.reservations;
  }

  addReservation = (reservation: Reservation) => {
    console.log(reservation);
    this.reservations.push(reservation);
    this.selectReservation(reservation);
    return this.reservations;
  }
}
