import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';
import { MovieService } from './../../movie-list.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {


  reservation: Reservation;
  reservations: Reservation[];

  movieForReservation: any;

  // variable declarations
  movieTitle: string = 'Captain America: The Winter Soldier';
  screen: string = 'LUXE CINEMAS';
  time: string = 'FRI, 6:45PM';
  image;

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  cols: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  reservedSeats: string[] = ['A2', 'A3', 'F5', 'F1', 'F2', 'F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
  selectedSeats: string[] = [];
  previousSeat: string;

  ticketPrice: number = 12;
  convFee: number = 2;
  totalPrice: number = 0;
  currency: string = '$';

  constructor (private reservationService: ReservationService, private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.reservationService
      .getReservations()
      .then((reservations: Reservation[]) => {
        this.reservations = reservations;
      });

    this.movieForReservation = this.movieService.getMovieData();
    if (!this.movieForReservation) {
      this.router.navigate(['']);
    } else {
      console.log(this.movieForReservation);
      // reservation to pass
      this.reservation = {
        eventId: this.movieForReservation.EventID,
        movieTitle: this.movieForReservation.Title,
        movieOriginalTitle: this.movieForReservation.OriginalTitle,
        picture: this.movieForReservation.Images.EventSmallImagePortrait,
        theatreAndAuditorium: this.movieForReservation.TheatreAndAuditorium,
        length: this.movieForReservation.LengthInMinutes,
        seat: this.selectedSeats,
        dttmShowStart: this.movieForReservation.dttmShowStart
      };
      this.movieTitle = this.movieForReservation.Title;
      this.screen = this.movieForReservation.TheatreAndAuditorium;
      this.time = this.movieForReservation.dttmShowStart;
      /* this.image = this.movieForReservation.Images.EventLargeImageLandscape; */
    }
  }

  makeReservation(reservation: Reservation) {
    this.reservationService.createReservation(reservation).then((newReservation: Reservation) => {
      this.addReservation(newReservation);
      console.log(newReservation);
    });
    console.log(this.reservation);
  }

  addReservation = (reservation: Reservation) => {
    console.log(this.reservations);
    console.log(reservation);
    this.reservations.push(reservation);
    console.log('meme');
    return this.reservations;
  }

  // return status of each seat
  getStatus = function (seatPos: string) {
    if (this.reservedSeats.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selectedSeats.indexOf(seatPos) !== -1) {
      return 'selected';
    }
  };

  // clear handler
  clearSelected = function () {
    this.selectedSeats = [];
  };

  // click handler
  seatClicked = function (seatPos: string) {
    var index = this.selectedSeats.indexOf(seatPos);
    this.previousSeat = seatPos;
    if (index !== -1) {
      // seat already selected, remove
      this.selectedSeats.splice(index, 1);
    } else {
      // push to selected array only if it is not reserved
      if (this.reservedSeats.indexOf(seatPos) === -1) {
        this.selectedSeats.push(seatPos);
      }
    }
  };

  // // Buy button handler
  // showSelected = function () {
  //   if (this.selectedSeats.length > 0) {
  //     alert('Selected Seats: ' + this.selectedSeats + '\nTotal: ' + (this.ticketPrice * this.selectedSeats.length + this.convFee));
  //   } else {
  //     alert('No seats selected!');
  //   }
  // };
}
