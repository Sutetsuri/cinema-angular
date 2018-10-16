import { Component, Input } from '@angular/core';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})

export class ReservationDetailsComponent {
  @Input()
  reservation: Reservation;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private reservationService: ReservationService) {}

  createReservation(reservation: Reservation) {
    this.reservationService.createReservation(reservation).then((newReservation: Reservation) => {
      this.createHandler(newReservation);
    });
  }

  updateReservation(reservation: Reservation): void {
    this.reservationService.updateReservation(reservation).then((updatedReservation: Reservation) => {
      this.updateHandler(updatedReservation);
    });
  }

  deleteReservation(reservationId: String): void {
    this.reservationService.deleteReservation(reservationId).then((deletedReservationId: String) => {
      this.deleteHandler(deletedReservationId);
    });
  }
}
